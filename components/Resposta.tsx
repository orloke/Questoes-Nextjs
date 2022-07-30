import { useDispatch } from "react-redux";
import RespostaModel from "../model/resposta"
import { setIndice } from "../store/Questao";
import styles from '../styles/Resposta.module.css';

interface Props{
    valor: RespostaModel
    indice: number
    letra: string
    fundoCorLetra: string
}

export default function Resposta(props: Props){

    const dispatch = useDispatch()
    const resposta = props.valor
    const respostaRevelada = resposta.revelada ? styles.respostaRevelada : ''    

    return (
        <div className={styles.resposta} onClick = {()=> dispatch(setIndice({indice:props.indice, click:true}))} >
            <div className={`${respostaRevelada} ${styles.conteudoResposta}`}  >

                <div className={styles.frente} >

                    <div className={styles.letra} style = {{backgroundColor: props.fundoCorLetra}} >
                        {props.letra}
                    </div>
                    <div className={styles.valor} >
                        {resposta.valor}
                    </div>
                    
                </div>
                    
                <div className={styles.verso} >
                    {resposta.certa ? (
                        <div className={styles.certa} >
                            <div>A resposta certa é...</div>
                            <div className={styles.valor} > {resposta.valor} </div>
                        </div>
                    ):(
                        <div className={styles.errada} >
                            <div>A resposta está errada...</div>
                            <div className={styles.valor} > {resposta.valor} </div>
                        </div>
                    )}
                </div>



            </div>

        </div>
    )
}