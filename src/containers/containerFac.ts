import Docker from 'dockerode';

async function createcontainer(imageName: string, cmdExecutable: string[]) {
    const docker = new Docker();

        console.log(`Creating container with image: ${imageName}...`);
        const container = await docker.createContainer({
            Image: imageName,
            Cmd: cmdExecutable,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Tty: false,
            OpenStdin: true,
        });
        console.log(`Container created with ID: ${container.id}`);
        return container;
   
}

export default createcontainer;
