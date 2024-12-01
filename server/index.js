const express = require('express');
const cors = require('cors');
const app = express();
// const seedRoles = require('./SEED/seed.js');
//middleware
app.use(express.json()); //req.body
app.use(cors());

app.use('/dashboard', require('./routes/dashboard'));
app.use('/insurance_buy', require('./routes/Insurance'));
app.use('/client', require('./routes/clientRegistration'));
app.use('/enroll', require('./routes/server'));

// seedRoles();

app.listen(5000, () => {
    console.log('Server is running on PORT 5000');
});
