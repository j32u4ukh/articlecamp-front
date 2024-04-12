import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';
import persistedReducer from './slice/persist';
import userReducer from "./slice/user";

/*
使用 Redux Toolkit，你會聽到幾個關鍵字：

store：用來存放資料狀態
reducer：用來放改變 state 狀態的方法
action：reducer 要修改 state 的話，需要傳入 action ，去判斷要啟動哪個 reducer，藉由 dispatch 呼叫方法
Provider：在所有組件的最外面包一層 Provider，傳入 store，所有被包覆的組件都可以使用到 store 的狀態。
slice：存放 state、reducer、action 的檔案

Redux 流程
創建 Store
在最外層加入 Provider，並傳入 store，使整個組件都能使用 store 資料
創建 Slice，設定 state、reducer、action
畫面渲染，取得 state、dispatch 方法改變狀態

將 slice 新增在 reducer

configureStore：創建 store 的參數，原生為 creactStore，使用 creactStore 時會有被棄用的警告
*/
export const store = configureStore({
  // 可添加多組 reducer
  reducer: {
    user: userReducer,
    persistor: persistedReducer,
    // 如有多個檔案，一樣 import 進來，新增在 reducer
    // product: productReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store, {}, () => {
  // 當存儲加載完成時執行的回調函數
  console.log('Redux Persist 已加載完畢');
  // 在此處執行您想要執行的操作，如更新 UI 狀態等
});