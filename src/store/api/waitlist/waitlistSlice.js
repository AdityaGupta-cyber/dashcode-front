import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch waitlist config by ID
export const fetchWaitlistConfigById = createAsyncThunk(
  'waitlist/fetchById',
  async (id, { dispatch }) => {
    try {
      dispatch(startLoading());
      // This would be a real API call in a production app
      // For now, we'll just simulate fetching from localStorage
      const savedConfig = localStorage.getItem(`waitlist_${id}`);
      
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        dispatch(setWaitlistConfig(config));
        return config;
      } else {
        // If no saved config for this ID, return null
        dispatch(setError('No configuration found for this waitlist'));
        return null;
      }
    } catch (error) {
      dispatch(setError(error.message || 'Failed to fetch waitlist configuration'));
      throw error;
    }
  }
);

// Initial state with default values
const initialState = {
  config: null,
  isLoading: false,
  error: null,
};

const waitlistSlice = createSlice({
  name: "waitlist",
  initialState,
  reducers: {
    saveWaitlistConfig: (state, action) => {
      state.config = action.payload;
      state.isLoading = false;
      state.error = null;
      console.log(`state.config: ${JSON.stringify(state.config,null,2)}`);
      
      // Also save to localStorage for demo purposes
      try {
        // Assuming we have a waitlistId in the payload or using a default
        const id = action.payload.id || 'default';
        localStorage.setItem(`waitlist_${id}`, JSON.stringify(action.payload));
      } catch (e) {
        console.error('Failed to save config to localStorage', e);
      }
    },
    setWaitlistConfig: (state, action) => {
      state.config = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { saveWaitlistConfig, setWaitlistConfig, startLoading, setError } = waitlistSlice.actions;

export default waitlistSlice.reducer; 