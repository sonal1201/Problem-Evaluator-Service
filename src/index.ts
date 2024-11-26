import express from "express"
import serverConfig from "./config/serverConfig"
import sampleQueueProducer from "./producers/sampleQueueProducer"
import apiRouter from "./routes"
import SampleWorker from "./workers/SampleWorkersResponse"


const app = express()


app.use('/api',apiRouter)

app.listen(serverConfig.PORT,()=>{
    console.log(`Listenng to ${serverConfig.PORT}`)

    SampleWorker('SampleQueue');

    sampleQueueProducer('SampleJob',{
        name:"Sonal Singh",
        company:"BigStartups",
        university:"LPU",
        cgpa:"7.3"
    })
})