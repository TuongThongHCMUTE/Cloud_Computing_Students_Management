/**
 * 
 * @author AJ Catambay | Bridging Code 2020
 * 
 */
'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createStudent = (event, context, callback) => {

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);

    // if( typeof data.task !== 'string' ) {
    //     console.error('Task is not a string');
    //     const response = {
    //         statusCode: 400,
    //         body: JSON.stringify({ "message":"Task is not a string." })
    //     }

    //     return;
    // }

    const params = {
        TableName: 'students',
        Item: {
            id: uuid.v1(),
            name: data.name, 
            image: data.image,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            ethnicGroup: data.ethnicGroup,
            major: data.major,
            studentId: data.studentId,
            class: data.class,
            faculty: data.faculty,
            position: data.position,
            phoneNumber: data.phoneNumber,
            email: data.email,
            address: data.address,
            actived: true,
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

        callback(null, response);
    });
}