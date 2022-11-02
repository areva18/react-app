import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Add from './pages/contact/Add';
import Edit from './pages/contact/Edit';
import Contacts from './pages/contact/Contacts';
import Delete from './pages/contact/Delete';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/home' exact element={<Home />} />
        <Route path='/list/:id' exact element={<Contacts />} />
        <Route path='/add-contact' exact element={<Add />} />
        <Route path='/edit-contact/:id' exact element={<Edit />} />
        <Route path='/delete-contact/:id' exact element={<Delete />} />
      </Routes>
    </div>
  );
}

export default App;
