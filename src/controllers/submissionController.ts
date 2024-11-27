import { Request, Response } from "express";
import { CreateSubmissionDtos } from "../dtos/createSubmissionDto";

function addSubmission(req: Request,res:Response){
    const submissionDto = req.body as CreateSubmissionDtos
    console.log(submissionDto)


    res.status(201).send({
        success:true,
        message:"Successfully collected the submission",
        error:{},
        data: submissionDto
    })
}

export default addSubmission;