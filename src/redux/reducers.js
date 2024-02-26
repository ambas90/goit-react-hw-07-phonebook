import { createSlice } from '@reduxjs/toolkit';
import { getContacts, addContact, deleteContact } from './operations';

const pending = state => {
  state.isLoading = true;
};

const reject = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.pending, pending)
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
        state.error = null;
      })
      .addCase(getContacts.rejected, reject)
      .addCase(addContact.pending, pending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, reject)
      .addCase(deleteContact.pending, pending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, reject);
  },
});

export const { setFilter } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;
