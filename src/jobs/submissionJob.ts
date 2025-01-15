import { Job } from "bullmq";
import runCppCode from "../containers/runCppDocker";

import { IJob } from "../types/bullMqJobDef";

import { submissionPayload } from "../types/sumissionPayload";

export default class SubmissionJob implements IJob {
    name: string;
    payload: Record<string, submissionPayload>;
    constructor(payload: Record<string, submissionPayload>) {
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = async (job?: Job) => {
        console.log("Handler of the job called");
        console.log(this.payload);
        if(job) {
           const key = Object.keys(this.payload)[0];
           console.log(this.payload[key].language)
           if(this.payload[key].language === 'CPP'){
            const response= await runCppCode(this.payload[key].code,this.payload[key].testcase);
            console.log(response)
           }
        }
    };

    failed = (job?: Job) : void => {
        console.log("Job failed");
        if(job) {
            console.log(job.id);
        }
    };
}