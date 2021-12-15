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

module.exports.createFaculty = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);
    const facultyId =  uuid.v1();

    const params = {
        TableName: 'facultys',
        Item: {
            id: facultyId,
            // id: data.email,
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
            console.log("REMOVE LIST FACULTIES FROM REDIS");
            redisClient.hdel("faculties", "all", (err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })  
            
            console.log(`WRITE FACULTY ${facultyId} INTO REDIS`);
            redisClient.hset("faculties", facultyId, JSON.stringify(params.Item),(err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })             
        }

        callback(null, response);
    });
}