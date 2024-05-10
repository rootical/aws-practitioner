export default {
    handler: `src/functions/handlers.catalogBatchProcess`,
    events: [
        {
            sqs: {
                batchSize: 5,
                arn: {
                    "Fn::GetAtt": [
                        "SQSQueue",
                        "Arn",
                    ]
                }
            }
        },
    ],
};