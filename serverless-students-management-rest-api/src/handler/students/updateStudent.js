/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateStudent = (event, context, callback) => {

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);

    // if( typeof data.task !== 'string' || typeof data.done !== 'boolean') {
    //     console.error('Value of task or done is invalid');
    //     const response = {
    //         statusCode: 400,
    //         body: JSON.stringify({ "message":"Value of task or done is invalid" })
    //     }

    //     return;
    // }

    const updates = Object.keys(data)
    const expressionAttributeValues = {}
    var updateExpression = 'set '

    updates.forEach((update) => {
        expressionAttributeValues[':' + update] = data[update]
        updateExpression = updateExpression + update + ' = :' + update + ', '
    })

    const params = {
        TableName: 'students',
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeValues: {
            ...expressionAttributeValues,
            ':u': datetime
        },
        UpdateExpression: updateExpression + 'updatedAt = :u'

    };

    dynamoDb.update(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };

        callback(null, response);
    });
}