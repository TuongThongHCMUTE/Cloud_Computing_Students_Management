/**
 * 
 * @author AJ Catambay | Bridging Code 2020
 * 
 */
'use strict'

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.listStudent = (event, context, callback) => {

    const params = {
        TableName: 'students'
    };

    dynamoDb.scan(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };

        callback(null, response);
    });
}