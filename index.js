const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

// database connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bhwsqpg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const carsCollection = client.db("autoWorld").collection('cars');

async function run() {
    try {
        app.get('/cars', async (req, res) => {
            const query = {};
            const cars = await carsCollection.find(query).toArray()
            res.send(cars)
        })
        app.post('/cars', async (req, res) => {
            const car = req.body;
            const result = await carsCollection.insertOne(car);
            res.send(result)
        })
    } catch (error) {

    }
}

run().catch(err => console.error(err))


app.get('/', (req, res) => {
    res.send('Auto world server is running')
})

app.listen(port, () => {
    console.log(`server is running fine on port ${port}`)
})