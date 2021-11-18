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
const redisUrl = 'redis://3.0.19.255:7001';
const redisClient = redis.createClient(redisUrl);

module.exports.createStudent = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);
    const studentId = data.email;

    const params = {
        TableName: 'students',
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
            body: JSON.stringify(data.Item)
        };

        if (response.statusCode === 201) {
            console.log("REMOVE LIST STUDENTS FROM REDIS");
            redisClient.hdel("students", "all", (err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })  
            
            console.log(`WRITE STUDENT ${studentId} INTO REDIS`);
            redisClient.hset("students", studentId, JSON.stringify(params.Item),(err, val) => {
                if(err) {
                    console.log("ERR: ",err);
                }
                console.log("VAL: ", val);
            })             
        }

        callback(null, response);
    });
}