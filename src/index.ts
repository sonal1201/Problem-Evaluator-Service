import express, {Express} from "express"
import bodyParser from "body-parser"

import serverConfig from "./config/serverConfig"
// import sampleQueueProducer from "./producers/sampleQueueProducer"
import apiRouter from "./routes"
import SampleWorker from "./workers/SampleWorkersResponse"


// import runPythonCode from "./containers/pythonContainer"
// import runJavaCode from "./containers/runJavaDocker"
// import runCppCode from "./containers/runCppDocker"
import SubmissionWorker from "./workers/submissionWorker"
import { Submission_Queue } from "./utils/constants"
import submissionProducer from "./producers/submissionProducer"


const app: Express = express()

//bodyPasrer
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());


app.use('/api',apiRouter)


app.listen(serverConfig.PORT,()=>{
    console.log(`Listenng to ${serverConfig.PORT}`)

    SampleWorker('SampleQueue');
    SubmissionWorker(Submission_Queue);




    const code = `
#include <iostream>
using namespace std;

int main() {
    int num;
    cin >> num;
    cout << "Input number: " << num ;
    return 0;
}
`;
const testcase =`42`

submissionProducer({'123':{
    language:"CPP",
    testcase,
    code
}})

    // runCppCode(code,testCase);

})