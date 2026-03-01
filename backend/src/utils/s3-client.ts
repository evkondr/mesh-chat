import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv';
dotenv.config();


const s3Client = new S3Client({
  region: "ru-1",
  endpoint: process.env.AWS_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  }
});
 export default s3Client;