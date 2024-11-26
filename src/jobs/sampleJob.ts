import {Job} from 'bullmq'
import { iJOB } from "../types/bullMqJobDef";

export default class SampleJob implements iJOB{
    name:string;
    payload : Record<string,unknown>
    constructor(payload : Record<string,unknown>){
        this.name = this.constructor.name,
        this.payload = payload
    }

    handler = ()=>{
        console.log("Handler of job Called.")
    };

    failed = (job?: Job) : void => {
        console.log("Job Failed")
        if(job){
            console.log(job.id)
        }
    }

}