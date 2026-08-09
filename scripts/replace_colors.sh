#!/bin/bash
# Replace all red/crimson colors with black across the codebase

ROOT="/Users/dhruvsingh/Desktop/lvspices"

FILES=$(find "$ROOT/app" "$ROOT/components" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.js" \) | grep -v node_modules | grep -v ".next")

for FILE in $FILES; do
  # Replace all red hex codes with black equivalents
  # Main red #e62e04 -> #111111
  sed -i '' "s/#e62e04/#111111/g; s/#E62E04/#111111/g" "$FILE"
  # Darker red #c12502 -> #000000
  sed -i '' "s/#c12502/#000000/g; s/#C12502/#000000/g" "$FILE"
  # Crimson #AC033B -> #111111
  sed -i '' "s/#AC033B/#111111/g; s/#ac033b/#111111/g" "$FILE"
  # Crimson hover #8e0231 -> #333333
  sed -i '' "s/#8e0231/#333333/g; s/#8E0231/#333333/g" "$FILE"
  # rgba crimson variants
  sed -i '' "s/rgba(230,46,4,/rgba(17,17,17,/g" "$FILE"
  sed -i '' "s/rgba(230, 46, 4,/rgba(17, 17, 17,/g" "$FILE"
  sed -i '' "s/rgba(172,3,59,/rgba(17,17,17,/g" "$FILE"
  sed -i '' "s/rgba(172, 3, 59,/rgba(17, 17, 17,/g" "$FILE"
  sed -i '' "s/172, 3, 59/17, 17, 17/g" "$FILE"
  # Green/Orange accent colors in chilli intro map
  sed -i '' "s/#2E6B3E/#111111/g" "$FILE"
  sed -i '' "s/#E8760A/#111111/g" "$FILE"
  sed -i '' "s/#2C1200/#111111/g" "$FILE"
done

echo "Done replacing colors!"
