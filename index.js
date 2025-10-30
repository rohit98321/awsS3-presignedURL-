import dotenv from "dotenv"
dotenv.config()
import {DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
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

const putObjectURL= async (filename,contentType)=>{
    const command=new PutObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:`uploads/user-uploads/${filename}`,
        ContentType:contentType
    });
    const url=await getSignedUrl(s3Client,command)
    return url
};

const listObjects=async ()=>{

    const command=new ListObjectsV2Command({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:"/"
    })

    const result=await s3Client.send(command)
    console.log(result);

}

const deleteObject = async (key)=>{
    const command=new DeleteObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:key
    });

    await s3Client.send(command);
}



const init=async ()=>{
    // console.log("url for simple.mp4",await getObjectURL("uploads/user-uploads/video-1761827280052.mp4"));

    // console.log("url for uploading",await putObjectURL(`video-${Date.now()}.mp4`,"video/mp4"));
    
    // await listObjects();

    await deleteObject("uploads/user-uploads/video-1761827280052.mp4")
}

init()