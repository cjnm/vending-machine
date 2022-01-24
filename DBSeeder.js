const { MongoClient } = require('mongodb');
let mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1/vending-machine';
let mongoClient = new MongoClient(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let database = 'vending-machine';

const main = async function main() {
    await mongoClient.connect();
    const db = await mongoClient.db(database);

    let moneyDocumentCount = await db.collection("money").count();
    let inventoryDocumentCount = await db.collection("inventories").count();
    console.log(moneyDocumentCount, ' money document found');
    console.log(inventoryDocumentCount, ' inventory document found');

    if (0 == inventoryDocumentCount) {
        console.log('Seeding Inventory');
        await db.collection("inventories").insert({ name: 'coke', price: 20, quantity: 10 });
        await db.collection("inventories").insert({ name: 'pepsi', price: 25, quantity: 10 });
        await db.collection("inventories").insert({ name: 'dew', price: 30, quantity: 10 });
    } else {
        console.log('Inventory already exists, skipping seeding.');
    }

    if (0 == moneyDocumentCount) {
        console.log('Seeding Money');
        await db.collection("money").insert({ coin: 100, cash: 0 });
    } else {
        console.log('Money already exists, skipping seeding.');
    }
}


main();