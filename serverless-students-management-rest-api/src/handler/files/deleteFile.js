/**
 * 
 * @author Group 10
 * 
 */
 'use strict'

const S3 = require('aws-sdk/clients/s3');

const BUCKET_NAME = process.env.AWS_BUCKET_NAME

const s3 = new S3()
  
module.exports.deleteFile = async (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Xóa file thành công'
        })
    };

    try {
        const {fileKey} = event.queryStringParameters
    
        const deteteParams = {
            Key: fileKey,
            Bucket: BUCKET_NAME
        }

        const result = await s3.deleteObject(deteteParams).promise()

        response.body = JSON.stringify({
            status: 'success',
            message: 'Xóa file thành công',
        })

    } catch (e) {
        console.error(e);
        response.body = JSON.stringify({
            message: 'Lỗi load file',
            errorMessage: e
        });
        response.statusCode = 500;
    }

    callback(null, response)
 }