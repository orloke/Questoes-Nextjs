import { Request, Response } from 'express'
import { embaralhar } from '../../../helpers'
import questoes from '../BDQuestoes'
export default function Questionario(req: Request,res: Response) {
    let ids = questoes.map(element=>element.id)
    res.status(200).json(embaralhar(ids))
}