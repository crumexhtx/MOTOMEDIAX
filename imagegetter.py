
"""
download_vehicle_images.py

Requirements:
    pip install requests pillow

Environment Variables:
    GOOGLE_API_KEY=your_google_api_key
    GOOGLE_CSE_ID=your_custom_search_engine_id

Run:
    python download_vehicle_images.py

Output:
    public/images/vehicles/toyota/camry-2025.webp
    vehicle-images.json
"""

import json
import os
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image

# ------------------------------------------------------------------
# CONFIG
# ------------------------------------------------------------------

GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
GOOGLE_CSE_ID = os.environ["GOOGLE_CSE_ID"]

YEARS = [2023, 2024, 2025]

VEHICLES = {
    "Toyota": [
        "Camry",
        "Corolla",
        "Prius",
        "4Runner",
        "RAV4",
        "Highlander",
        "Tacoma",
        "Tundra",
        "Supra A90",
        "GR86",
        "GR Corolla",
        "Land Cruiser",
    ]
}

OUTPUT_DIR = Path("public/images/vehicles")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

GOOGLE_SEARCH_URL = "https://www.googleapis.com/customsearch/v1"

# ------------------------------------------------------------------
# HELPERS
# ------------------------------------------------------------------


def slugify(text):
    return (
        text.lower()
        .replace("/", "-")
        .replace(" ", "-")
        .replace("_", "-")
    )


def search_image(brand, model, year):
    """
    Search for a high-quality vehicle image.
    """

    query = f"{year} {brand} {model} official image"

    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_CSE_ID,
        "q": query,
        "searchType": "image",
        "imgType": "photo",
        "num": 10,
        "safe": "active",
    }

    response = requests.get(
        GOOGLE_SEARCH_URL,
        params=params,
        timeout=30,
    )

    response.raise_for_status()

    data = response.json()

    items = data.get("items", [])

    if not items:
        return None

    # Prefer largest image available
    best_item = None
    best_area = 0

    for item in items:
        image_info = item.get("image", {})

        width = image_info.get("width", 0)
        height = image_info.get("height", 0)

        area = width * height

        if area > best_area:
            best_area = area
            best_item = item

    if not best_item:
        return items[0]["link"]

    return best_item["link"]


def download_and_convert_to_webp(image_url, output_path):
    """
    Download image and convert to WEBP.
    """

    response = requests.get(
        image_url,
        timeout=60,
        headers={
            "User-Agent": (
                "Mozilla/5.0 "
                "(Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/120.0 Safari/537.36"
            )
        },
    )

    response.raise_for_status()

    image = Image.open(BytesIO(response.content))

    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")

    image.save(
        output_path,
        format="WEBP",
        quality=85,
        method=6,
    )


# ------------------------------------------------------------------
# MAIN
# ------------------------------------------------------------------

manifest = {}

for brand, models in VEHICLES.items():

    brand_slug = slugify(brand)

    manifest[brand] = {}

    brand_dir = OUTPUT_DIR / brand_slug
    brand_dir.mkdir(parents=True, exist_ok=True)

    for model in models:

        model_slug = slugify(model)

        manifest[brand][model] = {}

        for year in YEARS:

            print(f"Processing {year} {brand} {model}")

            image_filename = f"{model_slug}-{year}.webp"
            image_path = brand_dir / image_filename

            public_path = (
                f"/images/vehicles/{brand_slug}/{image_filename}"
            )

            # Skip existing files
            if image_path.exists():

                manifest[brand][model][str(year)] = {
                    "image": public_path
                }

                print("  -> already exists")
                continue

            try:

                image_url = search_image(
                    brand,
                    model,
                    year,
                )

                if not image_url:
                    print("  -> no image found")
                    continue

                download_and_convert_to_webp(
                    image_url,
                    image_path,
                )

                manifest[brand][model][str(year)] = {
                    "image": public_path
                }

                print("  -> saved")

            except Exception as exc:

                print(
                    f"  -> FAILED: {year} {brand} {model}"
                )
                print(exc)

# ------------------------------------------------------------------
# SAVE MANIFEST
# ------------------------------------------------------------------

with open(
    "vehicle-images.json",
    "w",
    encoding="utf-8",
) as f:
    json.dump(
        manifest,
        f,
        indent=2,
        ensure_ascii=False,
    )

print()
print("Done.")
print("Generated vehicle-images.json")