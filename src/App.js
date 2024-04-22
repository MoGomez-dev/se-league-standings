import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import { Admin } from './Components/Admin';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/admin/' element={<Admin />}/>
      </Routes>
    </div>
  );
}

export default App;
