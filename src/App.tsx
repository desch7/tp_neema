import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRouter from './pages/Admin/AdminRouter.tsx';
import AuthRouter from './pages/auth/authRouter.tsx';
import AuthGuard from './_helpers/AuthGuard.tsx';
import React from 'react';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<AuthRouter/>}/>
          <Route path='/admin/*' element={
              <AuthGuard>
                <AdminRouter/>
              </AuthGuard>
            }/>
          <Route path='/auth/*' element={<AuthRouter/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
