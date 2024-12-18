import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to fetch example data
export const fetchExampleData = createAsyncThunk(
	'example/fetchExampleData',
	async (id, thunkAPI) => {
		try {
			const response = await fetch(
				'https://en8wzmrqp0.execute-api.us-east-1.amazonaws.com/status/status',
				{ method: 'GET' }
			);

			if (!response.ok) {
				return thunkAPI.rejectWithValue('Failed to fetch data');
			}

			const data = await response.json();
			return data["Item"];
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);



const exampleSlice = createSlice({
	name: 'example',
	initialState: { value: 0, loading: true, letters: [] }, // Initialize value with a default value
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchExampleData.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchExampleData.fulfilled, (state, action) => {
				state.loading = false;
				// Directly set state.value to action.payload (which is the 'Count' value)
				state.value = action.payload['Count'];
				state.letters = action.payload['Items']
			})
			.addCase(fetchExampleData.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { increment, decrement } = exampleSlice.actions;
export default exampleSlice.reducer;
