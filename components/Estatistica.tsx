import styles from '../styles/Estatistica.module.css'

interface Props{
    valor: any;
    texto: string;
    corFundo?: string;
    corFonte?: string;
}

export default function Estatistica(props: Props){
    return(
        <div className={styles.estatistica} >
            <div className={styles.valor} style = {{
                backgroundColor: props.corFundo ?? '#Fdd60f',
                color: props.corFonte ?? '#333'
            }} >
                {props.valor}
            </div>
            <div className={styles.texto} >
                {props.texto}
            </div>
        </div>
    )
}