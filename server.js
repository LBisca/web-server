const express = require('./node_modules/express');
const hbs = require('./node_modules/hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFileSync('server.log', log + '\n')
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs') 
// });

app.get('/', (req, res) => {
    res.render('home.hbs' , {
        pageTitle: 'Welcome',
        currentYear: new Date().getFullYear()
    });
})

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs' , {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/json', (req,res) => {
    res.send({
        name: 'Lucas',
        Address: 'Av Filipe Lobo 151'
    })
})

app.get('/bad', (req,res) => {

})

app.listen(port, () => {
    console.log(`Server is on port:${port}`);
});
