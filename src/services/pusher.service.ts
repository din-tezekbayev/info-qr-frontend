import Pusher from 'pusher-js'

const {
  VUE_APP_PUSHER_KEY: key,
  VUE_APP_PUSHER_CLUSTER: cluster,
  VUE_APP_PUSHER_AUTH_URL: auth
} = process.env

const pusher = new Pusher(key, {
  authEndpoint: auth,
  cluster
})
const hi = pusher.subscribe('private-wassup')
hi.bind('pusher:subscription_succeeded', () => console.log('???'))
hi.bind('pusher:subscription_error', (e) => console.log(e))

const channels: { [key: string]: any } = {}

export const subscribe = (
  channelName: string,
  eventCallbacks: { [key: string]: Function }
) => {
  const bind = (eventName: string, callback: Function) =>
    channels[channelName].bind(eventName, callback)

  if (!channels[channelName])
    channels[channelName] = pusher.subscribe(channelName)
    bind('pusher:subscription_succeeded', () => {
      console.log(`subscription to ${channelName} succeeeded`)
      channels[channelName].isSubscribed = true
    })

  const bindEventCallbacks = () =>
    Object.entries(eventCallbacks).forEach(([e, cb]) => bind(e, cb))

  if (!channels[channelName]?.isSubscribed)
    bind('pusher:subscription_succeeded', bindEventCallbacks)
  else bindEventCallbacks()

  return {
    bind,
    trigger: (eventName: string, data: { [key: string]: any }) =>
      trigger(channels[channelName], eventName, data),
    unsubscribe: () => unsubscribe(channelName)
  }
}

export const unsubscribe = (channelName: string) => {
  channels[channelName].unbind()
  pusher.unsubscribe(channelName)
}

export const unsubscribeAll = () =>
  Object.keys(channels).forEach(x => unsubscribe(x))

export const trigger = (
  channelName: string,
  eventName: string,
  data: { [key: string]: any }
) => triggerQueue.items.push({ channelName, eventName, data })

const triggerQueue = {
  items: [],
  timeLastExecuted: Date.now().valueOf(),
}

setInterval(() => {
  if (
    !!triggerQueue.items[0]
    && channels[triggerQueue.items[0].channelName]?.isSubscribed
    && ((Date.now().valueOf() - triggerQueue.timeLastExecuted) > 100)
  ) {
    const { channelName, eventName, data } = triggerQueue.items.shift()
    console.log(channels[channelName].trigger(eventName, data))
    triggerQueue.timeLastExecuted = Date.now().valueOf()
  }
}, 150)

export default {
  subscribe,
  trigger,
  unsubscribe,
  unsubscribeAll
}
