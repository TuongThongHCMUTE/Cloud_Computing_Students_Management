/**
 * 
 * @author Group 10
 * 
 */
 'use strict'

 const AWS = require('aws-sdk');
 const uuid = require('uuid');
 
 const dynamoDb = new AWS.DynamoDB.DocumentClient();
 
 module.exports.login = (event, context, callback) => { 
    const datetime = new Date().toISOString();
    const body = JSON.parse(event.body);

    const params = {
        TableName: 'students',
        Key: {
            'id': body.email
        }
    };

    dynamoDb.get(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        if (data.Item) {
            if (data.Item.password === body.password) {
                data.Item.password = body.newPassword
                
                

                const response = {
                    statusCode: 201,
                    body: JSON.stringify({
                        status: 'success',
                        message: 'Đăng nhập thành công',
                        data: data.Item
                    })
                }
                callback(null, response);
            }

            const response = {
                statusCode: 404,
                body: JSON.stringify({
                    status: 'fail',
                    message: 'Mật khẩu hiện tại không đúng'
                })
            };
            callback(null, response);
        }

        const response =  {
            statusCode: 404,
            body: JSON.stringify({
                status: 'fail',
                message: 'Email không tồn tại'
            })
        };
        callback(null, response);
    });
 }