import Docker from 'dockerode'

async function createcontainer(imageName: string,cmdExecutable:string[]) {
    const docker = new Docker();

    const container = await docker.createContainer({
        Image: imageName,
        Cmd : cmdExecutable,
        AttachStdin: true, //input stream
        AttachStdout: true,
        AttachStderr:true,
        Tty: false,
        OpenStdin: true
    });

    return container
}

export default createcontainer;