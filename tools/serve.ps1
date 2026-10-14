param([int]$Port = 8765, [switch]$BrowserChecks)
$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Split-Path $PSScriptRoot -Parent))
$listener = New-Object Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Output "Preview: http://localhost:$Port/"
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $requested = [uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart('/')
            $path = [IO.Path]::GetFullPath((Join-Path $root $requested))
            if ($path -ne $root -and !$path.StartsWith($root + [IO.Path]::DirectorySeparatorChar)) { throw 'Outside preview root' }
            if (Test-Path $path -PathType Container) { $path = Join-Path $path 'index.html' }
            if (!(Test-Path $path -PathType Leaf)) { $context.Response.StatusCode = 404; $path = Join-Path $root '404.html' }
            $types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='text/javascript'; '.webp'='image/webp'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.xml'='application/xml'; '.webmanifest'='application/manifest+json'; '.ico'='image/x-icon' }
            $extension = [IO.Path]::GetExtension($path)
            $context.Response.ContentType = if ($types.ContainsKey($extension)) { $types[$extension] } else { 'application/octet-stream' }
            $bytes = [IO.File]::ReadAllBytes($path)
            if ($BrowserChecks -and $extension -eq '.html') {
                $html = [Text.Encoding]::UTF8.GetString($bytes)
                # Local automated previews do not emit analytics or execute the live form provider.
                $html = [regex]::Replace($html, '<script[^>]*src="https://(?:www.googletagmanager.com|d3ey4dbjkt2f6s.cloudfront.net)[^"]*"[^>]*></script>', '')
                $html = $html.Replace('<head>', '<head><script>window.previewErrors=[];addEventListener("error",e=>{if(e.message)previewErrors.push(e.message)});addEventListener("unhandledrejection",e=>previewErrors.push(String(e.reason)));</script>')
                $bytes = [Text.Encoding]::UTF8.GetBytes($html)
            }
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } catch { $context.Response.StatusCode = 500 }
        finally { $context.Response.Close() }
    }
} finally { $listener.Close() }