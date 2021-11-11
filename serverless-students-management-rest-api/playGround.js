const datetime = new Date().toISOString();

const data = {
    "phoneNumber": "0393425437",
    "studentId": "18110207",
    "createdAt": "2021-11-10T13:01:29.481Z",
    "address": "Bến Tre",
    "email": "18110207@student.hcmute.edu.vn",
    "name": {
        "firstName": "Thông",
        "lastName": "Đinh"
    },
    "class": "18110CLST1",
    "gender": "Nam",
    "faculty": "LCH Khoa Đào tạo chất lượng cao",
    "ethnicGroup": "Kinh",
    "image": "src/imange/18110207.jpg",
    "updatedAt": "2021-11-10T13:01:29.481Z",
    "major": "Công nghệ thông tin",
    "dateOfBirth": "31/05/2000",
    "id": "5212ff90-4226-11ec-b8cd-7f2f16c0aa2c",
    "actived": "true",
    "position": "Đoàn viên"
}


const updates = Object.keys(data)
const expressionAttributeValues = {}
var updateExpression = 'set '

updates.forEach((update) => {
    expressionAttributeValues[':' + update] = data[update]
    updateExpression = updateExpression + update + ' = :' + update + ', '
})

console.log(JSON.stringify(expressionAttributeValues))

// const data02 = JSON.parse(expressionAttributeValues)
// console.log(updateExpression)


// const params = {
//     TableName: 'students',
//     Key: {
//         id: "event.pathParameters.id"
//     },
//     ExpressionAttributeValues: expressionAttributeValues,
//     UpdateExpression: updateExpression

// };

// const hello = ':hello'
// params.ExpressionAttributeValues[hello] = 'hello'

const params = {
    TableName: 'students',
    Key: {
        id: 'event.pathParameters.id'
    },
    ExpressionAttributeValues: {
        ...expressionAttributeValues,
        ':u': datetime
    },
    UpdateExpression: updateExpression + 'updatedAt = :u'

};

// console.log(params)