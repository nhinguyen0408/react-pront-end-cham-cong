
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Nav from './components/layout/Nav';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from './components/pages/NotFound';
import CheckIn from './components/pages/CheckIn';
import AddEmployee from './components/pages/employee/AddEmployee';
import Worked from './components/pages/Worked';
import OverTime from './components/pages/OverTime';
import LateTime from './components/pages/LateTime';
import ViewEmployee from './components/pages/employee/ViewEmployee';
import CreateCheckIn from './components/pages/CreateCheckIn';
import EditEmployee from './components/pages/employee/EditEmployee';
function App() {
  
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/employee/:id" element={<ViewEmployee/>} />
          <Route path="/employee/edit/:id" element={<EditEmployee/>} />
          <Route path="/check-in" element={<CheckIn/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/worked/:id" element={<Worked/>} />
          <Route path="/over-time" element={<OverTime/>} />
          <Route path="/late-time" element={<LateTime/>} />
          <Route path="/employee/add" element={<AddEmployee/>} />
          <Route path="/check-in/create" element={<CreateCheckIn/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
