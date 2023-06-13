import clientPromise from "../../lib/mongodb";

const bootstrap_url = 'https://fantasy.premierleague.com/api/bootstrap-static/'

async function getBootstrapData() {
    const response = await fetch(bootstrap_url);
    const data = await response.json();
    return data;
}

function formatData(data) {
    //Players data
    const players = data['elements'];
    //console.log(players);

    //We take the player data and just pull out the 
    //fields we want and put it in a new list
    const minimized_player_list = []
    for (let i=0; i<players.length; i++) {
        minimized_player_list[i] = {
            first_name: players[i]["first_name"],
            last_name: players[i]["second_name"],
            display_name: players[i]["web_name"],
            now_cost: players[i]["now_cost"],
        }
    }

    return minimized_player_list;
}

async function initializeDB(data) {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('players');
    collection.insertMany(data);
    console.log(collection);
}

async function updateDB(data) {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('players');
    //collection.insertMany(data);
    //console.log(collection);
}



export default async function handler(req, res) {
    try {
        const mongoClient = await clientPromise;
        const data = await getBootstrapData();
        const formatted_data = formatData(data);
        const x = updateDB(formatted_data);
        
        res.status(200).json(formatted_data);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}
