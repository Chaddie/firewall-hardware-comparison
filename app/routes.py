from flask import Blueprint, jsonify, render_template

from .data import (
    FEATURE_COMPARISON,
    HARDWARE_TIERS,
    HEALTHCHECK_DATA,
    TAKEAWAYS,
    TAKEDOWN_DATA,
    VENDORS,
)

main = Blueprint("main", __name__)


@main.route("/")
def index():
    return render_template("index.html")


@main.route("/api/vendors")
def api_vendors():
    return jsonify(VENDORS)


@main.route("/api/hardware/<tier>")
def api_hardware(tier):
    if tier not in HARDWARE_TIERS:
        return jsonify({"error": "Invalid tier"}), 404
    return jsonify(HARDWARE_TIERS[tier])


@main.route("/api/hardware")
def api_hardware_all():
    return jsonify(HARDWARE_TIERS)


@main.route("/api/features")
def api_features():
    return jsonify(FEATURE_COMPARISON)


@main.route("/api/takeaways")
def api_takeaways():
    return jsonify(TAKEAWAYS)


@main.route("/api/healthcheck")
def api_healthcheck():
    return jsonify(HEALTHCHECK_DATA)


@main.route("/api/takedown")
def api_takedown():
    return jsonify(TAKEDOWN_DATA)
