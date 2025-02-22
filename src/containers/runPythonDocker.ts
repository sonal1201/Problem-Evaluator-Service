// import Docker from 'dockerode';
// import { TestCases } from '../types/testCases';
import { PYTHON_IMG } from '../utils/constants';

import createcontainer from './containerFac';
import decodeDockerSteram from './dockerHelper';
import pullImage from './pullImage';

async function runPythonCode(code:string , inputTestCases: string) {
    
    const rawBuffer: Buffer[] = [];
    await pullImage(PYTHON_IMG)
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

    await new Promise((res)=>{
        loggerStrem.on('end',()=>{
            console.log(rawBuffer);
            const completeBuffer = Buffer.concat(rawBuffer);
            const decodedStrem = decodeDockerSteram(completeBuffer);
            console.log(decodedStrem)
            res(decodeDockerSteram)
        })
    })

    

    return pythonDockerContainer.remove();
}

export default runPythonCode