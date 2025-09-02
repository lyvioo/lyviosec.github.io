#!/usr/bin/env python3
"""
Build script for LyvioSec site

- Copies assets and static files into dist/
- Minifies styles.css
- Obfuscates inline <script> in index.html with base64+eval(atob())
- Removes HTML and block comments
- Creates build-dist.tar.gz

Usage:
  python3 build.py            # build dist and tarball
  python3 build.py --no-tar   # build dist only
  python3 build.py --clean    # remove dist and tarball, then build
"""

from __future__ import annotations
import argparse
import base64
import os
from pathlib import Path
import re
import shutil
import sys
import tarfile

ROOT = Path(__file__).parent.resolve()
DIST = ROOT / "dist"
TARBALL = ROOT / "build-dist.tar.gz"


def info(msg: str) -> None:
    print(f"[build] {msg}")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def minify_css(css: str) -> str:
    # Remove block comments
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    # Collapse whitespace
    css = re.sub(r"\s+", " ", css)
    # Tighten around symbols
    css = re.sub(r"\s*([{}:;,>])\s*", r"\1", css)
    # Optional: keep newline after closing brace for readability
    css = css.replace("}", "}\n")
    return css.strip()


def strip_html_comments(html: str) -> str:
    # Remove HTML comments <!-- ... -->
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    # Remove block comments that might appear inside style/script tags
    html = re.sub(r"/\*.*?\*/", "", html, flags=re.S)
    # Collapse excessive blank lines
    html = re.sub(r"\n\s*\n+", "\n", html)
    return html


def obfuscate_first_inline_script(html: str) -> str:
    # Find the first <script>...</script> without attributes
    pat = re.compile(r"<script>(.*?)</script>", re.S | re.I)
    m = pat.search(html)
    if not m:
        raise RuntimeError("No inline <script> block found in index.html")
    code = m.group(1).strip()
    b64 = base64.b64encode(code.encode("utf-8")).decode("ascii")
    repl = f"<script>eval(atob('{b64}'))</script>"
    return html[: m.start()] + repl + html[m.end() :]


def clean_dist() -> None:
    if DIST.exists():
        info("Removing dist/")
        shutil.rmtree(DIST)
    if TARBALL.exists():
        info(f"Removing {TARBALL.name}")
        TARBALL.unlink()


def build(no_tar: bool = False) -> None:
    # Ensure dist
    DIST.mkdir(parents=True, exist_ok=True)

    # Copy static files
    for fname in ["favicon.ico", "CNAME", "_config.yml"]:
        src = ROOT / fname
        if src.exists():
            shutil.copy2(src, DIST / fname)
            info(f"Copied {fname}")
    # Copy assets directory
    assets_src = ROOT / "assets"
    assets_dst = DIST / "assets"
    if assets_src.exists():
        if assets_dst.exists():
            shutil.rmtree(assets_dst)
        shutil.copytree(assets_src, assets_dst)
        info("Copied assets/")

    # Minify CSS
    css_src = ROOT / "styles.css"
    if not css_src.exists():
        raise FileNotFoundError("styles.css not found")
    css_min = minify_css(read_text(css_src))
    write_text(DIST / "styles.css", css_min)
    info("Minified styles.css -> dist/styles.css")

    # Prepare HTML: remove comments, obfuscate script
    html_src = ROOT / "index.html"
    if not html_src.exists():
        raise FileNotFoundError("index.html not found")
    html = read_text(html_src)
    html = strip_html_comments(html)
    html = obfuscate_first_inline_script(html)
    html = strip_html_comments(html)  # ensure no comments remain
    write_text(DIST / "index.html", html)
    info("Built index.html with obfuscated script")

    # Create tar.gz if requested
    if not no_tar:
        with tarfile.open(TARBALL, mode="w:gz") as tf:
            tf.add(DIST, arcname="dist")
        info(f"Created {TARBALL.name}")


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description="Build the static site")
    ap.add_argument("--no-tar", action="store_true", help="Do not create tarball")
    ap.add_argument("--clean", action="store_true", help="Clean before building")
    args = ap.parse_args(argv)

    if args.clean:
        clean_dist()
    build(no_tar=args.no_tar)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

