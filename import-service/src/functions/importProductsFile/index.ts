import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            s3: {
                bucket: "file-parcer-shop-stuff",
                event: "s3:ObjectCreated:*",
                existing: true,
                forceDeploy: true,
                rules: [
                    { prefix: 'uploads/' },
                    { suffix: '.csv' }
                ]
            },
        },
    ],
};