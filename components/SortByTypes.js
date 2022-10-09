const sortComponents = async ()=>{
    const res = await fetch('https://pokeapi.co/api/v2/type')
    .then((data)=> data.json())
    .then(({results})=>{
        return results.map(({name})=>{
            return `
               <option ${localStorage.getItem('typeValue')===name?'selected':''} data-type='${name}'>${name}</option>
            `
        })
    })
    return res.join('')
}