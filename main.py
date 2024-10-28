from flask import Flask, render_template, request, redirect, jsonify, url_for, session
import json

app = Flask(__name__)
app.secret_key = 'super_secret_key'  # Chave para manter sessões seguras

# Simular um banco de dados de usuários
users = {
    "admin": "admin123",
    "manager": "manager123",
    "security": "security123"
}

# Simular recursos internos (gerenciados como um arquivo JSON)
resources_file = 'resources.json'

# Rota da página de login
@app.route('/')
def login():
    return render_template('index.html')


# Rota para verificar o login
@app.route('/login', methods=['POST'])
def login_user():
    username = request.form.get('username')
    password = request.form.get('password')
    
    # Autenticar o usuário
    if username in users and users[username] == password:
        session['user'] = username
        return redirect(url_for('dashboard'))
    else:
        return render_template('index.html', error="Invalid credentials. Please try again.")

# Rota do dashboard (protegida)
@app.route('/dashboard')
def dashboard():
    if 'user' in session:
        return render_template('dashboard.html', user=session['user'])
    else:
        return redirect(url_for('login'))

# Rota para logout
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

# Rota para obter a lista de recursos (JSON)
@app.route('/api/resources', methods=['GET'])
def get_resources():
    if 'user' in session:
        with open(resources_file, 'r') as file:
            resources = json.load(file)
        return jsonify(resources)
    else:
        return jsonify({"error": "Unauthorized"}), 401

# Rota para adicionar novo recurso
@app.route('/api/resources', methods=['POST'])
def add_resource():
    if 'user' in session:
        new_resource = {
            "name": request.json.get('name'),
            "status": request.json.get('status')
        }

        with open(resources_file, 'r') as file:
            resources = json.load(file)
        
        resources.append(new_resource)

        with open(resources_file, 'w') as file:
            json.dump(resources, file)

        return jsonify({"message": "Resource added successfully"})
    else:
        return jsonify({"error": "Unauthorized"}), 401

# Iniciar o servidor
if __name__ == '__main__':
    # Criar arquivo JSON se não existir
    try:
        with open(resources_file, 'x') as file:
            json.dump([], file)
    except FileExistsError:
        pass

    app.run(debug=True)
