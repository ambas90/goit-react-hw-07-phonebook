import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://65d5f903f6967ba8e3bd26a2.mockapi.io/';

const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
    try {
      const result = await axios.get('/contacts');
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const result = await axios.post('/contacts', { name, number });
      return result.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (ContactId, thunkApi) => {
    try {
      const response = await axios.delete(`/contacts/${ContactId}`);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export { getContacts, addContact, deleteContact };
