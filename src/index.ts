import express, {Express} from "express"
import bodyParser from "body-parser"

import serverConfig from "./config/serverConfig"
// import sampleQueueProducer from "./producers/sampleQueueProducer"
import apiRouter from "./routes"
import SampleWorker from "./workers/SampleWorkersResponse"
// import runPythonCode from "./containers/pythonContainer"
import runJavaCode from "./containers/runJavaDocker"


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
    import java.util.Scanner;
    public class Main {  // Make sure this is the name of the class
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int num = scanner.nextInt();
            System.out.println("Input number: " + num);
        }
    }
  `;
const testCase =`42`

    runJavaCode(code,testCase);

})