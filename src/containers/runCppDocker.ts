// import Docker from 'dockerode';
// import { TestCases } from '../types/testCases';
import { CPP_IMG } from '../utils/constants';
import createcontainer from './containerFac';
import decodeDockerSteram from './dockerHelper';
import pullImage from './pullImage';



async function runCppCode(code:string , inputTestCases: string) {
    
    const rawBuffer: Buffer[] = [];
    await pullImage(CPP_IMG)
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCases.replace(/'/g, `'\\"`)}' | ./main`;
    console.log(runCommand);
    const cppDockerContainer = await createcontainer(CPP_IMG, [
        '/bin/sh', 
        '-c',
        runCommand
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