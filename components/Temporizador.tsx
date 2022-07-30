import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Temporizador.module.css'

interface Props{
    key: number
    duracao: number
    tempoEsgotado: ()=>void
}

export default function Temporizador(props:Props){
    return(
        <div className={styles.temporizador} >
            <CountdownCircleTimer
                size={120}
                isPlaying
                duration={props.duracao}
                onComplete = {props.tempoEsgotado}
                colors = {['#BCE596', '#f5b801', '#ed827a']}
                colorsTime = {[10, 5, 0]}
            >
                {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
        </div>
    )
}