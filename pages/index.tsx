import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import { RootState } from '../store'
import { setIndice } from '../store/Questao'

const Home= () => {

  const dispatch = useDispatch()

  const [questao, setQuestao] = useState<QuestaoModel>()
  const [idsQuestao, setIdsQuestao] = useState<number[]>([])
  const [questaoCorreta, setQuestaoCorreta] = useState(0)
  
  const BASE_URL = 'https://questoes-nextjs.vercel.app/api'

  const carregarIdsQuestoes = async () =>{
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsQuestoes = await resp.json()
    setIdsQuestao(idsQuestoes)
  }
  const carregarQuestoes = async (id: number) =>{
    const resp = await fetch(`${BASE_URL}/questoes/${id}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarObjeto(json);
    dispatch(setIndice({click:false}))  
    setQuestao(novaQuestao)    
  }

  let teste = useSelector((state: RootState)=>state.IndiceSlice)

  useEffect(() => {
    carregarIdsQuestoes()
  },[])
  
  useEffect(() => {    
    if (teste.click) {
      setQuestao(questao?.responderCom(teste.indice))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[teste.click])  
  
  useEffect(()=>{
    if(questao?.acertou){      
      setQuestaoCorreta(questaoCorreta + 1)
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  },[questao?.acertou])

  useEffect(() => {
    idsQuestao.length > 0 &&  carregarQuestoes(idsQuestao[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[idsQuestao])

  const proximaQuestao = () => {
    //@ts-ignore
    let novoId = idsQuestao.indexOf(questao?.id) + 1
    return idsQuestao[novoId]
  }

  const proximoPasso = () => {
    const proximoId = proximaQuestao()
    if (proximoId) {
      carregarQuestoes(proximoId)
    }
    else{
      Router.push({
        pathname:'/resultado',
        query:{
          total: idsQuestao.length,
          certas: questaoCorreta
        }
      })
    }
  }
  
  return  (
      <Questionario
      //@ts-ignore
        questao={questao}
        ultima = {proximaQuestao()===undefined}
        proximoPasso={proximoPasso}
        />       
        )
}

export default Home
