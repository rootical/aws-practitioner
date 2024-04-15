import { DynamoDBClient, TransactWriteItem } from "@aws-sdk/client-dynamodb";
import { StockInterface, StockServiceInterface } from "./products";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

class StockService implements StockServiceInterface {
    private client: DynamoDBClient;
    private tableName: string = "stock";

    constructor(client: DynamoDBClient) {
        this.client = client;
    }

    getCreateStockTranskItem = (stock: StockInterface): TransactWriteItem => {
        return {
            Put: {
                Item: {
                    ...stock,
                },
                TableName: this.tableName,
            },
        };
    };

    async getStockByProductId(productId: string): Promise<StockInterface[] | undefined> {
        const command = new ScanCommand({
            TableName: this.tableName,
            FilterExpression: "#productId = :id",
            ExpressionAttributeNames: {'#productId': 'productId'},
            ExpressionAttributeValues: {
                ":id": productId,
            },
        })
        const result = await this.client.send(command)

        return result.Items as StockInterface[];
    }

    async getStock(): Promise<StockInterface[]> {
        const command = new ScanCommand({
            TableName: this.tableName,
        })
        const result = await this.client
            .send(command)
        return result.Items as StockInterface[];
    }
}
export { StockService };