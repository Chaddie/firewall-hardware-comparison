"""Vercel serverless entry point — exposes the Flask app as `app`."""

import os
import sys

# Ensure the project root is on the import path so `app` package resolves
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.routes import main  # noqa: E402
from flask import Flask  # noqa: E402

app = Flask(
    __name__,
    template_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), "app", "templates"),
    static_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), "app", "static"),
)
app.register_blueprint(main)
