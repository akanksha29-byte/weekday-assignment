import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  InitialState,
  JDListApiResponse,
  FetchJDListRequestPayload,
} from "../types";

let initialState: InitialState = {
  jdList: [],
  totalCount: 0,
  isLoading: false,
  error: "",
  success: "",
};

export const fetchJdList = createAsyncThunk<
  JDListApiResponse, // Return type of the async function
  FetchJDListRequestPayload // Type of the payload sent in the request
>(
  "jdListThunk",
  async (body: FetchJDListRequestPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.weekday.technology/adhoc/getSampleJdJSON`,
        {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        // Handle non-successful response
        return rejectWithValue("Failed to fetch JD list");
      }

      return response.json();
    } catch (error) {
      // Handle fetch error
      return rejectWithValue("Failed to fetch JD list");
    }
  }
);

const jdListSlice = createSlice({
  name: "jdListSlice",
  reducerPath: "jdListReducer",
  reducers: {
    setJDList: (state, action: PayloadAction<JDListApiResponse>) => {
      return {
        ...state,
        jdList: [...state.jdList, ...action?.payload?.jdList],
        totalCount: action?.payload?.totalCount,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJdList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchJdList.rejected, (state) => {
      state.error = "Unable to fetch data";
      state.isLoading = false;
    });
    builder.addCase(fetchJdList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jdList = [...state.jdList, ...action?.payload?.jdList];
      state.totalCount = action?.payload?.totalCount;
    });
  },
  initialState,
});

export default jdListSlice.reducer;

export const { setJDList } = jdListSlice.actions;
