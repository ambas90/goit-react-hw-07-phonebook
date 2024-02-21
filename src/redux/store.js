import { configureStore } from '@reduxjs/toolkit';
import { phonebookSlice } from './reducers';

const store = configureStore({
  reducer: {
    phonebook: phonebookSlice.reducer,
  },
});

export default store;
