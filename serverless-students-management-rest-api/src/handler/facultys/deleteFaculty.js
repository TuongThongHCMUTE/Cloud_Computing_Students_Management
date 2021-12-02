/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const redis = require('redis');
const redisUrl = 'redis://3.0.19.255:7001';
const redisClient = redis.createClient(redisUrl);

module.exports.deleteFaculty = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

	const facultyId = event.pathParameters.id;
	const params = {
		TableName: 'facultys',
		Key: {
			id: facultyId
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

		if (response.statusCode === 200) {
            console.log(`REMOVE FACULTY ${facultyId} IN REDIS`);
            redisClient.hdel("faculties", facultyId, (err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })

            console.log("REMOVE LIST FACULTIES FROM REDIS");
            redisClient.hdel("faculties", "all", (err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })             
        }

		callback(null, response);
	});
}