const path = require('path');
const {logger} = require('./middlewares/logger');
const {errorHandler} = require('./middlewares/errorHandler');
const express = require('express');
const cors = require('cors');
const rootRoute = require('./routes/root');
const aboutRoute = require('./routes/about');
const usersRoute = require('./routes/api/users');
const signUpRoute = require('./routes/api/signUp');
const signInRoute = require('./routes/api/signIn');
const profileRoute = require('./routes/api/profile');

const PORT = process.env.PORT || 5000;
const URL = process.env.URL || 'http://localhost';
const whiteList = ['http://localhost:5000'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

const app = express();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build/static')));

app.use('/', rootRoute);
app.use('/about', aboutRoute);
app.use('/users', usersRoute);
app.use('/sign-up', signUpRoute);
app.use('/sign-in', signInRoute);
app.use('/profile', profileRoute);

app.all('*', (request, response) => {
    response.status(404);

    if(request.accepts('html')) {
        return response.sendFile(path.join(__dirname, 'client/build/view', '404.html'));
    }
    if(request.accepts('json')) {
        return response.json({error: '404 Not Found'});
    }
        
    response.type('text').send('404 Not Found');
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on ${URL}:${PORT}`));
