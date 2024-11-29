import DockerStreamOutput from "../types/dockerStreamOutput";
import { HEADER_SIZE } from "../utils/constants";

export default function  decodeDockerSteram(buffer:Buffer) :DockerStreamOutput{

    let offset=0;

    const output : DockerStreamOutput ={stdout: '',stderr: ''};

    while(offset < buffer.length){
        const channel = buffer[offset];
        const length = buffer.readUint32BE(offset+4);

        offset+=HEADER_SIZE;

        

        if(channel==1){
            //stdOut\
            output.stdout+=buffer.toString('utf-8',offset,offset+length);
        }
        else if(channel==2){
            //stderr
            output.stderr+=buffer.toString('utf-8',offset,offset+length);
        }

        offset+=length
    }

    return output

}