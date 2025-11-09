# PWA Icon Generation Guide

## Quick Method: Using Online Converter

1. Go to https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload your `public/favicon.svg` or school logo
3. Generate icons for PWA (you need 192x192 and 512x512)
4. Download and place in `/public/` folder:
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)

## Alternative: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Install ImageMagick (if needed)
# Ubuntu/Debian: sudo apt-get install imagemagick
# Mac: brew install imagemagick
# Windows: https://imagemagick.org/script/download.php

# Convert favicon.svg to PWA icons
convert -background none -resize 192x192 public/favicon.svg public/icon-192.png
convert -background none -resize 512x512 public/favicon.svg public/icon-512.png
```

## Using Node Script

Or use the included generation script:

```bash
npm run generate-icons
```

## Temporary Solution

For testing, you can use solid color placeholders:

```bash
# Create placeholder icons (solid color)
convert -size 192x192 xc:#820021 public/icon-192.png
convert -size 512x512 xc:#820021 public/icon-512.png
```

## Recommended Icon Design

For best PWA experience:
- **192x192**: Used on Android home screen
- **512x512**: Used for splash screen
- Use transparent background
- Include school logo/branding
- Ensure text is readable at small sizes
- Test on actual device after generation

## Maskable Icons (Optional)

For better Android support, create maskable versions:
- Design icon with 20% safe zone padding
- Background should be solid color
- Logo/text centered in safe zone
- Use PWABuilder to generate maskable variants
