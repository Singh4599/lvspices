#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════
#  LV Spices — Video Compression Script
#  Run AFTER: brew install ffmpeg
#  Usage:     bash compress_videos.sh
# ═══════════════════════════════════════════════════════════

VIDEOS_DIR="/Users/dhruvsingh/Desktop/lvspices/public/videos"
BACKUP_DIR="$VIDEOS_DIR/_originals_backup"

mkdir -p "$BACKUP_DIR"

compress_video() {
  local INPUT="$1"
  local CRF="$2"
  local SCALE="$3"
  local FILENAME=$(basename "$INPUT")
  local BACKUP="$BACKUP_DIR/$FILENAME"
  local TEMP="$VIDEOS_DIR/_temp_$FILENAME"

  if [ ! -f "$BACKUP" ]; then
    cp "$INPUT" "$BACKUP"
    echo "Backed up: $FILENAME"
  fi

  ORIG_SIZE=$(du -sh "$INPUT" | cut -f1)
  echo "Compressing: $FILENAME ($ORIG_SIZE) ..."

  local VF_ARG=""
  if [ -n "$SCALE" ]; then
    VF_ARG="-vf scale=$SCALE"
  fi

  ffmpeg -y -i "$INPUT" \
    -c:v libx264 \
    -crf "$CRF" \
    -preset slow \
    -tune fastdecode \
    -movflags +faststart \
    -an \
    $VF_ARG \
    "$TEMP" 2>/dev/null

  if [ $? -eq 0 ]; then
    mv "$TEMP" "$INPUT"
    NEW_SIZE=$(du -sh "$INPUT" | cut -f1)
    echo "OK $FILENAME: $ORIG_SIZE to $NEW_SIZE"
  else
    echo "FAILED: $FILENAME"
    rm -f "$TEMP"
    cp "$BACKUP" "$INPUT"
  fi
}

echo "LV Spices Video Compression"
echo "==========================="

compress_video "$VIDEOS_DIR/hero-mobile-v3.mp4"    28  "720:-2"
compress_video "$VIDEOS_DIR/hero-desktop-v4.mp4"   26  "1920:-2"
compress_video "$VIDEOS_DIR/raw-material-new.mp4"  28  "854:-2"
compress_video "$VIDEOS_DIR/storage-new.mp4"       28  "854:-2"
compress_video "$VIDEOS_DIR/inspection-new.mp4"    28  "854:-2"
compress_video "$VIDEOS_DIR/cleaning-sorting.mp4"  28  "854:-2"
compress_video "$VIDEOS_DIR/metal-detction-new.mp4" 28 "854:-2"
compress_video "$VIDEOS_DIR/roasting.mp4"          28  "854:-2"
compress_video "$VIDEOS_DIR/cryogenic-grinding-new.mp4" 28 "854:-2"
compress_video "$VIDEOS_DIR/process.mp4"           28  "854:-2"
compress_video "$VIDEOS_DIR/steam-sterilization.mp4" 28 "854:-2"
compress_video "$VIDEOS_DIR/quality-check-new2.mp4" 28 "854:-2"
compress_video "$VIDEOS_DIR/dispatch.mp4"          28  "854:-2"
compress_video "$VIDEOS_DIR/whoweare.mp4"          26  "1280:-2"
compress_video "$VIDEOS_DIR/in-house-and-rd.mp4"   28  "854:-2"
compress_video "$VIDEOS_DIR/private-label.mp4"     28  "854:-2"
compress_video "$VIDEOS_DIR/raw-material-storage.mp4" 28 "854:-2"

echo ""
echo "==========================="
echo "FINAL SIZES:"
du -sh "$VIDEOS_DIR"/*.mp4 | sort -h
echo "Originals backed up at: $BACKUP_DIR"
echo "Done!"
