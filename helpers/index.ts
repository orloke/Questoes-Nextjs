export const embaralhar = (elemento: any[]) =>{
    return elemento
        .map(valor=> ({valor, aleatorio: Math.random()}))
        .sort((a, b)=>a.aleatorio-b.aleatorio)
        .map(obj=>obj.valor)
}