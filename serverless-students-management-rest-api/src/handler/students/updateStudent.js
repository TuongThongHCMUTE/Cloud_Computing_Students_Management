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

module.exports.updateStudent = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);
    const studentId = event.pathParameters.id;

    // if( typeof data.task !== 'string' || typeof data.done !== 'boolean') {
    //     console.error('Value of task or done is invalid');
    //     const response = {
    //         statusCode: 400,
    //         body: JSON.stringify({ "message":"Value of task or done is invalid" })
    //     }

    //     return;
    // }

    const updates = Object.keys(data)
    const expressionAttributeValues = {}
    var updateExpression = 'set '

    updates.forEach((update) => {
        expressionAttributeValues[':' + update] = data[update]
        updateExpression = updateExpression + update + ' = :' + update + ', '
    })

    const params = {
        TableName: 'students',
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeValues: {
            ...expressionAttributeValues,
            ':u': datetime
        },
        UpdateExpression: updateExpression + 'updatedAt = :u'

    };

    dynamoDb.update(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };

        if (response.statusCode === 200) {
            // Update student in redis
            // console.log(`UPDATE STUDENT ${studentId} IN REDIS`);
            // redisClient.hset("students", studentId, response.body, (err, val) => {
            //     if(err) {
            //         console.log("ERR: ",err);
            //     }
            //     console.log("VAL: ", val);
            // });

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