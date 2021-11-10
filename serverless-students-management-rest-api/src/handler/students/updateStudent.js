/**
 * 
 * @author AJ Catambay | Bridging Code 2020
 * 
 */
'use strict'

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateStudent = (event, context, callback) => {

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);

    // if( typeof data.task !== 'string' || typeof data.done !== 'boolean') {
    //     console.error('Value of task or done is invalid');
    //     const response = {
    //         statusCode: 400,
    //         body: JSON.stringify({ "message":"Value of task or done is invalid" })
    //     }

    //     return;
    // }

    const params = {
        TableName: 'students',
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeValues: {
            ':id': data.studentId,
            ':name': data.name,
            ':image': data.image,
            ':gender': data.gender,
            ':dob': data.dateOfBirth,
            ":ethnic": data.ethnicGroup,
            ":major": data.major,
            ":class": data.class,
            ":faculty": data.faculty,
            ":position": data.position,
            ":phone": data.phoneNumber,
            ":address": data.address,
            ":active": data.activate,
            ':u': datetime
        },
        UpdateExpression:   'set studentId = :id, ' +
                            'name = :name, ' +
                            'image = :image, ' + 
                            'gender = :gender, ' +
                            'dateOfBirth = :dob, ' + 
                            'ethnicGroup = :ethnic, ' +
                            'major = :major, ' + 
                            'class = :class, ' +
                            'faculty = :faculty, ' +
                            'position = :position, ' + 
                            'phoneNumber = :phone, ' +
                            'address = :address, ' + 
                            'active = :active, ' +
                            'updatedAt = :u'

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

        callback(null, response);
    });
}