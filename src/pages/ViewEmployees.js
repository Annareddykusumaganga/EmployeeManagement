import React from 'react';
import './ViewEmployees.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Button  from 'react-bootstrap/Button';
import AppNavbar from './AppNavbar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';


const TitleBar = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px auto",
  maxWidth: "1100px",
  //padding: "10px 20px",
 
  borderRadius: "8px",
  
});


const Title = styled.h1({
  color: "brown",
  fontWeight: "bold",
  marginBottom: "20px",
 // padding: "10px 15px",
  borderRadius: "6px",
  textAlign: "center",
  
})
 

const ViewEmployees = () => {
const[employees,setEmployees]=useState([]);
const [showModal, setShowModal] = useState(false);
const [selectedEmpid, setSelectedEmpId] = useState(null);
const navigate= useNavigate();

/*useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/v1/empList");
        setEmployees(response.data);
      } catch (error) {
        console.log("Error in fetching the EmployeeDetails: ", error.message);
      }
    };

    fetchEmployees();
  }, []); 
*/

const handleUpdate = (empid)=>{
  navigate(`/updateEmployee/${empid}`)
}

 const handleBack = () => {
    navigate("/");
  };


 const confirmDelete = (empid) => {
    setSelectedEmpId(empid);
    setShowModal(true);
  };
  /*const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9090/api/v1/deleteEmp/${selectedEmpId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.empid !== selectedEmpId)
      );
      setShowModal(false);
      console.log(`Employee with ID ${selectedEmpId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };*/

const handleDelete = async (empid) =>{
  try{
  const response = await fetch(`http://localhost:9090/api/v1/deleteEmp/${selectedEmpid}`,{
    method:"Delete",
  });
  if(response.ok){
    setEmployees((prevEmployees)=>
      prevEmployees.filter((employees)=>employees.empid!==selectedEmpid)
    )
  }
    console.log(`Employee with id ${empid} deleted Successfully`);
  }catch(error){
    console.error("Error in deleting ",error.message);
 }
 finally {
      setShowModal(false);
      setSelectedEmpId(null);
    }
}



useEffect(()=>{
  const fetchEmployees = async ()=>{
    try{
      const response=await fetch("http://localhost:9090/api/v1/empList");
      const data=await response.json();
      setEmployees(data);
    }catch(error){
      console.log("Error in fetching the EmployeeDetails: ", error.message);
    }
  }
  fetchEmployees();
},[]);

  return (
    <>
     <AppNavbar/>
      <div className="container"> 
      <TitleBar>
        <Title>ViewEmployees</Title>
        <Button variant="primary" onClick={handleBack}>
          Back 
        </Button>
      </TitleBar>
     
        {employees.length === 0 ? (
        <p className="nodataFound">No employees found.</p>
        ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Email-Id</th>
              <th>Age</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{emp.empname}</td>
                <td>{emp.emailid}</td>
                <td>{emp.age}</td>
                <td>{emp.designation}</td>
                <td>{emp.salary}</td>
                <td>
                  <Button variant='success' onClick={()=>handleUpdate(emp.empid)}>Update</Button>{" "}
                  <Button variant='primary' onClick={()=>confirmDelete(emp.empid)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

    {/* ✅ Bootstrap Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this employee?
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
 
    </>
  )
}

export default ViewEmployees