"""Deterministically encode prototype gallery images from the retained source PNGs.

Requires: python -m pip install Pillow==11.3.0
Run from the Accom prototype root: python scripts/optimize_webp.py
Does not touch the source PNGs or media provenance sidecars.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ("ensuite", "lounge", "studio", "study")


def main():
    for stem in MEDIA:
        source = ROOT / "source-assets" / f"{stem}.png"
        target = ROOT / "public" / "assets" / f"{stem}.webp"
        if not source.is_file():
            raise FileNotFoundError(f"Missing source media: {source}")
        before = target.stat().st_size if target.exists() else 0
        with Image.open(source) as original:
            original.convert("RGB").save(target, format="WEBP", quality=76, method=6)
        after = target.stat().st_size
        print(f"{stem}: {before:,} -> {after:,} bytes ({(1 - after / before) * 100:.0f}% smaller)" if before else f"{stem}: {after:,} bytes")


if __name__ == "__main__":
    main()
