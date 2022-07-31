import { Request, Response } from 'express'
import NextCors from 'nextjs-cors';
import { embaralhar } from '../../../helpers'
import questoes from '../BDQuestoes'
// @ts-ignore
export default async function Questionario(req,res ) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    let ids = questoes.map(element=>element.id)
    res.status(200).json(embaralhar(ids))
}