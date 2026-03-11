from flask import Flask

from app.routes import main


def create_app():
    application = Flask(__name__, template_folder="app/templates", static_folder="app/static")
    application.register_blueprint(main)
    return application


if __name__ == "__main__":
    create_app().run(debug=True, port=5000)
