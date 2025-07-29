const db = new Dexie('PontoDB')
db.version(1).stores({
    items: `++pontoid,data,hora,tipo`
})