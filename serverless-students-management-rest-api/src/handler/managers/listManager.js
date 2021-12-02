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

module.exports.listManager = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    // Check if we have value for list students in redis
    redisClient.hget("managers", "all", (err, val) => {
        if (val) {
            console.log("CACHE HIT. READ ALL MANAGERS FROM REDIS");
            console.log("MANAGERS: ", val);
            
            const response = {
                statusCode: 200,
                body: val
            };
            callback(null, response);
        }
        // Otherwise, exec the query and store result into redis  
        else {
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

                // Store the result in redis
                console.log("CACHE MISS. READ ALL MANAGERS FROM DYNAMODB AND STORE TO REDIS");
                redisClient.hset("managers", "all", response.body, (err, val) => {
                    if(err) {
                        console.log("ERR: ",err);
                    }
                    console.log("VAL: ", val);
                });
    
                const timestamp = 300;
                redisClient.expire("managers", timestamp)
        
                callback(null, response);
            });
        }
    })
}