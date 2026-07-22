"""
Deprecated entrypoint — use:

  python scripts/fetch-toyota-videos.py

This file remains so older docs/commands still work.
"""

from pathlib import Path
import runpy

runpy.run_path(str(Path(__file__).resolve().parent / "scripts" / "fetch-toyota-videos.py"), run_name="__main__")
