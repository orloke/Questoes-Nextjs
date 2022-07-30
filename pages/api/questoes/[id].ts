import { Request, Response } from 'express'
import QuestaoModel from '../../../model/questao';
import questoes from "../BDQuestoes";
export default function apiQuestao (req: Request,res: Response){
    //@ts-ignore
    const id = +req.query.id
    let filterQuestao = questoes.filter(questao => questao.id === id) 
    if (filterQuestao.length==1) {
        let unicaQuestao = filterQuestao[0].respostarEmbaralhads() as QuestaoModel
        res.status(200).json(unicaQuestao.paraObjeto());        
    }else{
        res.status(400).json({
            error:'Invalid request'
        })

    }
}