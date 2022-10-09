const root = document.getElementById('root');
const prevAndNext = document.querySelector('.prevAndNext')
const historyBtns= document.querySelector('.btns')
function clearHistory(){
    sessionStorage.clear()
}

// Вам нужно использовать API: https://pokeapi.co/

// Вывести список Pokemons https://pokeapi.co/api/v2/pokemon/********
// Вывести информацию по выбранному герою pokemon/{name || id}*******
// Добавить кнопку вывода всех эволюций /evolution-chain/{id}/
// Добавить пагинацию***********************************************
// Получить список всех регионов (начинаем изучать документацию)
// Получить список всех типов***************************************
// Реализовать возможность сортировки по типам**************************
// Добавить героя в избранное. Хранить всех выбранных героев в store***
// Выделять другим цветом выбранных героев в списке********************
let slider;
async function initSlider (){
        $(document).ready(function () {
             slider = $("#lightSlider").lightSlider({
                item: 3,
                // pager:true,
                slideMargin: 10,
                slideEndAnimation: false,
                pager: false
            });
            const prevAndNextButtons = prevAndNextComponents(slider)
            prevAndNext.prepend(prevAndNextButtons[0]);
            prevAndNext.append(prevAndNextButtons[1]);
        });
}
const createLi = ({ name }) => {
    const bool = isInsideStorage('favorites',`${name}`);
    return `
        <li ${bool?'class="favorite"':''}>
            <input id=${name} ${bool?'checked':''} type="checkbox">
            <label for='${name}'><a data-name='${name}' href="#">${name}</a></label>
        </li>
    `
}
async function requests(type,pageNumber){
    if(type=='pokemon'){
        res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${(pageNumber-1) * 20}`)
        .then((data) => data.json())
        .then(({results, count}) => results)
        return res
    }else{
        res = await fetch(`https://pokeapi.co/api/v2/type`)
        .then((data) => data.json())
        .then(({results, count}) => {
            const typeUrl = results.find((e)=>e.name===type).url;
            return fetch(typeUrl)
        })
        .then((data)=>data.json())
        .then(({pokemon})=>{
            return pokemon.map((e)=>{
                return e.pokemon
            })
        })
        return res
    }
}
// async function fetchPokemons(type='ghost'){
//     const res = await requests(type);
// }
async function App (){
    clearHistory()
    root.append( PokemonListContainer)
    const ul = await pokemonsList(await requests('pokemon',1));
    PokemonListContainer.append(ul)
    root.append(showInfo())
    const btns = EvolutionButtons()
    historyBtns.append(btns[0])
    historyBtns.append(btns[1])
}
App()
function isInsideStorage(str,element){
    const items = JSON.parse(localStorage.getItem('favorites'));
    return items.includes(element)
}

  fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0')
  .then((data)=>data.json())
  .then(({count})=>{
    prevAndNext.innerHTML = `
        <div class="sliderContainer">
            <ul id="lightSlider">${createPagination( Math.ceil(count/20))}</ul>
        </div>
    `
    initSlider()
    setPages()
})

function setPages() {
    const allPages = document.querySelectorAll(".page");
    allPages.forEach((e) => {
        e.addEventListener("click", async function (ev) {
            ev.preventDefault()
            clearHistory()
            const currentPage = document.querySelector('li.active');
            currentPage.classList.remove('active')
            ev.target.closest('li').classList.add('active')
            const pageNumber = ev.target.getAttribute("data-page");
            const pokemons = await requests('pokemon',pageNumber)
            PokemonListContainer.replaceChildren(await pokemonsList(pokemons))
        });
    });
}


