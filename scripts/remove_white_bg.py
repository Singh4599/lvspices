import sys
from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        
        # Calculate how "white" the pixel is.
        # Average brightness:
        brightness = (r + g + b) / 3.0
        
        # We want pure white (255,255,255) to have 0 alpha.
        # And darker/colored pixels to have higher alpha.
        # A simple approach: use the difference from white as alpha.
        # Max diff is 255 (for black).
        diff = 255 - brightness
        
        # We can amplify the diff so it becomes fully opaque earlier.
        # If diff > 20, it's fully opaque. If diff == 0, it's 0 alpha.
        alpha = int(min(255, diff * 5))
        
        if alpha < 255:
            # For semi-transparent pixels, we want to remove the "white" contamination
            # by un-premultiplying the color, but simpler: just keep the original color
            # and set the calculated alpha.
            pass
            
        new_data.append((r, g, b, alpha))
        
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_white_bg(sys.argv[1], sys.argv[2])
