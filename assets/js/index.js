const db = new Dexie('PontoDB')
db.version(1).stores({
    items: `++pontoid,data,hora,tipo`
})

const itemPonto = document.getElementById('itemPonto')
const itemsDiv = document.getElementById('registroItem')

itemPonto.onsubmit = async (e) => {
    e.preventDefault()

    const data_reg = document.getElementById('dia_registro')
    const tipo_reg = document.getElementById('tipo_registro')
    const hora_reg = document.getElementById('hora_registro')

    await db.items.add({data_reg,tipo_reg,tipo_reg})

    itemPonto.reset()

}