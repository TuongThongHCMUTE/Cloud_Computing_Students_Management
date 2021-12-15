/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const S3 = require('aws-sdk/clients/s3');

const BUCKET_NAME = process.env.AWS_BUCKET_NAME

const s3 = new S3()
  
module.exports.downloadFile = async (event, context, callback) => {
    const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify({
            message: 'Load file thành công'
        }),
    }; 

    try {
        const {fileKey} = event.queryStringParameters
    
        const downloadParams = {
            Key: fileKey,
            Bucket: BUCKET_NAME
        }

        console.log(downloadParams)

        const signedUrlExpireSeconds = 60 * 60;
        const url = await s3.getSignedUrl('getObject', {
            Bucket: downloadParams.Bucket,
            Key: downloadParams.Key,
            Expires: signedUrlExpireSeconds
        });

        response.body = JSON.stringify({
            status: 'success',
            message: 'Load file thành công',
            url
        });
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