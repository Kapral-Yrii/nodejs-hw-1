const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const readContacts = async() => {
    const pathFile = await fs.readFile(path.join(__dirname, 'db', 'contacts.json'), 'utf8')
    const result = JSON.parse(pathFile)
    return result
}

const listContacts = async() => {
    return await readContacts()
}

const getContactById = async (contactId) => {
    const contacts = await readContacts()
    const [contact] = contacts.filter((contact) => contact.id === contactId)
    return contact
}

const removeContact = async (contactId) => {
    const contacts = await readContacts()
    const removeContactName = contacts.find((contact) => contact.id === contactId).name 
    const newContactsList = contacts.filter((contact) => contact.id !== contactId)
    await fs.writeFile(
        path.join(__dirname, 'db', 'contacts.json'),
        JSON.stringify(newContactsList, null, 2),
    )
    return [newContactsList, removeContactName]
}

const addContact = async (name, email, phone) => {
    const contacts = await readContacts()
    const newContact = { name, email, phone, id: crypto.randomUUID() }
    contacts.push(newContact)
    await fs.writeFile(
        path.join(__dirname, 'db', 'contacts.json'),
        JSON.stringify(contacts, null, 2),
    )
    return newContact
}

module.exports = {listContacts, getContactById, removeContact, addContact}