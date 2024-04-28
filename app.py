from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__, template_folder='template')
app.secret_key = ""

# Dummy user database (replace this with a real database in production)
users = {
    'user1@example.com': {
        'email': 'user1@example.com',
        'password': 'password1'
    }
}

@app.route('/', methods=['GET', 'POST'])
def login_or_signup():
    if 'email' in session:
        return redirect(url_for('home'))
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if request.form['action'] == 'signup':
            if email in users:
                return "Email already exists!"
            users[email] = {
                'email': email,
                'password': password
            }
            session['email'] = email
            return redirect(url_for('home'))
        elif request.form['action'] == 'signin':
            if email not in users or users[email]['password'] != password:
                return "Invalid email or password!"
            session['email'] = email
            return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/home')
def home():
    if 'email' not in session:
        return redirect(url_for('login_or_signup'))
    return f"Welcome, {session['email']}!"

@app.route('/logout')
def logout():
    session.pop('email', None)
    return redirect(url_for('login_or_signup'))

if __name__ == '__main__':
    app.run(debug=True)
