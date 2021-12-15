/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const redis = require('redis');
const redisUrl = 'redis://13.214.181.35:7001';
const redisClient = redis.createClient(redisUrl);

module.exports.deleteStudent = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const studentId = event.pathParameters.id;
    const params = {
        TableName: 'students',
        Key: {
            id: studentId
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
            console.log(`REMOVE STUDENT ${studentId} IN REDIS`);
            redisClient.hdel("students", studentId, (err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })

            console.log("REMOVE LIST STUDENTS FROM REDIS");
            redisClient.hdel("students", "all", (err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })               
        }

        callback(null, response);
    });
}