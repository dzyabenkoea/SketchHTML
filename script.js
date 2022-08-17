let currentColor = '#000000'
let scaleValue = 100

function renderGrid(scale) {
    const oldGrid = document.querySelector('#grid')
    const newGrid = oldGrid.cloneNode();
    const tempDom = document.createDocumentFragment();

    const cell = document.createElement('div')
    cell.draggable = false
    cell.classList.add('cell')

    for (i = 0; i < scale ** 2; i++) {
        cellCopy = cell.cloneNode(true)
        tempDom.append(cellCopy)
    }
    oldGrid.remove();
    newGrid.style['grid-template-columns'] = `repeat(${scale}, auto)`;
    newGrid.addEventListener('dragstart', (event) => { event.preventDefault() })
    newGrid.append(tempDom)
    document.body.append(newGrid)
}

renderGrid(scaleValue);

document.addEventListener('mousedown', () => { document.querySelector('#grid').addEventListener('mousemove', draw) })
document.addEventListener('mouseup', () => { document.querySelector('#grid').removeEventListener('mousemove', draw) })
document.addEventListener('mouseleave', () => { document.querySelector('#grid').removeEventListener('mousemove', draw) })

function draw(event) {
    const el = document.elementFromPoint(event.clientX, event.clientY)
    if (el.classList.contains('cell'))
        el.style.backgroundColor = currentColor
}

document.querySelector('button').addEventListener('click', (event) => {
    scaleValue = document.querySelector('input').value;
    document.querySelector('input').value = null;
    renderGrid(scaleValue)
})

document.querySelector('input').addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        document.querySelector('button').click();
    }
})