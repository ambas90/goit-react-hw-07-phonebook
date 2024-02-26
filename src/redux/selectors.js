import { createSelector } from '@reduxjs/toolkit';

const selectContacts = state => state.phonebook.contacts;
const selectIsLoading = state => state.phonebook.isLoading;
const selectFilter = state => state.phonebook.filter;
const selectError = state => state.phonebook.error;

const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export {
  selectContacts,
  selectIsLoading,
  selectFilter,
  selectError,
  selectFilteredContacts,
};
