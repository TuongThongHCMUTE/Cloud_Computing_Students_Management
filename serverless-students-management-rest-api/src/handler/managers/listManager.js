/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.listManager = (event, context, callback) => {
    // Otherwise, exec the query
    const params = {
        TableName: 'managers'
    };

    dynamoDb.scan(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                status: 'sucess',
                results: data.Items.length,
                data: data.Items
            })
        };

        callback(null, response);
    });
}