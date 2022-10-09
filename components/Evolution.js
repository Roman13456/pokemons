// const canvas = document.querySelector('.canvas')
const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
// canvas.style.backgroundColor = colorArray[getRandom()] 
function getRandom() {
    min = 0;
    max = colorArray.length
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
async function evol(url) {
    const arr = [];
    const chain = await fetch(url)
        .then((data) => data.json())
        .then(({ chain }) => {
            const obj = {
                evolves_to: chain.evolves_to,

            }
            // sessionStorage.setItem('history',JSON.stringify(chain))
            return chain})
    console.log(chain)
    function evolStageOnClick(ev, e) {
        ev.stopPropagation()
        // console.log(e)
        fetch('https://pokeapi.co/api/v2/pokemon/' + e.species.name)
            .then((data) => data.json())
            .then((pokemon) => {
                createDesc(pokemon)
            })
    }
    function unpackStage(obj, node) {
        const color = colorArray[getRandom()]
        if (Array.isArray(obj['evolves_to']) && obj['evolves_to'].length) {
            obj['evolves_to'].forEach((e, index) => {
                const newNode = document.createElement('div');
                newNode.classList.add('canvas');
                newNode.addEventListener(('click'), (event) => evolStageOnClick(event, e))
                newNode.style.backgroundColor = color
                const div = document.createElement('div');
                div.classList.add('d-flex');
                // const parentScale = node.getAttribute('data-scale')
                // node.style.width = `${scale(parentScale)}%`
                // newNode.setAttribute('data-scale', +parentScale+1)
                // newNode.style.top = `${(+parentScale+1-1)*70}px`
                const p = document.createElement('p')
                p.innerHTML = e.species.name;
                newNode.append(p)
                newNode.append(div)
                node.querySelector('.d-flex').append(newNode)
                arr.push(`${e.species.name}${index}`)
                unpackStage(e, newNode)
            })
        }
    }
    function createCanvas(initName, obj) {
        const p = document.createElement('p')
        p.innerHTML = initName
        const div = document.createElement('div')
        div.classList.add('d-flex')
        const canvas = document.createElement('div')
        canvas.classList.add('canvas')
        canvas.addEventListener(('click'), (event) => evolStageOnClick(event, obj))
        canvas.append(p)
        canvas.append(div)
        canvas.classList.add('fix')
        unpackStage(obj, canvas)
        return canvas
    }

    return createCanvas(chain.species.name, chain)
}