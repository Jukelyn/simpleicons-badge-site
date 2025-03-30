# pylint: disable=E0401
"""This module provides the route for the index page."""
import json
from flask import render_template

DATA_PATH = "data/badges.json"


def get_last_updated_time() -> str:
    """
    Gets the last updated time information.

    Returns:
        (str): The last update time of the list.
    """

    with open("data/last_updated.txt", "r", encoding="utf-8") as f:
        return f.read().strip()


def index_route(app):
    """
    Registers the main entry point of the application.

    Args:
        app (Flask): The Flask application instance.
    """

    @app.route("/", methods=["GET"])
    def index():
        """
        Handles requests to the main `/` route.
        """

        with open(DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)

        return render_template("index.html",
                               data=data,
                               currentTime=get_last_updated_time())
