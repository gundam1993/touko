const config = require('config-lite')
const qiniu = require('qiniu')
const axios = require('axios')

// 获取相册图片信息及TOKEN 
exports.getPhotographyInfo = async (ctx, next) => {
  qiniu.conf.ACCESS_KEY = config.qiniu.AccessKey
  qiniu.conf.SECRET_KEY = config.qiniu.SecretKey
  //构建bucketmanager对象
  const client = new qiniu.rs.Client()
  //你要测试的空间， 并且这个key在你空间中存在
  const bucket = config.qiniu.photoBucket
  //获取文件信息
  client.stat(bucket, key, function(err, ret) {
    if (!err) {
      console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType)
    } else {
      console.log(err)
    }
  })
}