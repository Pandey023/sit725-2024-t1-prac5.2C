const express = require("express");
const { runDB } = require('./model');
const { submitForm } = require('./controller');
const { addCards } = require('./view');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/api/card', (req, res) => {
    submitForm(req.body)
        .then(() => res.json({ statusCode: 201, message: 'Card posted successfully' }))
        .catch(error => {
            console.error(error);
            res.status(500).json({ statusCode: 500, message: 'Internal server error' });
        });
});

app.get('/api/cards', async (req, res) => {
    try {
        const cards = await getAllCards();
        addCards(cards);
        res.json({ statusCode: 200, message: 'Cards retrieved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log('Express server started');
    runDB();
});
