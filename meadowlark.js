let path = require('path');
let express = require('express');
let handlebars = require('express-handlebars');
let getFortune = require('./lib/fortune').fortune;

let app = express();
let hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'handlebars'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views/layouts'));

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', {
        fortune: getFortune()
    });
});

// page 404
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

// 500
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' +
        app.get('port') +
        '; press Ctrl+C to terminate.');
});