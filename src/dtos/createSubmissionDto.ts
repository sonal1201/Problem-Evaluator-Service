import {z} from 'zod'

// export  interface CreateSubmissionDtos{
//    userId: string,
//     problemId: string,
//     code: string,
//     language: string
// }

export const createSubmissionZodSchema = z.object({
    userId : z.string(),
    problemId: z.string(),
    code:  z.string(),
    language:  z.string()

}).strict();

export type CreateSubmissionDtos = z.infer<typeof createSubmissionZodSchema>;