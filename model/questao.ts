import { embaralhar } from "../helpers"
import RespostaModel from "./resposta"

export default class QuestaoModel {
    #id: number
    #enunciado: string
    #resposta: RespostaModel[]
    #acertou: boolean


    constructor(id: number, enunciado: string, resposta: RespostaModel[], acertou: boolean) {
        this.#id = id
        this.#enunciado = enunciado
        this.#resposta = resposta
        this.#acertou = acertou
    }

    get id() { return this.#id }
    get enunciado() { return this.#enunciado }
    get resposta() { return this.#resposta }
    get acertou() { return this.#acertou }    
    get respondida() {
        for(let resposta of this.#resposta) {
            if (resposta.revelada) {
                return true
            }
        }
        return false
     }

     responderCom(indice: number): QuestaoModel {
        const acertou = this.#resposta[indice]?.certa
        const respostas = this.#resposta.map((resposta,i)=>{
            const respostaEscolhida = indice === i 
            const deveRevelar = respostaEscolhida || resposta.certa
            return deveRevelar ? resposta.revelar(): resposta
        })
        return new QuestaoModel(this.#id, this.#enunciado, respostas, acertou)

     }

     respostarEmbaralhads():QuestaoModel{
        let newResposta = embaralhar(this.#resposta)
        return new QuestaoModel(this.#id, this.#enunciado, newResposta, this.#acertou)
     }

     static criarObjeto (obj: QuestaoModel): QuestaoModel{
        const resposta = obj.resposta.map(resp => RespostaModel.criarObjeto(resp))
        return new QuestaoModel(obj.id, obj.enunciado, resposta, obj.acertou)
    }

     paraObjeto(){
        return{
            id: this.#id,
            enunciado: this.#enunciado,
            resposta:this.#resposta.map(resp=>resp.paraObjeto()),
            acertou: this.#acertou,
        }
     }

}