# pylint: disable=E0401
"""
This endpoint allows to customize the badges to export.
"""
from flask import render_template


def customize_route(app):
    """
    Registers the customize route of the application.

    Args:
        app (Flask): The Flask application instance.
    """

    @app.route("/customize", methods=["GET", "POST"])
    def customize():
        """
        Handles requests to the `/customize` route.
        """

        return render_template("customize.html")
