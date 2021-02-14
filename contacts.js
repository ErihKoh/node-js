const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');
const handleError = require('./lib/handlerror');

const contactsPath = path.join(__dirname, '/db/contacts.json');

async function getContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (e) {
    handleError(e);
  }
}

async function listContacts() {
  try {
    const contacts = await getContacts();
    console.table(contacts);
    return contacts;
  } catch (e) {
    handleError(e);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();
    const contactById = await contacts.find(({ id }) => id === contactId);

    if (!contactById) {
      return console.error('Contact not found!');
    }
    console.table(contactById);
    return contactById;
  } catch (e) {
    handleError(e);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts();
    const data = await contacts.filter(({ id }) => id !== contactId);

    if (data.length === contacts.length) {
      return console.error('Contact not found!');
    }
    await fs.writeFile(contactsPath, JSON.stringify(data));
    console.log('Contact deleted successfully!');
    console.table(data);
    return data;
  } catch (e) {
    handleError(e);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getContacts();
  } catch (e) {
    handleError(e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  getContacts,
};
