const express = require('express');
const bodyParser = require('body-parser');



const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('login'));

// Dummy user database (replace this with a real database in production)
const users = {
    'user1@example.com': {
        email: 'user1@example.com',
        password: 'password1'
    }
};


app.use(bodyParser.json());

// Signup route
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (email in users) {
        return res.status(400).json({ error: 'Email already exists!' });
    }
    users[email] = { email, password };
    res.sendStatus(204);
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!(email in users) || users[email].password !== password) {
        return res.status(400).json({ error: 'Invalid email or password!' });
    }
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
