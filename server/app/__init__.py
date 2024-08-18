from apiflask import APIFlask

app = APIFlask(__name__)

from app import routes
