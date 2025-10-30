import dotenv from "dotenv"
dotenv.config()
import {GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const {GetObjectCommand,s}=require("@aws-sdk/client-s3")



//api calling behalf of user whose credential you are using
const s3Client=new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY,
    },
});

const getObjectURL= async (key)=>{
    const command=new GetObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:key,
    })
    const url=await getSignedUrl(s3Client,command)
    return url;
}

const init=async ()=>{
    console.log("url for simple.mp4",await getObjectURL("simple.mp4"));
}

init()