import QuestaoModel from "../model/questao"
import styles from '../styles/Questao.module.css'
import Enunciado from "./Enunciado"
import Resposta from "./Resposta"
import Temporizador from "./Temporizador"

interface Props{
    valor: QuestaoModel
    duracao?:number
    tempoEsgotado: () => void
}

export default function Questao(props: Props){

    let questao = props.valor
    let infoLetras = [
        {valor: 'A', cor: '#f2c866'},
        {valor: 'B', cor: '#f266ba'},
        {valor: 'C', cor: '#85d4f2'},
        {valor: 'D', cor: '#bce596'},
    ]

    const renderizarRespostas = () =>{
        return questao.resposta.map((res,i)=>{
            return(
                <Resposta
                    key={`${i}${questao.id}`} 
                    valor={res}
                    indice={i}
                    letra = {infoLetras[i].valor}
                    fundoCorLetra = {infoLetras[i].cor}
                />
            )
        })
    }
    
    return(
        <div className={styles.questao}>
            <Temporizador key={questao.id} duracao={props.duracao ?? 10} tempoEsgotado = {props.tempoEsgotado}/>
            <Enunciado texto={questao.enunciado}/>
            {renderizarRespostas()}
        </div>
    )
}