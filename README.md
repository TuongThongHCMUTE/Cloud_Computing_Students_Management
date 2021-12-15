# Nhóm 10 - Xây dựng ứng dụng quản lý thông tin sinh viên sử dụng dịch vụ serverless của AWS
Đề tài với mục tiêu hướng đến việc giới thiệu rộng rãi chương trình “Sinh viên 5 tốt” đến các bạn sinh viên, đặc biệt là các bạn sinh viên mới, nên mục đích của nhóm là xây dựng một website cho người quản lý đăng nhập và quản lý các thông tin về hồ sơ đăng ký tham gia phong trào của sinh viên, cũng như chức năng tạo hồ sơ cá nhân cho sinh viên. Bằng những kiến thức được giảng dạy và tìm hiểu, sau 1 học kỳ, nhóm cũng đã hoàn thành việc xây dựng thành công một website với các yêu cầu đã đề ra như website chạy trên dịch vụ điện toán đám mây Serverless là Lambda Function của nền tảng đám mây Amazon AWS với cơ sở dữ liệu là AWS DynamoDB và Redis là bộ nhớ cache. 


## Thành viên
* Lê Nhật Tường | 18110234
* Đinh Bách Thông | 18110207
* Trần Võ Bửu Điền | 18110092

## Deploy ứng dụng trên EC2 AWS
[Website quản lý thông tin sinh viên 5 tốt](https://main.d2w26m07cywgez.amplifyapp.com/)

## Các công nghệ sử dụng
* Backend Lambda function
* Lưu trữ dữ liệu sử dụng DynamoDB
* Catch dữ liệu với redis
* Lưu trữ các file minh chứng trên AWS S3 Bucket
* Deploy frontend trên EC2 AWS 

# Hướng dẫn cài đặt
## 1. Cài đặt serverless và deploy backend
Trong đề tài này nhóm sử dụng Serverless framework (https://www.serverless.com/) để thiết lập bộ khung và cấu hình ứng dụng. Việc deploy các dịch vụ của AWS cũng sử dụng framework này. Để tiến hành thiết lập và cài đặt thực hiện theo các bước sau đây:
### Bước 1: Cd bào thư mục serverless-students-management-rest-api và gõ lệnh bên dưới tại terminal để cài đặt serverless frame work
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

