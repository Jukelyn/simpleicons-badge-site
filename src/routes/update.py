# pylint: disable=E0401
"""
This endpoint re-downloads the README file and re-creates the badge data.
"""
from flask import redirect, url_for
import src.parse_md as parse


def update_route(app):
    """
    Registers the update route of the application.

    Args:
        app (Flask): The Flask application instance.
    """

    @app.route("/update_list", methods=["POST"])
    def update_list():
        """
        Handles requests to the `/update_list` route.

        If the request method is POST it updates the badge data.
        """

        file = parse.get_readme()
        badges = parse.parse_markdown_tables(file)
        parse.save_to_json(badges)

        return redirect(url_for('index'))
