import type {AWS} from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';

const dynamoDBResources = {
    products: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
            TableName: "products",
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "S",
                },
            ],
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH",
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
    },
    stock: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
            TableName: "stock",
            AttributeDefinitions: [
                {
                    AttributeName: "productId",
                    AttributeType: "S",
                },
            ],
            KeySchema: [
                {
                    AttributeName: "productId",
                    KeyType: "HASH",
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
    },
};

const serverlessConfiguration: AWS = {
    service: 'product-service',
    frameworkVersion: '3',
    plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
    provider: {
        name: 'aws',
        runtime: 'nodejs20.x',
        region: "eu-central-1",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: [
                    'dynamodb:Scan',
                    'dynamodb:Query',
                    'dynamodb:GetItem',
                    'dynamodb:PutItem',
                    'dynamodb:UpdateItem',
                    'dynamodb:DeleteItem',
                ],
                Resource: [
                    'arn:aws:dynamodb:eu-central-1:434889505863:table/products',
                    'arn:aws:dynamodb:eu-central-1:434889505863:table/stock'
                ],
            }
        ]
    },
    // import the function via paths
    functions: {
        getProductsList,
        getProductsById,
        createProduct,
    },
    package: {individually: true},
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node20',
            define: {'require.resolve': undefined},
            platform: 'node',
            concurrency: 10,
        },
        autoswagger: {
            apiType: 'http',
            basePath: '/${sls:stage}',
            typefiles: ['./src/services/products.ts'],
        }
    },
    resources: {
        Resources: dynamoDBResources
    }
};

module.exports = serverlessConfiguration;
