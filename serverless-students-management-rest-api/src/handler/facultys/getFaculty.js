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

module.exports.getFaculty = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const facultyId = event.pathParameters.id;

    // Check if we have value for faculty in redis
    redisClient.hget("faculties", facultyId, (err, val) => {
        if (val) {
            console.log(`CACHE HIT. READ FACULTY ${facultyId} FROM REDIS`);
            console.log("FACULTY: ", val);
            
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
                TableName: 'facultys',
                Key: {
                    id: facultyId
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
                        message: 'Faculty not found'
                    })
                };

                if (response.statusCode === 200) {
                    // Store the result in redis
                    console.log(`CACHE MISS. READ FACULTY ${facultyId} FROM DYNAMODB AND STORE TO REDIS`);
                    redisClient.hset("faculties", facultyId, response.body, (err, val) => {
                        if(err) {
                            console.log("ERR: ",err);
                        }
                        console.log("VAL: ", val);
                    });
        
                    const timestamp = 300;
                    redisClient.expire("faculties", timestamp)                   
                }
        
                callback(null, response);
            });
        }
    })
}