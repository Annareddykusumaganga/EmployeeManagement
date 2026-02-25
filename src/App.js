import {Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddEmployee from './pages/AddEmployee';
import ViewEmployees from './pages/ViewEmployees';
import UpdateEmployee from './pages/UpdateEmployee';

function App() {
  return (
<>

 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/addEmployee" element={<AddEmployee/>} />
 <Route path="/updateEmployee/:empid" element={<UpdateEmployee/>} />
 <Route path="/viewEmployees" element={<ViewEmployees />} />
 </Routes>
   
</>

);
}

export default App;
