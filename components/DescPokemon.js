const DescPokemon = ({ sprites, name, height ,species}) =>{
    return`
    <div class='mark'>
            <img src='${sprites.front_default}'>
            <p>name: ${name}</p>
            <p>height: ${height}</p>
        </div>
    `
}