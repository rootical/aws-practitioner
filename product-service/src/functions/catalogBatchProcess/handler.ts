import {ProductServiceInterface, ProductInterface} from '../../services/products';
import createError from 'http-errors';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";


const snsClient = new SNSClient({
    region: 'eu-central-1'
})

export const catalogBatchProcessHandler = (productService: ProductServiceInterface) => async (event, _context) => {
    try {
        const { Records } = event;
        await Promise.all(Records.map(async (record) => {
            const recordBody = JSON.parse(record.body);
            const {title, description, price, count} = recordBody;
            const product = { title, description, price: parseInt(price) };
            const stock = { stock: parseInt(count) || 0 };
            await productService.createProduct(
                product as ProductInterface,
                stock as any,
            );
            await snsClient.send(new PublishCommand({
                Message: `!!!The following product was successfully added to db:
          Title: ${title}
          Description: ${description}
          Stock: ${count}
          Price: ${price} 
        `,
                TopicArn: process.env.SNS_ARN,
                MessageAttributes: {
                    price: {
                        DataType: 'Number',
                        StringValue: price,
                    }
                }
            }));
        }));
        console.log('attempt to publish records to the sns queue');

        console.log('sns queue publish completed');
    } catch (err) {
        throw new createError.InternalServerError();
    }
};