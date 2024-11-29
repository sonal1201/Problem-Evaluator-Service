// import Docker from 'dockerode';
// import { TestCases } from '../types/testCases';
import { PYTHON_IMG } from '../utils/constants';

import createcontainer from './containerFac';
import decodeDockerSteram from './dockerHelper';

async function runPythonCode(code:string , inputTestCases: string) {
    
    const rawBuffer: Buffer[] = [];
    //const pythonDockerContainer = await createcontainer(PYTHON_IMG,['python3','-c',code,'stty -echo']);
    const pythonDockerContainer = await createcontainer(PYTHON_IMG, [
        '/bin/sh',
        '-c',
        `echo '${code.replace(/'/g, '\\"')}' > test.py && echo '${inputTestCases.replace(/'/g, '\\"')}' | python3 test.py`
      ]);
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

    loggerStrem.on('end',()=>{
        console.log(rawBuffer);
        const completeBuffer = Buffer.concat(rawBuffer);
        const decodedStrem = decodeDockerSteram(completeBuffer);
        console.log(decodedStrem)
    })

    return pythonDockerContainer;
}

export default runPythonCode