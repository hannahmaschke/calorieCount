const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://hannah:calorieCountPassword@cluster0.ywtvals.mongodb.net/'; 
const client = new MongoClient(uri);
const dbName = 'calorieTracker';
const collectionName = 'totals';

let db, collection;

// Connect to MongoDB
client.connect().then(() => {
  db = client.db(dbName);
  collection = db.collection(collectionName);
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// endpoint to save total calories
app.post('/api/saveTotalCalories', async (req, res) => {
  const { totalCalories } = req.body;

  if (typeof totalCalories !== 'number') {
    return res.status(400).json({ error: 'Invalid totalCalories value' });
  }

  const today = new Date().toISOString().split('T')[0]; 

  try {
    const result = await collection.updateOne(
      { date: today },
      {
        $set: { totalCalories, updatedAt: new Date() },
      },
      { upsert: true }
    );

    res.json({ success: true, date: today, totalCalories });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
