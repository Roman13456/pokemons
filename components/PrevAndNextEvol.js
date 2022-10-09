const EvolutionButtons = () =>{
    const prevBtn = document.createElement('button')
    prevBtn.innerHTML= `prev`
    prevBtn.classList.add('prevBtn')
    prevBtn.classList.add('disabledBtn')
    const nextBtn = document.createElement('button')
    nextBtn.innerHTML= `next`
    nextBtn.classList.add('nextBtn')
    nextBtn.classList.add('disabledBtn')
    prevBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        const history = JSON.parse(sessionStorage.getItem('history'))
        let index = sessionStorage.getItem('historyStep')
        if(index!=0&&index!==null){
            index--
            nextBtn.classList.remove('disabledBtn')
            if(index==0){
                prevBtn.classList.add('disabledBtn')
            }
            sessionStorage.setItem('historyStep',index)
            createDesc(history[index],'no addition')
        }
    })
    nextBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        const history = JSON.parse(sessionStorage.getItem('history'))
        let index = +sessionStorage.getItem('historyStep')
        if(history!==null){
            if((index+1)!=history.length){
                index++
                prevBtn.classList.remove('disabledBtn')
                if((index+1)==history.length){
                    nextBtn.classList.add('disabledBtn')
                }
                sessionStorage.setItem('historyStep',index)
                createDesc(history[index],'no addition')
            }
        }
    })
    return [prevBtn,nextBtn]
}