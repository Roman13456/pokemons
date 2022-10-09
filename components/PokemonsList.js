const pokemonsList = async (arr) => {
    console.log(arr)
    const liElements = await pokemonsListElements(arr);
    const ul = document.createElement('ul')
    ul.innerHTML = liElements
    ul.prepend(await sortContainer())
    ul.classList.add('itemsList')
    ul.addEventListener('click', (ev) => {
        if (ev.target.tagName === "A") {
            ev.preventDefault();
            clearHistory()
            document.querySelector('.prevBtn').classList.add('disabledBtn')
            const name = ev.target.getAttribute("data-name");
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then((data) => data.json())
                .then((json) => {
                    createDesc(json)});
                
        }else if(ev.target.tagName === "INPUT"){
            const name = ev.target.nextElementSibling.querySelector('a').getAttribute('data-name');
            if(ev.target.checked){
                if(localStorage.getItem('favorites')===null){
                    localStorage.setItem('favorites',`["${name}"]` )
                }else{
                    const items = JSON.parse(localStorage.getItem('favorites'));
                    items.push(name)
                    localStorage.setItem('favorites',JSON.stringify(items))
                }
                ev.target.closest('li').classList.add('favorite');
            }else{
                const items = JSON.parse(localStorage.getItem('favorites'));
                const index = items.findIndex((element)=>element===name);
                items.splice(index,1)
                ev.target.closest('li').classList.remove('favorite');
                localStorage.setItem('favorites',JSON.stringify(items))
            }
        }
    })
    return ul
}