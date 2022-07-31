import { embaralhar } from '../../../helpers'
import questoes from '../BDQuestoes'
// @ts-ignore
export default async function Questionario(req,res ) {
    let ids = questoes.map(element=>element.id)
    res.status(200).json(embaralhar(ids))
}