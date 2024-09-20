from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

# Load visitor count from file or initialize to 0
try:
    with open('visitor_count.json', 'r') as f:
        visitor_count = json.load(f)
except FileNotFoundError:
    visitor_count = 0

@app.route('/')
def index():
    global visitor_count
    visitor_count += 1
    
    # Save updated visitor count
    with open('visitor_count.json', 'w') as f:
        json.dump(visitor_count, f)
    
    return render_template('index.html', visitor_count=visitor_count)

@app.route('/guestbook', methods=['POST'])
def guestbook():
    name = request.form.get('name')
    message = request.form.get('message')
    
    if name and message:
        entry = {
            'name': name,
            'message': message,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        try:
            with open('guestbook.json', 'r') as f:
                guestbook = json.load(f)
        except FileNotFoundError:
            guestbook = []
        
        guestbook.append(entry)
        
        with open('guestbook.json', 'w') as f:
            json.dump(guestbook, f)
        
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error', 'message': 'Name and message are required'}), 400

@app.route('/guestbook', methods=['GET'])
def get_guestbook():
    try:
        with open('guestbook.json', 'r') as f:
            guestbook = json.load(f)
    except FileNotFoundError:
        guestbook = []
    
    return jsonify(guestbook)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
