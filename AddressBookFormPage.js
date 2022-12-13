let isUpdate = false;
let contact = {};
window.addEventListener('DOMContentLoaded',(event) => {
    const fullName = document.querySelector('#fullName');
    const nameError = document.querySelector('.name-error');
    fullName.addEventListener('input',function(){
        let fullName = document.querySelector('#fullName').value;
        if (fullName.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            (new Contact()).fullName = fullName;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input',function(){
        let phone = document.querySelector('#phone').value;
        if (phone.value.length == 0) {
            phoneError.textContent = "";
            return;
        }
        try {
            (new Contact()).phone = phone;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input',function(){
        let address1 = document.querySelector('#address').value;
        if (address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            (new Contact()).address = address1;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });

    checkForUpdate();
})

const save = () => {
    try {
        let personContact = createContact();
        createAndUpdateStorage(personContact);
    } catch(e) {
        return;
    }
}

const createContact = () => {
    let personContact = new Contact();
    try {
        personContact._fullName = getInputValueById('#fullName');
    } catch (e) {
        setTextValue('.name-error',e);
    }

    try {
        personContact._phone = getInputValueById('#phone');
    } catch (e) {
        setTextValue('.phnumber-error',e);
    }

    try {
        personContact._address = getInputValueById('#address');
    } catch (e) {
        setTextValue('.address-error',e);
    }

    personContact._city = getInputValueById('#city');
    personContact._state = getInputValueById('#state');
    personContact._zip = getInputValueById('#zip');
    alert(personContact.toString());
    return personContact;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () => {
    setValue('#fullName','');
    setValue('#phone','');
    setValue('#address','');
    setValue('#city','Select City');
    setValue('#state','Select State');
    setValue('#zip','');
}

const setValue = (id,value) => {
    let element = document.querySelector(id);
    return element.value = value;
}

const setTextValue = (id,value) => {
    let element = document.querySelector(id);
    element.textContent = value;
}

function createAndUpdateStorage(personContact) {

    let contactList = JSON.parse(localStorage.getItem("ContactList"));

    if(contactList != undefined){
        contactList.push(personContact);
    } else {
        contactList = [personContact]
    }

    alert(contactList.toString());
    localStorage.setItem("ContactList",JSON.stringify(contactList));
}

const checkForUpdate = () => {
    const contactJson = localStorage.getItem('editContact');
    isUpdate = contactJson ? true : false;
    if(!isUpdate) return;
    contact = JSON.parse(contactJson);
    setForm();
}

const setForm = () => {
    setValue('#fullName',contact._fullName);
    setValue('#phone',contact._phone);
    setValue('#address',contact._address);
    setValue('#city',contact._city);
    setValue('#state',contact._state);
    setValue('#zip',contact._zip);
}