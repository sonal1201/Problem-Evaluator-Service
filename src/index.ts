import express, {Express} from "express"
import bodyParser from "body-parser"

import serverConfig from "./config/serverConfig"
// import sampleQueueProducer from "./producers/sampleQueueProducer"
import apiRouter from "./routes"
import SampleWorker from "./workers/SampleWorkersResponse"
import runPythonCode from "./containers/pythonContainer"


const app: Express = express()

//bodyPasrer
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());


app.use('/api',apiRouter)


app.listen(serverConfig.PORT,()=>{
    console.log(`Listenng to ${serverConfig.PORT}`)

    SampleWorker('SampleQueue');


    const code = `
x= input()
y= input()
c =x+y
print("Value of x is:", x)
print("Value of y is:", y)
print(c)
`

const testCase =`100
200
`

    runPythonCode(code,testCase);

})