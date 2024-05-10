import type { AWS } from '@serverless/typescript';

import importFileParser from '@functions/importFileParcer';
import importProductsFile from '@functions/importProductsFile';


const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "s3:PutObject",
              "s3:PutObjectAcl",
              "s3:GetObject",
              "s3:GetObjectAcl",
              "s3:DeleteObject",
              "s3:CopyObject",
            ],
            Resource: `arn:aws:s3:::file-parcer-shop-stuff`,
          },
          {
            Effect: "Allow",
            Action: [
              "s3:*",
            ],
            Resource: `arn:aws:s3:::file-parcer-shop-stuff/*`,
          },
          {
            Effect: "Allow",
            Action: ["sqs:SendMessage", "sqs:GetQueueUrl", "sqs:ListQueues"],
            Resource: `arn:aws:sqs:eu-central-1:434889505863:catalogItemsQueue`,
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;