import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import questoes from '../pages/api/BDQuestoes'
import { RootState } from '../store'
import { setIndice } from '../store/Questao'

const Home= () => {

  const dispatch = useDispatch()

  const testeQuestao = questoes[0]
  const [questao, setQuestao] = useState(testeQuestao)
  const [idsQuestao, setIdsQuestao] = useState<number[]>([])
  const [questaoCorreta, setQuestaoCorreta] = useState(0)
  
  const BASE_URL = 'https://questoes-nextjs-g7vpq17tg-orloke.vercel.app/api'

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
      setQuestao(questao.responderCom(teste.indice))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[teste.click])  
  
  useEffect(()=>{
    if(questao.acertou){      
      setQuestaoCorreta(questaoCorreta + 1)
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  },[questao.acertou])

  useEffect(() => {
    idsQuestao.length > 0 &&  carregarQuestoes(idsQuestao[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[idsQuestao])

  const proximaQuestao = () => {
    let novoId = idsQuestao.indexOf(questao.id) + 1
    return idsQuestao[novoId]
  }

  const proximoPasso = () => {
    if (proximaQuestao()=== undefined) {
      Router.push({
        pathname:'/resultado',
        query:{
          total: idsQuestao.length,
          certas: questaoCorreta
        }
      })
    }
    else{
      carregarQuestoes(proximaQuestao())
    }
  }
  
  return (
      <Questionario
        questao={questao}
        ultima = {proximaQuestao()===undefined}
        proximoPasso={proximoPasso}
      />



  )
}

export default Home
