# Run after editing components/header.html or components/footer.html.
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$utf8 = New-Object System.Text.UTF8Encoding($false)
foreach ($part in @('header', 'footer')) {
    $component = [IO.File]::ReadAllText((Join-Path $root "components/$part.html")).Trim()
    Get-ChildItem $root -Recurse -Filter *.html |
        Where-Object { $_.FullName -notmatch '[\\/]components[\\/]|[\\/]tools[\\/]' } |
        ForEach-Object {
            $html = [IO.File]::ReadAllText($_.FullName)
            $pattern = '(<' + $part + '\b[^>]*data-static-component="' + $part + '"[^>]*>).*?(</' + $part + '>)'
            $html = [regex]::Replace($html, $pattern,
                [Text.RegularExpressions.MatchEvaluator] {
                    param($match)
                    $match.Groups[1].Value + [Environment]::NewLine + $component + [Environment]::NewLine + $match.Groups[2].Value
                }, 'Singleline')
            [IO.File]::WriteAllText($_.FullName, $html, $utf8)
        }
}
Write-Output 'Shared components synchronized.'