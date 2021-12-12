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
  
module.exports.deleteFile = (event, context, callback) => {
    const fileKey = event.pathParameters.id

    const deteteParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    
    if (fileKey) {
        const response = s3.deleteObject(deteteParams).promise()

        res.status(403).json({
            status: 'success',
            message: 'Xóa file thành công',
        })
    } else {
        res.status(403).json({
            status: 'fail',
            message: 'File không tồn tại',
        })
    }
 }