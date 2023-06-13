import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db('fpl');
        const collection = db.collection('players');

        const results = await collection.find({}).toArray();
        
        res.status(200).json(results);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}
