const prevAndNextComponents = ({goToSlide},sliderNumber=3)=>{
    let prevButton = document.createElement('button')
    prevButton.setAttribute('class','page prev')
    prevButton.innerHTML = `prev`
    prevButton.addEventListener('click', async () => {
        const pageNumber = document.querySelector('.active .page').getAttribute('data-page')
        if(+pageNumber-1!==0){
            const currentPage = document.querySelector('.active');
            currentPage.classList.remove('active')
            const prevPage = document.querySelector(`button[data-page="${+pageNumber-1}"]`)
            goToSlide(pageNumber-2)
            prevPage.closest('li').classList.add('active')
            PokemonListContainer.replaceChildren(await pokemonsList(await requests('pokemon',pageNumber-1)))
            
        }    
    })
    let nextButton = document.createElement('button')
    nextButton.setAttribute('class','page next')
    nextButton.innerHTML = `next`
    nextButton.addEventListener('click', async() => {
        const pageNumber = document.querySelector('.active .page').getAttribute('data-page')
        const pagesLength = document.querySelectorAll('li .page').length
        if(+pageNumber!==pagesLength){
            const currentPage = document.querySelector('.active');
            currentPage.classList.remove('active')
            const nextPage = document.querySelector(`button[data-page="${+pageNumber+1}"]`)
            goToSlide(pageNumber)
            nextPage.closest('li').classList.add('active')
            PokemonListContainer.replaceChildren(await pokemonsList(await requests('pokemon',+pageNumber+1)))
        }
    })
    return [prevButton,nextButton]
}