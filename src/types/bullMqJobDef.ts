import { Job } from "bullmq";

export interface iJOB{
    name:string,
    payload?: Record<string,unknown>,
    handler: (job?:Job) => void,
    failed: (job?:Job) => void

}