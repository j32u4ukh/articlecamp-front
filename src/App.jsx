import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import ArticleLayout from './layouts/ArticleLayout';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import CreateEditPage from './pages/CreateEditPage';
import HomePage from './pages/HomePage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import { persistor, store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
          <Routes> 
              <Route index element={<HomePage />} />
              {/* <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} /> */}
              <Route path='/login' element={<LoginRegisterPage type='login' />} />
              <Route path='/register' element={<LoginRegisterPage type='register' />} />

              <Route path="/articles" element={<ArticleLayout />}>
                <Route index element={<ArticleListPage />} />
                {/* <Route path='create' element={<CreatePage />} /> */}
                <Route path='create' element={<CreateEditPage type='create' />} />
                <Route path=':id' element={<ArticlePage />} />
                {/* <Route path=':id/edit' element={<EditPage />} /> */}
                <Route path=':id/edit' element={<CreateEditPage type='edit' />} />
              </Route>

              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/users" element={<UsersPage />} />
              
              {/* 全匹配路由
              設定 Route path="*" 在所有路由的最下方，當上面的路徑都沒有匹配到時，就會顯示此組件，可用於 404 找不到頁面 */}
              <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>   
    </Provider>
  )
}
