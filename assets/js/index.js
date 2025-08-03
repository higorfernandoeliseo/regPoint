
const itemPonto = document.getElementById('itemPonto')
const itemsDiv = document.getElementById('registrosBox')

const db = new Dexie('PontoDB')
db.version(1).stores({
    items: `++pontoid,data,hora,tipo`,
    datas: `++dataid,&data`
})

// db.version(2).stores({
//     datas: null
// })

const populateItemsDiv = async () => {

    const allItems = await db.items.reverse().limit(5).toArray()

    itemsDiv.innerHTML = '';
    allItems.forEach(item => {
      const li = document.createElement('li')
      if(item.tipo == 'Folga'){
         itemsDiv.innerHTML += `<div id="registroItem">
            <span class="data_reg">${item.data} - ${item.tipo} <button class="removeBtn" onclick="removPoint(${item.pontoid})"> <img src="assets/trash-icon.png" /> </button></span> 
        </div>`
      }else{
        itemsDiv.innerHTML += `<div id="registroItem">
            <span class="data_reg">${item.data} - ${item.tipo}:  <span class="horarios">${item.hora}</span> <button class="removeBtn" onclick="removPoint(${item.pontoid})"> <img src="assets/trash-icon.png" /> </button></span>
        </div>`
      }


    })
    
}

window.onload = populateItemsDiv

itemPonto.onsubmit = async (e) => {
    e.preventDefault()


    const datainput = document.getElementById('dia_registro').value
    const getData = new Date(`${datainput}T12:00:00Z`)
    data = getData.toLocaleDateString('pt-BR');
    const tipo = document.querySelector('input[name="tipo_registro"]:checked').value;
    const hora = document.getElementById('hora_registro').value

    if(datainput.length > 0 && tipo.length > 0 && hora.length > 0){
        await db.items.add({data,hora,tipo})
        await populateItemsDiv()

        itemPonto.reset()
    }
}


//const dados = db.items.where('data').equals('27/07/2025').toArray()
//console.log(dados)

// db.items.where('data').equals('27/07/2025').each(item => {
//     console.log(`Hora: ${item.hora}`)
// })

// async function getAllItems() {

//     const allPoints = await db.datas.reverse().toArray()
//     const linhaPontos = []
//     let strings = ''
//     allPoints.forEach(point => {
//         db.items.where('data').equals(point.data).each(item => {
//             let texto = `Data: ${point.data} ${item.tipo}Hora: ${item.hora}`;
//             linhaPontos.unshift(texto)
//         })
//     })

//     //strings = linhaPontos.join('')
//     console.log(linhaPontos)

// }

// getAllItems()

const removPoint = async (id) => {
    await db.items.delete(id)
    await populateItemsDiv()
}

async function addFolga() {

    const datainput = document.getElementById('dia_registro').value
    const getData = new Date(`${datainput}T12:00:00Z`)
    data = getData.toLocaleDateString('pt-BR');
    const hora = `00:00`
    const tipo = `Folga`

    if(datainput.length > 0){
        await db.items.add({data,hora,tipo})
        await populateItemsDiv()

        itemPonto.reset()
    }

}

async function gerarPDF() {

    var doc = new jsPDF();

    const registros = await db.items.toArray()

    doc.setFontSize(14)
    doc.text('Relatório de Pontos: mes/ano', 20, 20)

    let y = 30

    registros.forEach((points) =>{
        doc.setFontSize(12)
        doc.text(`Data: ${points.data}\n${points.tipo}\nHora: ${points.hora}\n\n `, 20, y)
        y += 20
        if(y > 280){
            doc.addPage()
            y = 20
        }
    });

    // const datablob = await exportDexieData()
    // if(!datablob) return;

    // console.log(datablob)


    // doc.text('Ola Mundo!!', 10, 10)
    doc.save('relatorioPontos.pdf')
}

// allTimes.each(item => {
//         console.log(`Hora: ${item.hora}`)
//     })

// db.items.where('data').equals(point.data).each(item => {
//             console.log(`Hora: ${item.hora}`)
//         })

async function allPoints() {


    const allItems = await db.items.reverse().toArray()

    itemsDiv.innerHTML = '';
    allItems.forEach(item => {
      const li = document.createElement('li')
      if(item.tipo == 'Folga'){
         itemsDiv.innerHTML += `<div id="registroItem">
            <span class="data_reg">${item.data} - ${item.tipo} <button class="removeBtn" onclick="removPoint(${item.pontoid})"> <img src="assets/trash-icon.png" /> </button></span> 
        </div>`
      }else{
        itemsDiv.innerHTML += `<div id="registroItem">
            <span class="data_reg">${item.data} - ${item.tipo}:  <span class="horarios">${item.hora}</span> <button class="removeBtn" onclick="removPoint(${item.pontoid})"> <img src="assets/trash-icon.png" /> </button></span>
        </div>`
      }


    })

}