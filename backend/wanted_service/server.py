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


def get_daily_item():
    # User-Agent identifica il servizio; Accept dichiara che vogliamo dati JSON.
    request = Request(
        FBI_API_URL,
        headers={
            "Accept": "application/json",
            "User-Agent": "FBI-Wanted-Daily-Service/1.0",
        },
    )

    try:
        # timeout evita di lasciare la richiesta bloccata se l'API non risponde.
        with urlopen(request, timeout=10) as response:
            payload = json.load(response)

    except Exception as error:
        raise RuntimeError("Impossibile contattare l'API FBI.") from error

    # API restituisce le schede nella proprietà "items".
    items = payload.get("items") if isinstance(payload, dict) else None

    if not isinstance(items, list):
        raise RuntimeError("La risposta dell'API FBI non contiene una lista valida.")

    valid_items = [item for item in items if isinstance(item, dict)]

    # persona ricercata e non catturata (more funny).
    wanted_items = [
        item
        for item in valid_items
        if str(item.get("poster_classification", "")).lower() == "wanted"
    ]

    # se non ne troviamo, usiamo una scheda disponibile qualsiasi.
    candidates = wanted_items or valid_items

    if not candidates:
        raise RuntimeError("L'API FBI non ha restituito schede disponibili.")

    # La data fa sì che tutti vedano la stessa scheda durante il giorno.
    chosen = candidates[(date.today().toordinal() - 1) % len(candidates)]
    print(f"[Wanted Service] Scheda selezionata: {chosen.get('title', 'N/D')}", flush=True)
    return chosen


class WantedHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Il server usa la cartella pubblica del frontend per pagina, CSS e JavaScript.
        super().__init__(*args, directory=str(PUBLIC_DIR), **kwargs)

    def send_content(self, content, content_type, status=200):
        # Content-Type dice al browser come interpretare la risposta.
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

        # Supporta richieste con prefisso /api/v1 provenienti dal gateway o da percorsi relativi
        if path.startswith("/api/v1/"):
            path = path[7:]  # Rimuove '/api/v1'

        # La root del servizio mostra la pagina FBI.
        if path in ("", "/", "/wanted", "/fbi"):
            self.path = "/fbi.html"
            return super().do_GET()

        # questo endpoint restituisce i dati che fbi.js inserisce nella pagina.
        if path in ("/api/wanted/today", "/wanted/api/wanted/today"):
            try:
                person = item_to_json(get_daily_item())
            except RuntimeError as error:
                print(f"Errore API FBI: {error}", flush=True)
                body = json.dumps({"error": str(error)}, ensure_ascii=False)
                self.send_content(body, "application/json; charset=utf-8", 502)
                return

            body = json.dumps(person, ensure_ascii=False)
            self.send_content(body, "application/json; charset=utf-8")
            return

        # Per tutte le altre risorse (CSS, JS, componenti), rimuove eventuale /api/v1
        if self.path.startswith("/api/v1/"):
            self.path = self.path[7:]

        super().do_GET()


if __name__ == "__main__":
    print(f"wanted service avviato su http://localhost:{PORT}", flush=True)
    # HTTP SERVER RESTA IN ASCOLTO
    HTTPServer(("0.0.0.0", PORT), WantedHandler).serve_forever()
