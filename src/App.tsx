import { BrowserRouter, Route } from 'react-router-dom'
import { AuthProvider } from './context/Auth'

import { Login } from "./pages/Login/" 
import { Home } from "./pages/Home/"

function App() {
  return (
    <BrowserRouter>
    
      <AuthProvider>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App;
