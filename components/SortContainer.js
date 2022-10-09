const sortContainer = async()=>{
    console.log(requests)
    const select = document.createElement('select')
    select.addEventListener('change',async function(){
        localStorage.setItem('typeValue',`${this.value}`)
        PokemonListContainer.replaceChildren(await pokemonsList(await requests(`${this.value}`)))
        const slider = document.querySelector('.prevAndNext');
        slider.classList.add('d-none')
        const button = document.createElement('button')
        button.innerHTML = 'Back to usual pagination'
        button.addEventListener('click',async function(){
            const ul = await pokemonsList(await requests('pokemon',1));
            PokemonListContainer.replaceChildren(ul)
            slider.classList.remove('d-none')
        })
        PokemonListContainer.prepend(button)
    })
    select.innerHTML=await sortComponents();
    return select
}