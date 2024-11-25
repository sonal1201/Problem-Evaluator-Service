import { Request, Response } from 'express'

function pingController(_: Request, res: Response){
    res.status(200).send({
        message: "Hello How are you"
    })
}

export default pingController