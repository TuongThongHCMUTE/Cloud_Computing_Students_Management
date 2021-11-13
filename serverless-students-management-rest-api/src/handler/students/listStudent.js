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
// Error here!
// const client = redis.createClient(redisUrl);

module.exports.listStudent = (event, context, callback) => {

    // Check if we have value for students in redis
    // let students = null
    // client.hget("students", "all", (err, val) => { students = val });
    // console.log("STUDENTS", students);

    // If we do, return that
    // if (students) {
    //     const doc = JSON.parse(students);

    //     console.log("DOC: ", doc);
    //     console.log("READ STUDENTS FROM REDIS");

    //     // return Array.isArray(doc) 
    //     // ? doc.map( d => this.model(d))
    //     // : new this.model(doc)
    // }
 
    // Otherwise, exec the query
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

        // // Store the result in redis
        // console.log("STORE DATA TO REDIS");
        // console.log("RESPONSE: ", response.body);

        callback(null, response);
    });
}