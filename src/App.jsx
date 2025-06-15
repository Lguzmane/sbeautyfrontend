import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar los componentes
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Importar las páginas
import Home from './pages/1.Home.jsx';
import Search from './pages/2.Search.jsx';
import ServiceDetail from './pages/3.ServiceDetail.jsx';
import Login from './pages/4.Login.jsx';
import Register from './pages/5.Register.jsx';
import Profile from './pages/6.Profile.jsx';
import Booking from './pages/7.Booking.jsx';
import CreateService from './pages/10.CreateService.jsx';
import Schedule from './pages/11.Schedule.jsx';
import Cart from './pages/12.Cart.jsx'; 

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/cart" element={<Cart />} /> {/* Agregar la ruta al carrito */}
          {/* agregar una ruta de error 404*/}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
