const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// async function invokeAction({ action, contactId, removeId, data }) {
//   switch (action) {
//     case "listContacts":
//       const contacts = await listContacts();
//       console.log(contacts);
//       break;
//     case "getContactById":
//       const contact = await getContactById(contactId);
//       if (!contact) {
//         throw new Error(`Contact with id=${contactId} not found`);
//       }
//       console.log(contact);
//       break;
//     case "removeContact":
//       const removeContactById = await removeContact(removeId);
//       if (!removeContactById) {
//         throw new Error(`Contact with id=${removeId} not found`);
//       }
//       console.log(removeContactById);
//       break;
//     case "addContact":
//       const newContact = await addContact(data);
//       console.log(newContact);
//       break;
//     default:
//       console.log("Unknown action");
//   }
// }

const id = "10";

const { name, email, phone } = {
  name: "Vladimir",
  email: "Vladimir@gamil.net",
  phone: "(048) 740-7621",
};

const removeId = "7ebbeb9a-dc98-4ed1-a648-a83817726fd8";

// invokeAction({ action: "listContacts" });
// invokeAction({ action: "getContactById", contactId });
// invokeAction({ action: "addContact", data: { name, email, phone } });
// invokeAction({ action: "removeContact", removeId });

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  // const newContacts = contacts.filter((_, index) => index !== idx);
  // await updateContacts(newContacts);
  // return contacts[idx];
  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
}

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
