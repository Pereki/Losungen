# Losungen API

Eine REST-API für die Täglichen Losungen der Evangelischen Kirche.

## Endpoints

| Methode | Pfad | Beschreibung |
|---------|------|--------------|
| GET | `/api/devotion/today` | Losung des aktuellen Tages |
| GET | `/api/devotion/{date}` | Losung für ein bestimmtes Datum (Format: `YYYY-MM-DD`) |

## Antwort-Format

```json
{
  "date": "2026-01-01",
  "weekday": "Donnerstag",
  "text": "Der HERR wird aufheben die Schmach seines Volks in allen Landen.",
  "verse": "Jesaja 25,8",
  "teaching": "Darin ist erschienen die Liebe Gottes unter uns...",
  "teaching_verse": "1. Johannes 4,9",
  "liturgical_day": "Neujahr"
}
```

## Lokale Entwicklung

```bash
cargo run
```

Der Server startet auf `http://localhost:3000`.

## Deployment

Das Projekt nutzt Fly.io für das Deployment.

```bash
fly deploy
```

## Technologien

- Rust
- Axum (Web-Framework)
- Tokio (Async Runtime)
- Chrono (Datum/Zeit)

---
## AI Disclaimer

KI kann benutzt werden, aber bitte denkt daran, das es hier nicht darum geht möglichst viel in kurzer Zeit zu schaffen. Um Menschen zu erreichen sollten Menschen Aufgaben übernehmen, nicht KI.


**Datenquelle:** Die Täglichen Losungen® © Evangelische Brüder-Unität – Herrnhuter Brüdergemeine. Bibeltexte: Lutherbibel 2017 © Deutsche Bibelgesellschaft.
