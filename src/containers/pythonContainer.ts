// import Docker from 'dockerode';
// import { TestCases } from '../types/testCases';
import { PYTHON_IMG } from '../utils/constants';

import createcontainer from './containerFac';

async function runPythonCode(code:string) {
    
    const rawBuffer = [];
    const pythonDockerContainer = await createcontainer(PYTHON_IMG,['python3','-c',code,'stty -echo']);
    console.log("Started");
    await pythonDockerContainer.start();

    const loggerStrem  = await pythonDockerContainer.logs({
        stderr:true,
        stdout:true,
        follow:true,
        timestamps:false
    })

    loggerStrem.on('data',(chunk)=>{
        rawBuffer.push(chunk)
    })

    return pythonDockerContainer;
}

export default runPythonCode