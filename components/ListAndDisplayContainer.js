const ListAndDisplayContainer = async(node,reqStr='empty') => {
    const div = document.createElement('div')
    div.classList.add('pokemonList')
    let ul;
    if(reqStr==='empty'){
        ul = await pokemonsList(await requests('pokemon',1));
    }else{
        ul = await pokemonsList(await requests(reqStr));
    }
    
    div.append(ul)
    div.append(showInfo())
    node.replaceChildren(div)
    PaginationContainer()
}