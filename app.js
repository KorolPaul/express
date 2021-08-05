const express = require('express');
const app = express();
const path = require('path')

/* midleware */
app.use((req, res, next) => {
    console.log(new Date(), req.url);
    next();
});

/* static */
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

/* redirect */
app.use("/google", function (request, response) {
    response.redirect("https://google.com")
});

/* params */
app.use("/params", function (request, response) {
    let { value } = request.query;
    response.send(`<h1>Param value: ${value}</h1>`);
});
app.get("/params2/:value", function (request, response) {
    let { value } = request.params;
    response.send(`<h1>Param value: ${value}</h1>`);
});

/* 404 */
app.use(function (req, res) {
    res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(3000);
