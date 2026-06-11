const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb://fred_db_user:Fred13xd.@ac-kj9gdao-shard-00-00.leyvyf9.mongodb.net:27017,ac-kj9gdao-shard-00-01.leyvyf9.mongodb.net:27017,ac-kj9gdao-shard-00-02.leyvyf9.mongodb.net:27017/?ssl=true&replicaSet=atlas-k9l3lc-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db("sample_guides");
    const collection = db.collection("planets");

    const planets = await collection.find({}).toArray();

    console.log(planets);

    const pipeline = [
        {
            $match: {
            orderFromSun: { $gt: 2 }
            }
        },
        {
            $project: {
            _id: 0,
            name: 1,
            orderFromSun: 1,
            hasRings: 1
            }
        },
        {
            $sort: {
            orderFromSun: 1
            }
        },
        {
            $limit: 5
        }
    ];

    const agg = await collection.aggregate(pipeline).toArray();
    console.log(agg);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);





