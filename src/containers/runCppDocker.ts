// import Docker from 'dockerode';
// import { TestCases } from '../types/testCases';
import { CPP_IMG } from '../utils/constants';

import createcontainer from './containerFac';
import decodeDockerSteram from './dockerHelper';

async function runCppCode(code:string , inputTestCases: string) {
    
    const rawBuffer: Buffer[] = [];
    //const pythonDockerContainer = await createcontainer(PYTHON_IMG,['python3','-c',code,'stty -echo']);
    const cppDockerContainer = await createcontainer(CPP_IMG, [
        '/bin/sh',
        '-c',
        `echo '${code.replace(/'/g, '\\"')}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCases.replace(/'/g, '\\"')}' | stdbuf -oL -eL ./main `
      ]);
    console.log("Started");
    await cppDockerContainer.start();

    const loggerStrem  = await cppDockerContainer.logs({
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

    

    return cppDockerContainer.remove();
}

export default runCppCode