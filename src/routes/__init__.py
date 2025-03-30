"""Initializes the routes."""
from .index import index_route
from .update import update_route
from .customize import customize_route
from .health import health_route


def register_routes(app):
    """
    Register routes for the Flask application.

    Args:
        app (Flask): The Flask application instance.

    Routes:
        routes.index: Renders the main page.
        routes.update: Updates the badge data.
    """

    index_route(app)
    health_route(app)
    update_route(app)
    customize_route(app)
