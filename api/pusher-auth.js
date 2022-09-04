const Pusher = require("pusher");

exports.handler = async function({ body }) {
  const {
    API_PUSHER_APP_ID: appId = '',
    API_PUSHER_KEY: key = '',
    API_PUSHER_SECRET: secret = '',
    API_PUSHER_CLUSTER: cluster = '',
  } = {
    ...process.env,
    ...(
      process.env.CONTEXT === 'production' ? {
        API_PUSHER_APP_ID: '1098511',
        API_PUSHER_KEY: '8c1a514d6892be74297d',
        API_PUSHER_SECRET: 'b864209c59d1fc366173',
        API_PUSHER_CLUSTER: 'us2'
      } : process.env.CONTEXT === 'branch-deploy' ? {
        API_PUSHER_APP_ID: '1098510',
        API_PUSHER_KEY: 'a0f29649a516d754ecb8',
        API_PUSHER_SECRET: '404b50a6b678e6f45436',
        API_PUSHER_CLUSTER: 'us2'
      } : process.env.CONTEXT === 'deploy-preview' ? {
        API_PUSHER_APP_ID: '1098509',
        API_PUSHER_KEY: '29342aca3e65df94f50a',
        API_PUSHER_SECRET: 'eb2bd0c11dd1b067f3ef',
        API_PUSHER_CLUSTER: 'us2'
      } : {
        API_PUSHER_APP_ID: '1098511',
        API_PUSHER_KEY: '8c1a514d6892be74297d',
        API_PUSHER_SECRET: 'b864209c59d1fc366173',
        API_PUSHER_CLUSTER: 'us2'
      }
    )
  }

  console.log(appId, key, secret, cluster)

  const pusher = new Pusher({ appId, key, secret, cluster })

  console.log(body)

  const {
    channel_name: channelName,
    socket_id: socketId
  } = JSON.parse('{"' + decodeURI(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

  return {
    statusCode: 200,
    body: JSON.stringify(pusher.authenticate(socketId, channelName))
  }
}
