"""
Batch frame extractor for LV Spices section videos.
Extracts frames at ~12fps, 800px wide, JPEG quality 72.
Each video gets its own folder under public/frames/<slug>/
Targets ~48 frames per video (4s @ 12fps) for smooth scrubbing.
"""
import cv2
import os
import sys

BASE = "/Users/dhruvsingh/Desktop/lvspices"
OUT_BASE = os.path.join(BASE, "public", "frames")

# video filename (relative to BASE) → output folder slug
VIDEOS = [
    ("agent network.mp4",         "agent-network"),
    ("annual export.mp4",         "annual-export"),
    ("cleaning and sorting.mp4",  "cleaning-sorting"),
    ("cold storage.mp4",          "cold-storage"),
    ("customised .mp4",           "customised"),
    ("dispatch.mp4",              "dispatch"),
    ("inhouse lab.mp4",           "inhouse-lab"),
    ("market insights.mp4",       "market-insights"),
    ("metal detection.mp4",       "metal-detection"),
    ("private label.mp4",         "private-label"),
    ("product r&d .mp4",          "product-rd"),
    ("professional team.mp4",     "professional-team"),
    ("quality check.mp4",         "quality-check"),
    ("raw .mp4",                  "raw"),
    ("rm inspection.mp4",         "rm-inspection"),
    ("roasting.mp4",              "roasting"),
    ("safety and quality.mp4",    "safety-quality"),
    ("storing spices.mp4",        "storing-spices"),
]

TARGET_W   = 800    # output width  (height auto-scales)
JPEG_Q     = 72     # JPEG quality (0-100)
MAX_FRAMES = 60     # cap per video  (≈5 s @ 12 fps)
EVERY_N    = None   # computed per video to hit ~MAX_FRAMES


def extract(video_rel, slug):
    video_path = os.path.join(BASE, video_rel)
    out_dir    = os.path.join(OUT_BASE, slug)

    if not os.path.exists(video_path):
        print(f"  ⚠  NOT FOUND: {video_rel}")
        return 0

    os.makedirs(out_dir, exist_ok=True)

    # Remove stale frames
    for f in os.listdir(out_dir):
        if f.endswith(".jpg"):
            os.remove(os.path.join(out_dir, f))

    cap = cv2.VideoCapture(video_path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps   = cap.get(cv2.CAP_PROP_FPS) or 30

    # Step: skip every N source frames so we get ≤ MAX_FRAMES
    step = max(1, round(total / MAX_FRAMES))

    print(f"  {slug}: {total} src frames @ {fps:.1f}fps  →  step={step}  "
          f"→ ~{total//step} output frames")

    idx        = 0
    saved      = 0
    src_idx    = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if src_idx % step == 0:
            # Resize keeping aspect
            h, w = frame.shape[:2]
            if w > TARGET_W:
                new_h = int(h * TARGET_W / w)
                frame = cv2.resize(frame, (TARGET_W, new_h), interpolation=cv2.INTER_AREA)

            saved += 1
            fname  = os.path.join(out_dir, f"frame_{saved:04d}.jpg")
            cv2.imwrite(fname, frame, [cv2.IMWRITE_JPEG_QUALITY, JPEG_Q])
        src_idx += 1

    cap.release()
    print(f"  ✓  {saved} frames saved → {out_dir}")
    return saved


if __name__ == "__main__":
    totals = {}
    for video_rel, slug in VIDEOS:
        print(f"\n→ Processing: {video_rel}")
        n = extract(video_rel, slug)
        totals[slug] = n

    print("\n\n════ FRAME COUNTS (paste into page.tsx) ════")
    for slug, n in totals.items():
        print(f"  '{slug}': {n},")
    print("════════════════════════════════════════════")
