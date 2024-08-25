import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

// Using buildCreateSlice to create a Redux slice
// This slice is configured with an asyncThunk,
// which is a function that can dispatch actions to handle asynchronous operations
// asyncThunkCreator is used to create this asyncThunk
export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
