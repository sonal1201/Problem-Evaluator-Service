import redis from'ioredis'

import serverConfig from './serverConfig'

const redisConfig = {
    port : serverConfig.REDIS_PORT,
    host: serverConfig.REDIS_HOST,
    maxRetriesPerRequest:null
}

const redisConnection = new redis(redisConfig)

export default redisConnection