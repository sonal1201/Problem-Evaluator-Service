import { Job, Worker } from "bullmq";

import redisConnection from "../config/redisConfig";
import SampleJob from "../jobs/SampleJob";

export default function SubmissionWorker(queueName: string) {
    new Worker(
        queueName, 
        async (job: Job) => {
            console.log("SubmissionJob job worker kicking", job);
            if(job.name === "SampleJob") {
                const submissionJobInstance = new SampleJob(job.data);
                console.log("Calling job handle");
                submissionJobInstance.handle(job);

                return true;
            }
        },
        {
            connection: redisConnection
        }
    );
}