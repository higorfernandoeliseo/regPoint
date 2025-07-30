
const itemPonto = document.getElementById('itemPonto')
const itemsDiv = document.getElementById('registrosBox')

const db = new Dexie('PontoDB')
db.version(1).stores({
    items: `++pontoid,data,hora,tipo`
})

const populateItemsDiv = async () => {

    const allItems = await db.items.reverse().toArray()

    itemsDiv.innerHTML = '';
    allItems.forEach(item => {
      const li = document.createElement('li')
      itemsDiv.innerHTML += `<div id="registroItem">
            <span class="data_reg">${item.data} - ${item.tipo}:  <span class="horarios">${item.hora}</span></span>
        </div>`


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

    await db.items.add({data,hora,tipo})
    await populateItemsDiv()

    itemPonto.reset()

}