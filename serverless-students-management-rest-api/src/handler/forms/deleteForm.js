/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteForm = (event, context, callback) => {

	const params = {
		TableName: 'forms',
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
            body: JSON.stringify({
                status: 'success',
                data: data.Item
            })
        };

		callback(null, response);
	});
}