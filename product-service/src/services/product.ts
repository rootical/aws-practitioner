import {ProductServiceInterface, ProductInterface, StockInterface} from './products';
import {DynamoDBClient, TransactWriteItem} from "@aws-sdk/client-dynamodb";
import {GetCommand, ScanCommand, TransactWriteCommand} from "@aws-sdk/lib-dynamodb";
const uuid = require('uuid');
import {stockService} from "@functions/handlers";

class Product implements ProductServiceInterface {
    private client: DynamoDBClient;
    private tableName: string = "products";

    constructor(client: DynamoDBClient) {
        this.client = client;
    }

    getCreateProductTranskItem = (product: ProductInterface): TransactWriteItem => {
        return {
            Put: {
                // @ts-ignore
                Item: {
                    ...product,
                },
                TableName: this.tableName,
            },
        };
    };

    async getProductById(id: string): Promise<ProductInterface | undefined> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: {id},
        })
        const result = await this.client.send(command);

        return result.Item as ProductInterface;
    }

    async getAllProducts(): Promise<ProductInterface[]> {
        const command = new ScanCommand({
            TableName: this.tableName,
        })
        const result = await this.client.send(command);
        return result.Items as ProductInterface[];
    }

    async createProduct(product: ProductInterface, stock: StockInterface) {
        const productId = uuid.v4();
        const productTransactItem = this.getCreateProductTranskItem({...product, id: productId});
        const stockTransactItem = stockService.getCreateStockTranskItem({...stock, productId});
        const command = new TransactWriteCommand({
            TransactItems: [productTransactItem, stockTransactItem]
        })

        await this.client.send(command);

        return {...product, id: productId, count: stock.count};
    }
}

export {Product};