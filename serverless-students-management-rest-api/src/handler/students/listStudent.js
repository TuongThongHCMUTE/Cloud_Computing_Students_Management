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

// const util = require('util');
// redisClient.hget = util.promisify(redisClient.hget);

module.exports.listStudent = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    // Check if we have value for list students in redis
    redisClient.hget("students", "all", (err, val) => {
        if (val) {
            console.log("CACHE HIT. READ STUDENTS FROM REDIS");
            console.log("STUDENTS: ", val);
            
            const response = {
                statusCode: 200,
                body: val
            };
    
            callback(null, response);
        } else {
            // Otherwise, exec the query and store result into redis 
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
    
                // Store the result in redis
                console.log("CACHE MISS. READ STUDENTS FROM DYNAMODB AND STORE TO REDIS");
                redisClient.hset("students", "all", response.body, (err, val) => {
                    if(err) {
                        console.log("ERR: ",err);
                    }
                    console.log("VAL: ", val);
                });
    
                // const timestamp = 300;
                // redisClient.expire("students", timestamp)
                callback(null, response);
            });
        }
    });


}