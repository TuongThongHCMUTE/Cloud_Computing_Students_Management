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

module.exports.getStudent = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const studentId = event.pathParameters.id;

    // Check if we have value for student in redis
    redisClient.hget("students", studentId, (err, val) => {
        if (val) {
            console.log(`CACHE HIT. READ STUDENT ${studentId} FROM REDIS`);
            console.log("STUDENT: ", val);
            
            const response = {
                statusCode: 200,
                body: {
                    status: 'success',
                    data: val
                }
            };
    
            callback(null, response);
        }
        else {
            const params = {
                TableName: 'students',
                Key: {
                    id: studentId
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
                        message: 'Student not found'
                    })
                };

                if (response.statusCode === 200) {
                    // Store the result in redis
                    console.log(`CACHE MISS. READ STUDENT ${studentId} FROM DYNAMODB AND STORE TO REDIS`);
                    redisClient.hset("students", studentId, response.body, (err, val) => {
                        if(err) {
                            console.log("ERR: ",err);
                        }
                        console.log("VAL: ", val);
                    });
        
                    const timestamp = 300;
                    redisClient.expire("students", timestamp)                   
                }
        
                callback(null, response);
            });
        }
    })
}