#!/bin/bash
source venv/bin/activate
cd public/images/products

for img in turmeric-v4.png chilli-v4.png coriander-v4.png cumin-powder-v3.png pepper-v5.png garam-masala-v4.png biryani-masala-v4.png sambar-powder-v4.png rasam-powder-v4.png meat-masala-v4.png; do
  echo "Processing $img..."
  rembg i "$img" "$img.tmp.png"
  if [ -f "$img.tmp.png" ]; then
    mv "$img.tmp.png" "$img"
    echo "Saved $img"
  else
    echo "Failed $img"
  fi
done
