const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid')

// Config here
const bucketName = 'cloud-comuting-student-management'
const region = 'ap-southeast-1'
const accessKeyId = 'AKIA4HFALN6GTRGP3YUD'
const secretAccessKey = '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'

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file, folder) {
  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: `${folder}/${uuid.v1()}/${file.name}`
  }

  console.log(uploadParams)
  return s3.upload(uploadParams).promise()
}
exports.uploadFileS3 = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStreamS3 = getFileStream

// list files from s3
function listFiles() {
  const downloadParams = {
    Bucket: bucketName
  }

  return s3.listObjects(downloadParams).promise() // return err, data
}
exports.listFilesS3 = listFiles

// delete a file from s3
function deleteFile(fileKey) {
  const deteteParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  console.log(deteteParams)
  return s3.deleteObject(deteteParams).promise() // return err, data
}
exports.deleteFileS3 = deleteFile