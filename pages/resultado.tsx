import { useRouter } from "next/router";
import Botao from "../components/Botao";
import Estatistica from "../components/Estatistica";
import styles from '../styles/Resultados.module.css'


const Resultados= () => {

    const router = useRouter()
    const total = router.query.total as string
    const certas = router.query.certas as string
    const percentual = Math.round((parseInt(certas) / parseInt(total))*100)
    return (
        <div className={styles.resultados} >
            <div>Resultados</div>

            <div className={styles.estatistica} >

                <Estatistica valor={total} texto = 'Perguntas' /> 
                <Estatistica corFundo="#9cd2a4" valor={certas} texto = 'Certas' /> 
                <Estatistica corFundo = '#de6a33' valor={`${percentual}%`} texto = 'Percentual' /> 

            </div>

            <Botao href="/" texto="Tentar novamente" />
        </div>

    );
}

export default Resultados;