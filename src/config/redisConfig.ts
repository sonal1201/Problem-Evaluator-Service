import redis from'ioredis'

import serverConfig from './serverConfig'

const redisConfig = {
    port : serverConfig.REDIS_PORT,
    host: serverConfig.REDIS_HOST
}

const redisConnecetion = new redis(redisConfig)

export default redisConnecetion