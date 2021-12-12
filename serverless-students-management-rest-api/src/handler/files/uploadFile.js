/**
 * 
 * @author Group 10
 * 
 */
'use strict'

require('dotenv').config()
const fs = require('fs')
const uuid = require('uuid')
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})
 
module.exports.uploadFile = (event, context, callback) => {
    const file = event.body.file

    console.log(file)

    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: uuid.v1() + '_' + file.filename
    }

    console.log(uploadParams)

    const result = s3.upload(uploadParams).promise()

    res.status(200).json({
        status: 'success',
        message: 'Upload file thành công',
        data: {
            displayName: file.originalname,
            imageKey: result.Key
        }
    })
}