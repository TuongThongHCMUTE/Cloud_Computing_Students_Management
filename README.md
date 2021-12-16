# Nhóm 10 - Xây dựng ứng dụng quản lý thông tin sinh viên sử dụng dịch vụ serverless của AWS
Đề tài với mục tiêu hướng đến việc giới thiệu rộng rãi chương trình “Sinh viên 5 tốt” đến các bạn sinh viên, đặc biệt là các bạn sinh viên mới, nên mục đích của nhóm là xây dựng một website cho người quản lý đăng nhập và quản lý các thông tin về hồ sơ đăng ký tham gia phong trào của sinh viên, cũng như chức năng tạo hồ sơ cá nhân cho sinh viên. Bằng những kiến thức được giảng dạy và tìm hiểu, sau 1 học kỳ, nhóm cũng đã hoàn thành việc xây dựng thành công một website với các yêu cầu đã đề ra như website chạy trên dịch vụ điện toán đám mây Serverless là Lambda Function của nền tảng đám mây Amazon AWS với cơ sở dữ liệu là AWS DynamoDB và Redis là bộ nhớ cache. 


## Thành viên
* Lê Nhật Tường | 18110234
* Đinh Bách Thông | 18110207
* Trần Võ Bửu Điền | 18110092

## Deploy ứng dụng trên EC2 AWS
[Website quản lý thông tin sinh viên 5 tốt](http://ec2-13-214-181-35.ap-southeast-1.compute.amazonaws.com:3000/)

## Các công nghệ sử dụng
* Backend Lambda function
* Lưu trữ dữ liệu sử dụng DynamoDB
* Catch dữ liệu với redis
* Lưu trữ các file minh chứng trên AWS S3 Bucket
* Deploy frontend trên EC2 AWS 

# Hướng dẫn cài đặt
## 1. Cài đặt serverless và deploy backend
Trong đề tài này nhóm sử dụng Serverless framework (https://www.serverless.com/) để thiết lập bộ khung và cấu hình ứng dụng. Việc deploy các dịch vụ của AWS cũng sử dụng framework này. Để tiến hành thiết lập và cài đặt thực hiện theo các bước sau đây:
### Bước 1: Cd vào thư mục serverless-students-management-rest-api và gõ lệnh bên dưới tại terminal để cài đặt serverless frame work
```js
npm install -g serverless
```
### Bước 2: Tạo bộ khung ứng dụng với serverless.
```js
serverless create --template aws-nodejs --name student-management-api --path student-management-api
```
Khi tạo thành công bộ khung cho ứng dụng. Serverless sẽ tạo các thư mục và file config serverless.yml. Tại đây bạn có thể cài đặt các resource sử dụng trong ứng dụng gao gồm Lambda function, AWS S3 và AWS DynamoDB.
### Bước 3: Cấu hình credentials cho serverless. Để có thể cung cấp quyền truy cập vào AWS cho serverless cần tạo user trong IAM roles. 
```js
serverless config credentials --provider aws --key < Access key ID > --secret <Secret access key>
```
### Bước 4: Deploy backend bằng việc sử dụng lệnh. 
```js
serverless deploy
```
## 2. Cài đặt redis trên EC2
Redis là bộ nhớ dạng key-value cho phép dữ liệu được lưu trữ và truy xuất với tốc độ cực nhanh. Nhờ ưu điểm này, nó trở thành một lựa chọn tuyệt vời để sử dụng với Docker container. Redis là 1 trong 3 Docker image phổ biến nhất. Link Docker redis image trên Docker hub [Redis](https://hub.docker.com/_/redis/) . Để chạy Redis container, nhóm thực hiện đã chuẩn bị:
- Máy chủ EC2.
- Docker được cài đặt và đang chạy.
### Bước 1: Pull redis image từ docker hub bằng lệnh
```js
docker pull redis
```
### Bước 2: Chuyển tiếp cổng của Docker cho redis, thêm tag -p [host port]:6379 vào docker running command. Trong đề tài, nhóm thiết lập chuyển tiếp cổng để sử dụng redis container bằng cổng 7001:
Trong phạm vi đề tài, nhóm thực hiện cần kết nối tới redis container từ xa bằng lambda function. Vì vậy nhóm thực hiện sử dụng chuyển tiếp cổng của Docker để truy cập tới redis container bằng tên miền hoặc địa chỉ IP của máy chủ EC2.
```js
docker run --name my-redis-container -p 7001:6379 -d redis.
```
### Bước 3: Tạp kết nối với redis
```js
const redis = require('redis');
const redisUrl = 'redis://<Your EC2 IP>:7001';
const redisClient = redis.createClient(redisUrl);
```
## 3. Deploy lambda function, DynamoDB và S3 Bucket
Khi khởi tạo ứng dụng với serverless framework. Thư viện này cung cấp file serverless.yml giúp người dùng có thể cấu hình khi deploy lên AWS một cách dễ dàng.
### Bước 1: Cấu hình file serverless.yml
Các thông tin cấu hình chung:
```js
service: student-management-rest-api
frameworkVersion: '2'

provider:
  name: aws
  runtime: nodejs12.x
  region: ap-southeast-1
  iamRoleStatements:
    - Effect: Allow
      Action:
          - dynamodb:*
          - s3:*
      Resource: '*'

custom:
  aws_bucket_name: "cloud-comuting-student-management"
```

Cấu hình AWS S3 Bucket và bảng “students” trên DynamoDB:
```js
resources:
  Resources:
    FileUploadBucket:
        Type: AWS::S3::Bucket
        Properties:
            BucketName: ${self:custom.aws_bucket_name}
            AccessControl: PublicRead
    StudentsTable:
      Type: 'AWS::DynamoDB::Table'
      DeletionPolicy: Retain
      Properties:
        AttributeDefinitions:
          -
            AttributeName: id
            AttributeType: S
        KeySchema:
          -
            AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: 'students'
```
Một số cấu hình endpoint Lambda function (Các function thực hiện thêm xóa sửa các sinh viên):
```js
functions:
  createStudent:
    handler: src/handler/students/createStudent.createStudent
    events:
      - http:
          path: students
          method: post
          cors: true
    timeout: 20
  listStudent:
    handler: src/handler/students/listStudent.listStudent
    events:
      - http:
          path: students
          method: get
          cors: true
    timeout: 20
  getStudent:
    handler: src/handler/students/getStudent.getStudent
    events:
      - http:
          path: students/{id}
          method: get
          cors: true
    timeout: 20
  updateStudent:
    handler: src/handler/students/updateStudent.updateStudent
    events:
      - http:
          path: students/{id}
          method: put
          cors: true
    timeout: 20
  deleteStudent:
    handler: src/handler/students/deleteStudent.deleteStudent
    events:
      - http:
          path: students/{id}
          method: delete
          cors: true
    timeout: 20
```
### Bước 2: deploy ứng dụng lên AWS chúng ta chỉ cần sử dụng lệnh:
```js
serverless deploy
```
### Bước 3: Thay đổi cấu hình S3 để giúp upload file.
> Vào AWS console chọn S3 --> Chọn vào Bucket vừa tạo --> Vào phần Permissions --> Chọn Edit tại Cross-origin resource sharing (CORS) theo lệnh bên dưới
```js
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "HEAD",
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag"
        ]
    }
]
```
## 4. Deploy front end lên EC2
Trong đề tài này, nhóm thực hiện đã xây dựng một React website để tương tác với API phía serverless lamda function. Website được deploy lên server EC2 bằng cách xây dựng một React app Docker image và push lên Docker Hub. Sau đó từ server EC2 tiến hành pull Docker image về và chạy Docker container. Các bước thực hiện cụ thể như sau:
### Bước 1: Xây dựng Dockerfile và .dockerignore. Với nội dung Dockerfile trong đề tài:
```js
FROM node:13.12.0-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```
Khi sử dụng lệnh ADD hoặc COPY, có những file không mong muốn nằm lẫn giữ những file cần thiết. Có thể bỏ qua bằng file .dockerignore tương tự như .gitignore:
``js
node_modules
Dockerfile
.git
```
### Bước 2: Build docker image và push lên Docker Hub:
Đầu tiên, build docker image bằng lệnh sau:
```js
  docker build -t aws_students_management:latest .
```
Quá trình build docker image sẽ mất một khoảng thời gian để thực hiện. Khi có thông báo build thành công, có thể kiểm tra image bằng cách:
``js
 docker images
```
Tiếp theo, run image ở local để kiểm tra container có hoạt động hay không bằng lệnh sau: 
``js
docker run -p 3000:3000 -d aws_students_management:latest
```
Sau khi chắc chắn rằng docker đã được build và run thành công, nhóm thực hiện tiến hành push docker image lên Docker Hub.
``js
docker tag <image id> <dockerhub-username >/ aws_students_management:v1
docker push <dockerhub-username >/ aws_students_management:v1
```
### Bước 3: Pull docker image từ Docker Hub và run container:
Từ tài khoản aws, nhóm thực hiện tiến hành lauch và start một EC2 instance. Truy cập vào EC2 instance và cài đặt docker (nếu cần thiết). Tiếp theo, nhóm thực hiện pull docker image đã được push ở bước trước đó từ docker hub:
```js
docker pull <dockerhub-username >/ aws_students_management:v1
```
Tiếp theo, nhóm tiến hành run container ở EC2 instance. Tương tự với redis container, nhóm thực hiện cần truy cập website từ xa bằng tên miền hoặc địa chỉ IP của máy chủ EC2. Vì vậy nhóm thực hiện sử dụng chuyển tiếp cổng của Docker:
``js
docker run -p 3000:3000 -d <dockerhub-username>/ aws_students_management:v1
### Bước 4: Truy cập website từ web browser:
Khi đã hoàn thành các bước trên, website của nhóm đã có thể truy cập từ bất cứ đâu thông qua tên miền của EC2 instance tại port 3000.

## 5. Khởi chạy ứng dụng
Để đảm bảo Backend và Frontend có thể tương tác với nhau cần cài đặt CROS Extention trên Browsers và bật Allow CROS tại link:
[Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

# Liên hệ
[Tường Lê](https://www.facebook.com/tuongle.234/) |
[Thông Đinh](https://www.facebook.com/thong.alpha3105) |
[Bửu Điền](https://www.facebook.com/tranvobuudien)





