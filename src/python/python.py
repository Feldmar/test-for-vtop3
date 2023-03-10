
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

# определяем класс-обработчик запросов
class MyHandler(BaseHTTPRequestHandler):

    # метод для обработки POST-запросов
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        # преобразуем данные из формата JSON в объект Python
        data = json.loads(post_data.decode('utf-8'))

        # отправляем данные на сервер в формате JSON
        with open('json/server-ok.json', 'w') as f:
            json.dump(data, f)

        # отправляем ответ клиенту
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(b'{"status": "success"}')

# создаем HTTP-сервер и указываем порт
httpd = HTTPServer(('localhost', 8000), MyHandler)
print('Server started on localhost:8000')

# запускаем HTTP-сервер
httpd.serve_forever()