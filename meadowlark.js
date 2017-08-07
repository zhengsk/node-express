const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const getFortune = require('./lib/fortune').fortune;

const app = express();
const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'handlebars',
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views/layouts'));

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', {
        fortune: getFortune(),
        pageTestScript: '/qa/tests-about.js',
    });
});

app.get('/header', (req, res) => {
    res.set('Content-Type', 'text/plain');
    let s = '';

    Object.keys(req.headers).forEach((key) => {
        s += `${key}:${req.headers[key]}\n`;
    });

    res.send(s);
});

// page 404
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// 500
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost: ${app.get('port')}; press Ctrl+C to terminate.`);
});