#!/bin/bash
# ─────────────────────────────────────────────────────────────────
# extract-frames.sh
# Converts an MP4 video into numbered WebP frames for scroll-driven
# canvas animation. Generates separate desktop and mobile sets.
#
# Usage:
#   ./scripts/extract-frames.sh <mode>
#   mode = "desktop" | "mobile" | "all"
#
# Prerequisites: ffmpeg must be installed.
#   macOS:  brew install ffmpeg
#   Ubuntu: sudo apt install ffmpeg
# ─────────────────────────────────────────────────────────────────

set -euo pipefail

MODE="${1:-all}"
VIDEO="public/videos/hero.mp4"
BASE_DIR="public/frames/hero"

# ── Desktop config ──────────────────────────────────────────────
DESKTOP_DIR="$BASE_DIR/desktop"
DESKTOP_FPS=20
DESKTOP_WIDTH=1600
DESKTOP_QUALITY=70

# ── Mobile config ───────────────────────────────────────────────
MOBILE_DIR="$BASE_DIR/mobile"
MOBILE_FPS=16
MOBILE_WIDTH=900
MOBILE_QUALITY=65

# ── Validate input ──────────────────────────────────────────────
if [ ! -f "$VIDEO" ]; then
  echo "❌  Video not found at $VIDEO"
  echo "   Place your hero video at: public/videos/hero.mp4"
  exit 1
fi

FFMPEG_BIN="./node_modules/ffmpeg-static/ffmpeg"

if [ ! -f "$FFMPEG_BIN" ]; then
  echo "❌  ffmpeg-static is not installed."
  echo "   Run: npm install"
  exit 1
fi

extract_frames() {
  local dir=$1 fps=$2 width=$3 quality=$4 label=$5

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  🎬  Extracting $label frames"
  echo "      FPS: $fps  |  Width: ${width}px  |  Quality: $quality"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Clean previous frames
  rm -rf "$dir"
  mkdir -p "$dir"

  # Extract frames with ffmpeg
  "$FFMPEG_BIN" -i "$VIDEO" \
    -vf "fps=$fps,scale=$width:-2" \
    -c:v libwebp \
    -quality "$quality" \
    -compression_level 6 \
    -preset drawing \
    -an \
    "$dir/frame_%04d.webp" \
    -hide_banner -loglevel warning

  # Count and report
  local count
  count=$(ls -1 "$dir"/frame_*.webp 2>/dev/null | wc -l | tr -d ' ')
  local size
  size=$(du -sh "$dir" | cut -f1)

  echo "  ✅  $count frames extracted → $dir/ ($size)"
}

# ── Run ─────────────────────────────────────────────────────────
case "$MODE" in
  desktop)
    extract_frames "$DESKTOP_DIR" "$DESKTOP_FPS" "$DESKTOP_WIDTH" "$DESKTOP_QUALITY" "DESKTOP"
    ;;
  mobile)
    extract_frames "$MOBILE_DIR" "$MOBILE_FPS" "$MOBILE_WIDTH" "$MOBILE_QUALITY" "MOBILE"
    ;;
  all)
    extract_frames "$DESKTOP_DIR" "$DESKTOP_FPS" "$DESKTOP_WIDTH" "$DESKTOP_QUALITY" "DESKTOP"
    extract_frames "$MOBILE_DIR" "$MOBILE_FPS" "$MOBILE_WIDTH" "$MOBILE_QUALITY" "MOBILE"
    ;;
  *)
    echo "❌  Unknown mode: $MODE"
    echo "   Usage: ./scripts/extract-frames.sh [desktop|mobile|all]"
    exit 1
    ;;
esac

echo ""
echo "🎉  Frame extraction complete!"
echo ""
echo "   Next step: use the <ScrollFrameCanvas> component in your page."
echo "   Example:"
echo '     <ScrollFrameCanvas basePath="/frames/hero" totalFrames={COUNT} />'
echo ""
