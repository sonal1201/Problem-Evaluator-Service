import { Queue } from "bullmq";
import  redisConnection  from "../config/redisConfig";

//Creating New queue
export default new Queue('SampleQueue',{connection: redisConnection})