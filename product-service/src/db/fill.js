const products = require("./mocks/products.json");
const stocks = require("./mocks/stock.json");

const { DynamoDBClient, BatchWriteItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: 'eu-central-1'});

const productsJson = products.map(({ id, title, description, price }) => ({
    PutRequest: {
        Item: {
            id: {
                S: id,
            },
            title: {
                S: title,
            },
            description: {
                S: description,
            },
            price: {
                N: `${price}`,
            },
        },
    },
}));

const stocksJson = stocks.map(({ productId, count }) => ({
    PutRequest: {
        Item: {
            productId: {
                S: productId,
            },
            count: {
                N: `${count}`,
            },
        },
    },
}));

const handler = function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
};

const batchProducts = async () => {
    const command = new BatchWriteItemCommand({
        RequestItems: {
            products: [...productsJson],
        },
    }, handler);
    return await client.send(command);
};
const batchStocks = async () => {
    const command = new BatchWriteItemCommand({
        RequestItems: {
            stock: [...stocksJson],
        },
    }, handler);
    return await client.send(command);
};

const run = async () => {
    await batchProducts();
    await batchStocks();
}

run().then(() => console.log('done'));