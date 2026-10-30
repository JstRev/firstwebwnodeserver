from urllib.parse import urlparse


def item_to_json(item):
    images = item.get("images") or []
    image_url = ""
    if images and isinstance(images[0], dict):
        raw_img = images[0].get("large") or images[0].get("thumb") or images[0].get("original")
        image_url = sanitize_media_url(raw_img)

    subjects = item.get("subjects")
    if not isinstance(subjects, list):
        subjects = []

    return {
        "title": item.get("title") or "FBI Most Wanted File",
        "description": item.get("description") or "",
        "subjects": subjects,
        "reward": item.get("reward_text") or "",
        "image": image_url,
        "url": sanitize_media_url(item.get("url")),
    }


def sanitize_media_url(value):
    if not isinstance(value, str):
        return ""
    parsed = urlparse(value)
    if parsed.scheme != "https":
        return ""
    hostname = (parsed.hostname or "").lower()
    # Accept official FBI subdomains or trusted CDNs
    if hostname.endswith("fbi.gov") or hostname in ("images.unsplash.com", "cdn.fbi.gov"):
        return value
    return ""
