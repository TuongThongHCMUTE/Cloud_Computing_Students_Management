/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const uuid = require('uuid');
const S3 = require('aws-sdk/clients/s3');

const BUCKET_NAME = process.env.AWS_BUCKET_NAME

const s3 = new S3()

module.exports.uploadFile = async (event, context, callback) => {
    console.log(event);

    const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify({
            message: ''
        })
    }; 

    try {
        const parsedBody = JSON.parse(event.body);
        const base64File = parsedBody.file;
        const decodedFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        
        const imageKey = `${uuid.v1()}_${parsedBody.fileName}`;

        console.log(imageKey, BUCKET_NAME)

        const params = {
            Bucket: BUCKET_NAME,
            Key: imageKey,
            Body: decodedFile
        };

        const uploadResult = await s3.upload(params).promise();

        response.body = JSON.stringify({
            status: 'success',
            message: 'Upload file thành công',
            imageKey: uploadResult.Key
        });
    } catch (e) {
        console.error(e);
        response.body = JSON.stringify({
            status: 'fail',
            message: 'Lỗi upload file',
            errorMessage: e });
        response.statusCode = 500;
    }

    callback(null, response)
}