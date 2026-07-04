from PIL import Image
import glob
import os

images = [
    'turmeric-powder-v3.png',
    'chilli-powder-v3.png',
    'coriander-powder-v3.png',
    'pepper-v3.png',
    'garam-masala-v3.png',
    'biryani-masala-v3.png',
    'sambar-powder-v3.png',
    'rasam-powder-v3.png',
    'meat-masala-v3.png'
]

# Reference Cumin bbox
ref_img = Image.open('public/images/products/cumin-powder-v3.png')
ref_bbox = ref_img.getbbox()
ref_w = ref_bbox[2] - ref_bbox[0]
ref_h = ref_bbox[3] - ref_bbox[1]
print(f"Reference Cumin bbox: {ref_bbox}, W: {ref_w}, H: {ref_h}")

for img_name in images:
    path = f'public/images/products/{img_name}'
    if not os.path.exists(path):
        print(f"Not found: {img_name}")
        continue
    
    img = Image.open(path)
    bbox = img.getbbox()
    if not bbox:
        continue
        
    img_w = bbox[2] - bbox[0]
    img_h = bbox[3] - bbox[1]
    
    # Crop to content
    cropped = img.crop(bbox)
    
    # We want to scale it so it has the same width as ref_w (or similar proportion)
    # Scale factor
    scale = ref_w / img_w
    
    new_w = int(img_w * scale)
    new_h = int(img_h * scale)
    
    resized = cropped.resize((new_w, new_h), Image.LANCZOS)
    
    # Create new 1024x1024 canvas
    new_img = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
    
    # Paste so it's centered horizontally and bottom-aligned with ref Cumin
    # Ref Cumin bottom is 980.
    # So new_y + new_h = 980 -> new_y = 980 - new_h
    # Center X: 512 - new_w / 2
    
    paste_x = int(512 - new_w / 2)
    paste_y = int(980 - new_h)
    
    new_img.paste(resized, (paste_x, paste_y))
    
    new_img.save(path)
    print(f"Processed {img_name} - new size: {new_w}x{new_h}")
