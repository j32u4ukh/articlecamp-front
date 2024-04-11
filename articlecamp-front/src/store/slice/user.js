import { createSlice } from "@reduxjs/toolkit";

/*
createSlice：創建 slice，把 Redux 原生的 state、reducer、action 都合在一包，稱之為 slice

name：取一個相關的名稱

initialState：所有狀態的初始值

reducers：存放函式，傳入兩個參數，第一個為需要修改的 state，第二個為 action 讓你傳入的參數，用來改變 state
*/
export const userSlice = createSlice({
  name: "user",

  initialState: {
    isLogined: false,
    user: null,
  },

  reducers: {
    login: (state, action) => {
      state.isLogined = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
        state.isLogined = false;
        state.user = null;
    }
  }
});

// 取用方法
export const { login, logout } = userSlice.actions; 
// 取用資料(這裡的 user，對應了 configureStore 當中 reducer 的鍵值名稱)
export const selectUser = (state) => state.user; 
export default userSlice.reducer;