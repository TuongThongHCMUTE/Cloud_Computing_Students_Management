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

module.exports.listFaculty = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    // Check if we have value for list faculties in redis
    redisClient.hget("faculties", "all", (err, val) => {
        if (val) {
            console.log("CACHE HIT. READ ALL FACULTIES FROM REDIS");
            console.log("FACULTIES: ", val);

            const response = {
                statusCode: 200,
                body: val
            };
            callback(null, response);
        }
        // Otherwise, exec the query and store result into redis  
        else {
            const params = {
                TableName: 'facultys'
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
                console.log("CACHE MISS. READ ALL FACULTIES FROM DYNAMODB AND STORE TO REDIS");
                redisClient.hset("faculties", "all", response.body, (err, val) => {
                    if(err) {
                        console.log("ERR: ",err);
                    }
                    console.log("VAL: ", val);
                });
    
                const timestamp = 300;
                redisClient.expire("faculties", timestamp)

                callback(null, response);
            });
        }
    });
}