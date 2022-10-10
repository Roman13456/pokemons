const sortContainer = async()=>{
    const select = document.createElement('select')
    select.addEventListener('change',async function(){
        // const pokemonList = document.querySelector('.pokemonList')
        localStorage.setItem('typeValue',`${this.value}`)
        root.replaceChildren(await pokemonsList(await requests(`${this.value}`)),showInfo())
        const slider = document.querySelector('.prevAndNext');
        const button = document.createElement('button')
        button.innerHTML = 'Back to usual pagination'
        clearHistory()
        disableBtns()
        button.addEventListener('click',async function(){
            ListAndDisplayContainer(root)
            clearHistory()
            disableBtns()
            this.remove()
        })
        document.querySelector('.backToUsualPagination').replaceChildren(button)
    })
    select.innerHTML=await sortComponents();
    return select
}