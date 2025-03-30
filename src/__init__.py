# pylint: disable=E0401
"""_summary_"""
from flask import Flask
from src.routes import register_routes

app = Flask(__name__,
            template_folder="../templates",
            static_folder="../static")

register_routes(app)
