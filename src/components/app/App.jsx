import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter } from '../../redux/reducers';
import ContactForm from '../contactForm/ContactForm';
import Filter from '../filter/Filter';
import ContactList from '../contactList/ContactList';
import { AppContainer, AppWrapper } from './AppStyles';

export default function App() {
  const contacts = useSelector(state => state.phonebook.contacts);
  const filter = useSelector(state => state.phonebook.filter);
  const dispatch = useDispatch();

  const handleAddContact = ({ name, number }) => {
    const checkContactExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkContactExist) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact({ name, number }));
    }
  };

  const HandleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleChangeFilter = evt => {
    dispatch(setFilter(evt.target.value));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const saveContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  const loadContacts = () => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      savedContacts.forEach(contact => {
        dispatch(addContact({ name: contact.name, number: contact.number }));
      });
    }
  };

  useEffect(loadContacts, [dispatch]);

  useEffect(saveContacts, [contacts]);

  return (
    <AppContainer>
      <AppWrapper>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={HandleDeleteContact}
        />
      </AppWrapper>
    </AppContainer>
  );
}
