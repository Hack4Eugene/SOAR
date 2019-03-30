const express = require('express');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { authenticate } = require('./middleware/ecan-passport-strategy');

/*
    Import DB Collection Models
 */
require('./models/organizationModel');
require('./models/projectModel');
require('./models/eventModel');
require('./models/userModel');

// mongoose connection
mongoose.Promise = global.Promise;
// const ecanDB = 'mongodb://www.ecan-db.hnavarro-api.com/ECANdb';

mongoose.connect('mongodb://127.0.0.1:27017')
// mongoose.connect(ecanDB)
//     .then(client => { console.log('Connected to ECANdb'); })
//     .catch(err => {
//         console.error(`Unable to connect to ECANdb. Check if MongoDB instance is running
// 					   Run mongodb instance in another terminal using: mongod
//                        ${err.stack || err }`);
//     });

//Initialize and use the passport JWT strategy
app.use(passport.initialize());
require('./middleware/ecan-passport-strategy');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Content-Type", "application/json");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
});
/*
    Import API Routes
 */
require('./routes/organizationRoutes')(app);
require('./routes/projectRoutes')(app);
require('./routes/eventRoutes')(app);
require('./routes/userRoutes')(app);

app.get('/health', (req, res) => res.status(200).send({ msg: 'Active' }));

app.listen(port, () => console.log(`ECAN server started on: ${port}`));

app.use((req, res, next) => res.status(404).send({ url: `${req.originalUrl} not found` }));

module.exports = app; //for testing
