Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$img = [Windows.Forms.Clipboard]::GetImage()
if ($img) {
    $img.Save('F:\AAAHTML\xdfq\clipboard.bmp', [System.Drawing.Imaging.ImageFormat]::Bmp)
    Write-Host "Saved BMP"
} else { Write-Host "No image" }
