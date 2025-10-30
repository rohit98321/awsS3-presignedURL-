import {GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const {GetObjectCommand,s}=require("@aws-sdk/client-s3")



//api calling behalf of user whose credential you are using
const s3Client=new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:'AKIARWHYVAG6VGVRNIFH',
        secretAccessKey:"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"
    },
});

const getObjectURL= async (key)=>{
    const command=new GetObjectCommand({
        Bucket:"rohit-private-r98321",
        Key:key,
    })
    const url=await getSignedUrl(s3Client,command)
    return url;
}

const init=async ()=>{
    console.log("url for simple.mp4",await getObjectURL("simple.mp4"));
}

init()