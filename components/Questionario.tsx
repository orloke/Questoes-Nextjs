import { useEffect } from "react"
import { useSelector } from "react-redux"
import QuestaoModel from "../model/questao"
import { RootState } from "../store"
import styles from "../styles/Questionario.module.css"
import Botao from "./Botao"
import Questao from "./Questao"

interface Props{
    questao: QuestaoModel
    ultima: boolean
    proximoPasso: () => void
}

export default function Questionario(props: Props ){

    return (
        <div className={styles.questionario} >

            {
                props.questao ?
                    <Questao 
                        valor={props.questao}
                        duracao = {15}
                        tempoEsgotado = {props.proximoPasso}
                    /> 
                    : false
            }

            <Botao 
                onClick={props.proximoPasso}
                texto = {props.ultima ? 'Finalizar' : 'Próxima'}
            />
        </div>
    )
}