const { S3Client } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
require("dotenv").config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
});

const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

module.exports = { bucketName, s3, randomName };
