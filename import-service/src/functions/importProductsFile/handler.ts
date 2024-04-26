import { formatJSONResponse } from '@libs/api-gateway';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { middyfy } from '@libs/lambda';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const importProductsFile = async (event) => {
    const client = new S3Client({ region: 'eu-central-1'});

    const { name } = event.queryStringParameters;
    const command = new PutObjectCommand({
        Bucket: 'file-parcer-shop-stuff',
        Key: `uploaded/${name}`,
    });

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 100000});

    return formatJSONResponse({
        body: signedUrl,
        event,
    });
};

export const main = middyfy(importProductsFile);