const PaginationContainer = () =>{
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0')
      .then((data)=>data.json())
      .then(({count})=>{
        const div = document.createElement('div')
        div.classList.add('prevAndNext')
        div.innerHTML = `
                <div class="sliderContainer">
                    <ul id="lightSlider">${createPagination( Math.ceil(count/20))}</ul>
                </div>
        `
        const pokemonList = document.querySelector('.pokemonList')
        div.addEventListener('click',async function (ev) {
            if(ev.target.tagName=='BUTTON' && !ev.target.classList.contains('prev') && !ev.target.classList.contains('next') ){
                ev.preventDefault()
                console.log(ev.target.closest('li'),ev.target)
                clearHistory()
                const currentPage = document.querySelector('li.active');
                currentPage.classList.remove('active')
                console.log(ev.target.closest('li'),ev.target)
                ev.target.closest('li').classList.add('active')
                const pageNumber = ev.target.getAttribute("data-page");
                const pokemons = await requests('pokemon',pageNumber)
                disableBtns()
                pokemonList.replaceChildren(await pokemonsList(pokemons),showInfo())
            }else if(ev.target.tagName=='LI'){
                clearHistory()
                const currentPage = document.querySelector('li.active');
                currentPage.classList.remove('active')
                ev.target.classList.add('active')
                const pageNumber = ev.target.querySelector('button').getAttribute("data-page");
                const pokemons = await requests('pokemon',pageNumber)
                disableBtns()
                pokemonList.replaceChildren(await pokemonsList(pokemons),showInfo())
            }
        })
        root.append(div)
        // let slider;
        async function initSlider (){
        $(document).ready(function () {
             const slider = $("#lightSlider").lightSlider({
                item: 3,
                // pager:true,
                slideMargin: 10,
                slideEndAnimation: false,
                pager: false
            });
            const prevAndNext = document.querySelector('.prevAndNext');
            const prevAndNextButtons = prevAndNextComponents(slider)
            prevAndNext.prepend(prevAndNextButtons[0]);
            prevAndNext.append(prevAndNextButtons[1]);
        });
}
        initSlider()
        // setPages()
})
}