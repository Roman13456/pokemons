const sortContainer = async()=>{
    console.log(requests)
    const select = document.createElement('select')
    select.addEventListener('change',async function(){
        localStorage.setItem('typeValue',`${this.value}`)
        // PokemonListContainer.replaceChildren
        root.replaceChildren(await pokemonsList(await requests(`${this.value}`)),showInfo())
        const slider = document.querySelector('.prevAndNext');
        slider.classList.add('d-none')
        const button = document.createElement('button')
        button.innerHTML = 'Back to usual pagination'
        clearHistory()
        disableBtns()
        button.addEventListener('click',async function(){
            const ul = await pokemonsList(await requests('pokemon',1));
            root.replaceChildren(ul,showInfo())
            slider.classList.remove('d-none')
            clearHistory()
            disableBtns()
            this.remove()
        })
        document.querySelector('.backToUsualPagination').replaceChildren(button)
    })
    select.innerHTML=await sortComponents();
    return select
}