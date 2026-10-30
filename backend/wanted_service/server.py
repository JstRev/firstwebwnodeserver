from datetime import date
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
from pathlib import Path
import sys
from urllib.error import URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from utils.converter import item_to_json

FBI_API_URL = "https://api.fbi.gov/wanted/v1/list"
PORT = int(os.environ.get("WANTED_PORT", "3002"))
PUBLIC_DIR = Path(__file__).resolve().parents[2] / "frontend" / "public"

# Realistic fallback dossier if external network or FBI API is unreachable
FALLBACK_ITEM = {
    "title": "ALEXEI LEONOV (SAMPLE DOSSIER)",
    "description": "Alleged cyber intrusion and conspiracy to commit wire fraud. Considered armed and dangerous. International fugitive under multi-agency warrant.",
    "subjects": ["Cyber Crimes", "Federal Fugitive"],
    "reward_text": "The FBI is offering a reward of up to $250,000 for information leading directly to the arrest of this individual.",
    "images": [
        {
            "large": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=faces",
            "thumb": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=350&fit=crop&crop=faces"
        }
    ],
    "url": "https://www.fbi.gov/wanted"
}


def get_daily_item():
    request = Request(
        FBI_API_URL,
        headers={
            "Accept": "application/json",
            "User-Agent": "FBI-Wanted-Daily-Service/1.0",
        },
    )

    try:
        with urlopen(request, timeout=8) as response:
            payload = json.load(response)

        items = payload.get("items") if isinstance(payload, dict) else None
        if isinstance(items, list):
            valid_items = [item for item in items if isinstance(item, dict)]
            wanted_items = [
                item
                for item in valid_items
                if str(item.get("poster_classification", "")).lower() == "wanted"
            ]
            candidates = wanted_items or valid_items
            if candidates:
                chosen = candidates[(date.today().toordinal() - 1) % len(candidates)]
                print(f"[Wanted Service] FBI record selected: {chosen.get('title', 'N/D')}", flush=True)
                return chosen

    except Exception as error:
        print(f"[Wanted Service] FBI API fetch notice: {error}. Utilizing secure fallback dossier.", flush=True)

    return FALLBACK_ITEM


class WantedHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC_DIR), **kwargs)

    def send_content(self, content, content_type, status=200):
        encoded = content.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(encoded)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        if path.startswith("/api/v1/"):
            path = path[7:]

        if path in ("", "/", "/wanted", "/fbi"):
            self.path = "/fbi.html"
            return super().do_GET()

        if path in ("/today", "/api/today", "/api/wanted/today", "/wanted/api/wanted/today"):
            try:
                person = item_to_json(get_daily_item())
            except Exception as error:
                print(f"Error converting FBI record: {error}", flush=True)
                person = item_to_json(FALLBACK_ITEM)

            body = json.dumps(person, ensure_ascii=False)
            self.send_content(body, "application/json; charset=utf-8")
            return

        if self.path.startswith("/api/v1/"):
            self.path = self.path[7:]

        super().do_GET()


if __name__ == "__main__":
    print(f"[Wanted Service] Active on http://localhost:{PORT}", flush=True)
    HTTPServer(("0.0.0.0", PORT), WantedHandler).serve_forever()
