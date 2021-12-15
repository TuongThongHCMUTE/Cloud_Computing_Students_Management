/**
 * 
 * @author Group 10
 * 
 */
'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const redis = require('redis');
const redisUrl = 'redis://13.214.181.35:7001';
const redisClient = redis.createClient(redisUrl);

module.exports.createManager = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);
    const managerId = data.email;

    const params = {
        TableName: 'managers',
        Item: {
            // id: uuid.v1(),
            id: data.email,
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

        if (response.statusCode === 201) {
            console.log("REMOVE LIST MANAGERS FROM REDIS");
            redisClient.hdel("managers", "all", (err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })  
            
            console.log(`WRITE MANAGER ${managerId} INTO REDIS`);
            redisClient.hset("managers", managerId, JSON.stringify(params.Item),(err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })             
        }

        callback(null, response);
    });
}