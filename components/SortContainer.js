const sortContainer = async()=>{
    const select = document.createElement('select')
    select.addEventListener('change',async function(){
        localStorage.setItem('typeValue',`${this.value}`)
        ListAndDisplayContainer(root,`${this.value}`)
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