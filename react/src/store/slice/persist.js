import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

export const persistSlice = createSlice({
    name: "persistor",

    initialState: {
        jwt: null,
        user: null,
    },

    reducers: {
        setJwt: (state, action) => {
            const token = action.payload;
            state.jwt = token;
            const parts = token.split(".");
            const payload = JSON.parse(atob(parts[1]));
            state.user = payload.user;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

// 取用方法
export const { setText, setJwt, setUser } = persistSlice.actions;
// 取用資料(這裡的 persistor，對應了 configureStore 當中 reducer 的鍵值名稱)
export const selectPersist = (state) => state.persistor;
export default persistReducer(persistConfig, persistSlice.reducer);
