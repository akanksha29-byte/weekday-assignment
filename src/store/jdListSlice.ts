import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialState, JDListApiResponse } from '../types/index';

let initialState: InitialState = {
    jdList: [],
    totalCount: 0,
}

const jdListSlice = createSlice({
    name: 'jdListSlice',
    reducerPath: 'jdListReducer',
    reducers: {
        setJDList: (state, action: PayloadAction<JDListApiResponse>) => ({
            ...state,
            jdList: [...state.jdList ,...action?.payload?.jdList],
            totalCount: action?.payload?.totalCount
        }),
    },
    initialState,
});

export default jdListSlice.reducer;

export const { setJDList } = jdListSlice.actions;