import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Login } from './components/pages/auth/login/Login.tsx';
import { tokenStatus } from './redux/actions/authActions.ts';
import { logout } from './redux/slices/authSlice.ts';
import { DashContainer } from './components/pages/dashboard/DashContainer.tsx';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { ThemeProvider } from './context/ThemeCtx.tsx';

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.login.token);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(tokenStatus(token)).then((res) => {
        if (res.type === 'auth/tokenStatus/rejected') {
          dispatch(logout());
        }
      });
    }
  }, [token, dispatch]);

  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <div className={`flex flex-col items-center align-middle`}>
        <Routes>
          <Route path='/login' element={token ? <Navigate to='/' /> : <Login />} />
          {/* <Route
          path='/signup'
          element={token ? <Navigate to='/' /> : <SignUpPage />}
          /> */}
          {/* <Route
          path='/expenses'
          element={!token ? <Navigate to='/' /> : <ExpensesPage />}
          /> */}
          <Route path='/*' element={token ? <DashContainer /> : <Navigate to='/login' />} />
          {/* 404 route */}
          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
