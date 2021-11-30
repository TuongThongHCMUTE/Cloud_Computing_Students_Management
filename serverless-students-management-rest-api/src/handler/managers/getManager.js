/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getManager = (event, context, callback) => {

    const params = {
        TableName: 'managers',
        Key: {
            id: event.pathParameters.id
        }
    };

    dynamoDb.get(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = data.Item ? {
            statusCode: 200,
            body: JSON.stringify({
                status: 'success',
                data: data.Item
            })
        }: {
            statusCode: 404,
            body: JSON.stringify({
                status: 'fail',
                message: 'Manager not found'
            })
        };

        callback(null, response);
    });
}