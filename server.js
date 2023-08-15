const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const MongoDBSession = require("connect-mongodb-session")(session);
const cors = require('cors');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const app = express();
const mongoURL = 'mongodb+srv://allaganesh03:B4M3emLugcyCnztp@notes.e6vvh2c.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
let db;
var name;
let userFlightsCollection;

const store = new MongoDBSession(
 { uri:mongoURL,
  collection:'mysessions'}
)

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('Flights');
    userFlightsCollection = db.collection('Userflights');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(
  session({
    secret:'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    store:store
  })
);

app.use(express.urlencoded({ extended: true }));

function isAuth(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/flights', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/scripts', 'flights.js'));
});

app.get('/',isAuth, (req, res) => {
  if (req.session.isAuth) {
    res.redirect('/main');
  } else {
    res.redirect('/login');
  }
});
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await userFlightsCollection.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      bookedFlights: [],
      returnFlights:[]
    };
    await userFlightsCollection.insertOne(newUser);
    res.status(201).json({ message: 'Account Creation successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    name=username;
    const user = await userFlightsCollection.findOne({ username });
    if (!user) {
       return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    req.session.isAuth = true;
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500);
    } else {
      res.clearCookie('connect.sid'); 
      res.redirect('/');
    }
  });
});


app.get('/main',isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/ticket',isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ticket.html'));
});

app.post('/main', async (req, res) => {
  try {
    
    let {  flightNumber,fromCountry,toCountry, airline,price,passengers, departureTime, arrivalTime ,isReturn} = req.body;
    const username=name;
    const user = await userFlightsCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const flightId = uuidv4();
    let newBookedFlight = {flightId, flightNumber,fromCountry,toCountry, airline,price,passengers, departureTime, arrivalTime};
    if(!isReturn)
    {
    user.bookedFlights.push(newBookedFlight);
    await userFlightsCollection.updateOne({ username }, { $set: { bookedFlights: user.bookedFlights } });
    }
    else if(isReturn){
      user.returnFlights.push(newBookedFlight);
      await userFlightsCollection.updateOne({ username }, { $set: { returnFlights: user.returnFlights } });
      }
    if (req.headers.accept.includes('application/json')) {
      res.status(200).json({ message: 'Flight booked successfully' });
    } else {
      res.redirect('/main'); 
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/main1', async (req, res) => {
  try {
    const username = name;
    const user = await userFlightsCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/cancel', async (req, res) => {
  try {
    const { flightId } = req.body;
    const username = name;
    const user = await userFlightsCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
      user.bookedFlights = user.bookedFlights.filter((flight) => flight.flightId !== flightId);
      await userFlightsCollection.updateOne({ username }, { $set: { bookedFlights: user.bookedFlights } });
    
      user.returnFlights = user.returnFlights.filter((flight) => flight.flightId !== flightId);
      await userFlightsCollection.updateOne({ username }, { $set: { returnFlights: user.returnFlights } });
    

    res.status(200).json({ message: 'Flight canceled successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
