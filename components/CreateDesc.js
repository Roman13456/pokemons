const createDesc = ({ sprites, name, height ,species},type='addition') => {
    const container = document.querySelector('.display')
    if(sessionStorage.getItem('history')!==null){
        if(type=='addition'){
            const store = JSON.parse(sessionStorage.getItem('history'));
            let index = +sessionStorage.getItem('historyStep')
            index++
            const prevBtn = document.querySelector('.prevBtn')
            const nextBtn = document.querySelector('.nextBtn')
            nextBtn.classList.add('disabledBtn')
            prevBtn.classList.remove('disabledBtn')
            store.splice(index)
            sessionStorage.setItem('historyStep',`${index}`)
            store.push({sprites, name, height ,species})
            sessionStorage.setItem('history',`${JSON.stringify(store)}`)
        }
    }else{
        sessionStorage.setItem('history',`[${JSON.stringify({sprites, name, height ,species})}]`)
        sessionStorage.setItem('historyStep',0)
    }
    fetch(species.url)
            .then((data)=>data.json())
            .then(async ({evolution_chain})=>{
                const canvas =await evol(evolution_chain.url)
                container.querySelector('.mark').append(canvas)
            })
    container.innerHTML = DescPokemon({ sprites, name, height ,species})
}