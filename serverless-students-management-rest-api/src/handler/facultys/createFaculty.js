/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createFaculty = (event, context, callback) => {

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'facultys',
        Item: {
            id: uuid.v1(),
            // id: data.email,
            ...data,
            createdAt: datetime,
            updatedAt: datetime
        }
    };

    dynamoDb.put(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify({
                status: 'success',
                data: params.Item
            })
        };

        callback(null, response);
    });
}