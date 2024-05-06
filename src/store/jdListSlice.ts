import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  AsyncThunkPayloadCreator,
} from "@reduxjs/toolkit";
import {
  InitialState,
  JDListApiResponse,
  FetchJDListRequestPayload,
} from "../types/index";

let initialState: InitialState = {
  jdList: [],
  totalCount: 0,
  isLoading: false,
  error: "",
  success: "",
};

export const fetchJdList = createAsyncThunk(
  "jdListThunk",
  async (body: AsyncThunkPayloadCreator<FetchJDListRequestPayload>) => {
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

      return response.json();
    } catch (error) {
      return {
        jdList: [],
        totalCount: 0,
      };
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
