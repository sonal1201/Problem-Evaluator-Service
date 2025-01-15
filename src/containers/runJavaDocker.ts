// import Docker from 'dockerode';
// import { TestCases } from '../types/testCases';
import { JAVA_IMG } from '../utils/constants';

import createcontainer from './containerFac';
import decodeDockerSteram from './dockerHelper';
import pullImage from './pullImage';

async function runJavaCode(code:string , inputTestCases: string) {
    
    const rawBuffer: Buffer[] = [];
    await pullImage(JAVA_IMG);
    const javaDockerContainer = await createcontainer(JAVA_IMG, [
        '/bin/sh',
        '-c',
        `echo '${code.replace(/'/g, '\\"')}' > Main.java && javac Main.java && echo '${inputTestCases.replace(/'/g, '\\"')}' | java  Main`
      ]);
    console.log("Started");
    await javaDockerContainer.start();

    const loggerStrem  = await javaDockerContainer.logs({
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

    

    return javaDockerContainer.remove();
}

export default runJavaCode