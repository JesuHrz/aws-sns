const AWS = require('aws-sdk')

const SNS_ARN = 'arn:aws:sns:us-east-1:763079279002:app/GCM/AWS-SNS'

const aws = () => {
  AWS.config.update({
    region: process.env.AWS_REGION || 'us-east-1'
  })

  const sns = new AWS.SNS()

  const sendPushNofitication = async (message, arn) => {
    return new Promise((resolve, reject) => {
      let payload = {
        default: message,
        APNS: {
          aps: {
            alert: message
          }
        }
      }

      payload.APNS = JSON.stringify(payload.APNS)
      payload = JSON.stringify(payload)

      sns.publish({
        Message: payload,
        MessageStructure: 'json',
        TargetArn: arn
      }, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  const registerDeviceToken = async token => {
    return new Promise((resolve, reject) => {
      sns.createPlatformEndpoint({
        PlatformApplicationArn: SNS_ARN,
        Token: token
      }, (err, data) => {
        if (err) return reject(err)
        resolve(data.EndpointArn)
      })
    })
  }

  return {
    sendPushNofitication,
    registerDeviceToken
  }
}

module.exports = {
  aws
}
