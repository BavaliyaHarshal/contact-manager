import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import ContactList from './pages/ContactList';
import ContactCard from './pages/ContactCard';
import EditContact from './pages/EditContact';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/contact-list" element={<ContactList />} />
          <Route path="/contact-card/:id" element={<ContactCard />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
