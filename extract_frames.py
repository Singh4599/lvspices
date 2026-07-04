import cv2
import os
import sys

video_path = "/Users/dhruvsingh/Desktop/lvspices/LV SPICES VIDEO.mp4"
output_dir = "/Users/dhruvsingh/Desktop/lvspices/public/frames/hero"

if not os.path.exists(video_path):
    print("Video file not found.")
    sys.exit(1)

os.makedirs(output_dir, exist_ok=True)

# Delete existing frames
for f in os.listdir(output_dir):
    if f.endswith(".jpg"):
        os.remove(os.path.join(output_dir, f))

cap = cv2.VideoCapture(video_path)
count = 0
saved_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    count += 1
    
    # Save every 4th frame to reduce total to ~880 frames
    if count % 4 != 0:
        continue
        
    saved_count += 1
    
    # Resize frame to max 1280 width to save space
    h, w = frame.shape[:2]
    if w > 1280:
        new_w = 1280
        new_h = int((h / w) * new_w)
        frame = cv2.resize(frame, (new_w, new_h), interpolation=cv2.INTER_AREA)
    
    # Save as JPEG with 70 quality
    filename = os.path.join(output_dir, f"frame_{saved_count:04d}.jpg")
    cv2.imwrite(filename, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 70])
    
    if saved_count % 50 == 0:
        print(f"Saved {saved_count} frames")

cap.release()
print(f"Total frames saved: {saved_count}")
