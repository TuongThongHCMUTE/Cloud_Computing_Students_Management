/**
 * 
 * @author Group 10
 * 
 */
 'use strict'

 const AWS = require('aws-sdk');
 const uuid = require('uuid');
 
 const dynamoDb = new AWS.DynamoDB.DocumentClient();
 
 module.exports.changePassword = (event, context, callback) => {
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
                
                // Change password
                const datetime = new Date().toISOString();
                const paramsUpdate = {
                    TableName: 'students',
                    Key: {
                        id: body.email
                    },
                    ExpressionAttributeValues: {
                        ':password': body.newPassword,
                        ':u': datetime
                    },
                    UpdateExpression: 'set password = :password, updatedAt = :u'
                };
                
                dynamoDb.update(paramsUpdate, (error, dataUpdate) => {
                    if(error) {
                        console.error(error);
                        callback(new Error(error));
                        return;
                    }
                
                    const response = {
                        statusCode: 201,
                        body: JSON.stringify({
                            status: 'success',
                            message: 'Cập nhật mật khẩu thành công',
                            data: data.Item
                        })
                    }
                    callback(null, response);
                });
            } else {
                const response = {
                    statusCode: 404,
                    body: JSON.stringify({
                        status: 'fail',
                        message: 'Mật khẩu hiện tại không đúng'
                    })
                };
                callback(null, response);
            }
        } else {
            const response =  {
                statusCode: 404,
                body: JSON.stringify({
                    status: 'fail',
                    message: 'Tài khoản không tồn tại'
                })
            };
            callback(null, response);
        }
    });
}