import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './context/Auth';
import { Login } from './pages/Login';
import { Internal } from './routes/Internal.routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path='/' exact component={Login}  />
          <Route component={Internal} />
        </Switch>
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App;
