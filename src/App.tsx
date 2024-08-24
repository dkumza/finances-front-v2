import { Toaster } from './components/ui/toaster';
import { Login } from './components/pages/auth/login/Login';

function App() {
  return (
    <div>
      <Login />
      <Toaster />
    </div>
  );
}

export default App;
