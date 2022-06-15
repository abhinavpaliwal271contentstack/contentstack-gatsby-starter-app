import {
  MongoClient,
  ServerApiVersion,
} from 'mongodb';

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

const dbName = "demo-contentfly-functions"

export default async function handler(req, res) {
  try {
    const data = req.body;
    await addNewLead(data);
    res.status(201);
  } catch (error) {
    res.status(400).json({ error: 'Invalid JSON in request body' });
  }
}

const addNewLead = async doc => {
  try {
    await client.connect()

    const db = client.db(dbName)
    const leads = db.collection("leads")

    const result = await leads.insertOne(doc)
    console.log(`A lead was inserted with the _id: ${result.insertedId}`)
  } catch (err) {
  } finally {
    await client.close()
  }
}
