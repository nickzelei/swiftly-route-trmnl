"""Shared Swiftly API client for the SF Bay Ferry exploration scripts.

Stdlib only. Reads credentials from a sibling .env file. Every call requests
JSON so callers never have to touch protobuf.
"""

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

BASE_URL = "https://api.goswift.ly"


def _load_env():
    """Load KEY=VALUE pairs from .env next to this file into os.environ."""
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    if not os.path.exists(env_path):
        return
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())


_load_env()

API_KEY = os.environ.get("SWIFTLY_API_KEY", "")
AGENCY_KEY = os.environ.get("AGENCY_KEY", "sfbay-ferry")


def get_json(path, **params):
    """GET a Swiftly endpoint and return parsed JSON.

    `path` is everything after BASE_URL, e.g. "/info/sfbay-ferry/routes".
    Keyword args become query params (None values are dropped).
    """
    if not API_KEY or API_KEY.startswith("replace-with"):
        sys.exit("ERROR: set SWIFTLY_API_KEY in .env before running.")

    query = {k: v for k, v in params.items() if v is not None}
    url = BASE_URL + path
    if query:
        url += "?" + urllib.parse.urlencode(query)

    req = urllib.request.Request(url, headers={"Authorization": API_KEY})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        sys.exit(f"HTTP {e.code} for {url}\n{body}")
    except urllib.error.URLError as e:
        sys.exit(f"Network error for {url}: {e.reason}")


def pick(d, *keys):
    """Return the first present key from a dict, tolerating camelCase/snake_case."""
    if not isinstance(d, dict):
        return None
    for k in keys:
        if k in d:
            return d[k]
    return None
