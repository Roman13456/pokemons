const pokemonsListElements = async(arr)=>{
    const pokemons = arr.map((e)=>createLi(e))
    return pokemons.join('')
    }