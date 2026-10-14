$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$domain = 'https://vibrantcleaningsolutionsllc.com'
$errors = New-Object 'System.Collections.Generic.List[string]'
$indexable = @{}; $titles = @{}; $descriptions = @{}; $incoming = @{}
$pages = Get-ChildItem $root -Recurse -Filter *.html |
    Where-Object { $_.FullName -notmatch '[\\/]components[\\/]|[\\/]tools[\\/]' }
foreach ($page in $pages) {
    $rel = $page.FullName.Substring($root.Length).Replace('\', '/')
    $url = if ($rel -eq '/index.html') { '/' } else { $rel -replace '/index.html$', '/' }
    $html = [IO.File]::ReadAllText($page.FullName)
    $redirect = $html -match 'http-equiv="refresh"'
    $noindex = $html -match '<meta name="robots" content="noindex'
    $canonical = [regex]::Match($html, '<link rel="canonical" href="([^"]+)"').Groups[1].Value
    if (!$canonical.StartsWith("$domain/")) { $errors.Add("$rel has an incorrect canonical") }
    if (!$noindex) {
        $indexable[$domain + $url] = $page
        if ($canonical -ne $domain + $url) { $errors.Add("$rel canonical does not match its URL") }
        foreach ($field in @('title', 'description')) {
            $value = if ($field -eq 'title') { [regex]::Match($html, '<title>(.*?)</title>').Groups[1].Value } else { [regex]::Match($html, '<meta name="description" content="([^"]+)"').Groups[1].Value }
            $seen = if ($field -eq 'title') { $titles } else { $descriptions }
            if (!$value) { $errors.Add("$rel missing $field") }
            elseif ($seen.ContainsKey($value)) { $errors.Add("$rel duplicate $field with $($seen[$value])") }
            else { $seen[$value] = $rel }
        }
    }
    if ([regex]::Matches($html, '<h1\b').Count -ne 1) { $errors.Add("$rel must have one h1") }
    if ([regex]::Matches($html, '<main\b').Count -ne 1) { $errors.Add("$rel must have one main") }
    if ($html -match '<header[^>]*>\s*<header') { $errors.Add("$rel has nested headers") }
    if (!$redirect) {
        foreach ($part in @('header', 'footer')) {
            if ($html -notmatch ('data-static-component="' + $part + '"')) { $errors.Add("$rel lacks static $part") }
        }
        if ($html -notmatch 'href="#main-content"') { $errors.Add("$rel lacks skip link") }
        foreach ($meta in @('og:image', 'twitter:image', 'og:url')) {
            $value = [regex]::Match($html, '<meta (?:property|name)="' + $meta + '" content="([^"]+)"').Groups[1].Value
            if (!$value.StartsWith("$domain/")) { $errors.Add("$rel missing or relative $meta") }
        }
        if ($html -notmatch 'clienthub.getjobber.com') { $errors.Add("$rel lacks Jobber CTA") }
    }
    foreach ($match in [regex]::Matches($html, '<script type="application/ld\+json">(.*?)</script>', 'Singleline')) {
        try {
            $data = $match.Groups[1].Value | ConvertFrom-Json
            if ($data.'@type' -eq 'BreadcrumbList') {
                $position = 1
                foreach ($item in $data.itemListElement) {
                    if ($item.position -ne $position) { $errors.Add("$rel incorrect breadcrumb position") }
                    $position++
                }
            }
            if ($rel.StartsWith('/service-area/') -and @($data.'@type') -contains 'LocalBusiness') { $errors.Add("$rel presents a city as a branch") }
        } catch { $errors.Add("$rel invalid JSON-LD: $_") }
    }
    $markup = [regex]::Replace($html, '<script\b[^>]*>.*?</script>|<!--.*?-->', '', 'Singleline')
    foreach ($match in [regex]::Matches($markup, '(?:href|src)="([^"]+)"')) {
        $value = [Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
        if ($value -match '^(tel:|mailto:|data:|javascript:)') { continue }
        $uri = New-Object Uri ([uri]($domain + $url)), $value
        if ($uri.Host -ne ([uri]$domain).Host) { continue }
        $local = Join-Path $root ([uri]::UnescapeDataString($uri.AbsolutePath).TrimStart('/'))
        if (Test-Path $local -PathType Container) { $local = Join-Path $local 'index.html' }
        if (!(Test-Path -LiteralPath $local)) { $errors.Add("$rel broken reference $value"); continue }
        if ($uri.Fragment.Length -gt 1 -and $local.EndsWith('.html')) {
            $target = [IO.File]::ReadAllText($local)
            $id = [uri]::UnescapeDataString($uri.Fragment.Substring(1))
            if ($target -notmatch ('\bid="' + [regex]::Escape($id) + '"')) { $errors.Add("$rel broken fragment $value") }
        }
        if ($local.EndsWith('.html') -and $local -ne $page.FullName) { $incoming[$local] = $true }
    }
    foreach ($img in [regex]::Matches($markup, '<img\b[^>]*>')) {
        if ($img.Value -notmatch '\balt=') { $errors.Add("$rel image missing alt") }
        if ($img.Value -notmatch '\bwidth=' -or $img.Value -notmatch '\bheight=') { $errors.Add("$rel image missing dimensions") }
        if ($img.Value -match 'hero-company-name' -and $img.Value -match 'loading="lazy"') { $errors.Add("$rel hero lazy loaded") }
    }
    $before = (& git -C $root show ("main:" + $rel.TrimStart('/')) 2>$null) -join [Environment]::NewLine
    foreach ($link in [regex]::Matches($before, 'https://clienthub\.getjobber\.com/[^"\s<]+')) {
        if (!$html.Contains($link.Value)) { $errors.Add("$rel removed Jobber destination $($link.Value)") }
    }
}
[xml]$sitemap = [IO.File]::ReadAllText((Join-Path $root 'sitemap.xml'))
$locations = @($sitemap.urlset.url | ForEach-Object { $_.loc })
foreach ($location in $locations) {
    if (!$indexable.ContainsKey($location)) { $errors.Add("Sitemap contains nonindexable or missing URL $location") }
}
foreach ($location in $indexable.Keys) {
    if ($location -notin $locations) { $errors.Add("Sitemap missing $location") }
    $page = $indexable[$location]
    if ($location -ne "$domain/" -and !$incoming.ContainsKey($page.FullName)) { $errors.Add("Orphan page $location") }
}
foreach ($match in [regex]::Matches([IO.File]::ReadAllText((Join-Path $root 'styles/main.css')), 'url\([''"]?([^''")]+)')) {
    if ($match.Groups[1].Value -match '^https?:|^data:') { continue }
    $path = if ($match.Groups[1].Value.StartsWith('/')) { Join-Path $root $match.Groups[1].Value.TrimStart('/') } else { Join-Path (Join-Path $root 'styles') $match.Groups[1].Value }
    if (!(Test-Path -LiteralPath $path)) { $errors.Add("Missing CSS asset $($match.Groups[1].Value)") }
}
$manifest = [IO.File]::ReadAllText((Join-Path $root 'images/favicon/site.webmanifest')) | ConvertFrom-Json
foreach ($icon in $manifest.icons) {
    if (!(Test-Path (Join-Path $root $icon.src.TrimStart('/')))) { $errors.Add("Missing manifest icon $($icon.src)") }
}
if ($errors.Count) { $errors | Sort-Object -Unique | Write-Output; throw "$($errors.Count) validation errors" }
Write-Output "PASS: $($pages.Count) pages, $($indexable.Count) indexable URLs; metadata, schema JSON, landmarks, assets, fragments, incoming links, sitemap and original Jobber destinations."