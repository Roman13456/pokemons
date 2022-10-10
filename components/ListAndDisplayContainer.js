const ListAndDisplayContainer = async(node) => {
    const div = document.createElement('div')
    div.classList.add('pokemonList')
    const ul = await pokemonsList(await requests('pokemon',1));
    div.append(ul)
    div.append(showInfo())
    node.replaceChildren(div)
    PaginationContainer()
}