/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteStudent = (event, context, callback) => {

    const params = {
        TableName: 'students',
        Key: {
            id: event.pathParameters.id
        }
    };

    dynamoDb.delete(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({})
        };

        callback(null, response);
    });
}