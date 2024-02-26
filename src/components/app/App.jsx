import ContactForm from '../contactForm/ContactForm';
import Filter from '../filter/Filter';
import ContactList from '../contactList/ContactList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/reducers';
import { AppContainer, AppWrapper } from './AppStyles';
import { getContacts, addContact, deleteContact } from '../../redux/operations';
import {
  selectContacts,
  selectIsLoading,
  selectError,
  selectFilter,
  selectFilteredContacts,
} from '../../redux/selectors';

export default function App() {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filteredContacts = useSelector(selectFilteredContacts);

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

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <AppContainer>
      <AppWrapper>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={HandleDeleteContact}
        />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </AppWrapper>
    </AppContainer>
  );
}
