// ./slices/exampleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExampleData = createAsyncThunk(
	'example/fetchExampleData',
	async (id, thunkAPI) => {
		const response = await fetch(`/api/example/${id}`);
		return await response.json();
	}
);

const exampleSlice = createSlice({
	name: 'example',
	initialState: { value: 1259154, loading: false },
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
				state.value = action.payload.value;
			})
			.addCase(fetchExampleData.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { increment, decrement } = exampleSlice.actions;
export default exampleSlice.reducer;
