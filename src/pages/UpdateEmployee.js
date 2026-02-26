import { useEffect, useState } from 'react';
import './UpdateEmployee.css';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import axios from "axios";
import AppNavbar from './AppNavbar';
import {useNavigate, useParams } from 'react-router-dom';

const Title = styled.h1({
  color: "green",
  fontWeight: "bold",
  marginBottom: "20px",
  padding: "10px 15px",
  borderRadius: "6px",
  textAlign: "center",
})

function UpdateEmployee(){
    const{empid}=useParams();
    const navigate=useNavigate();

     const [formData,setFormData]=useState({
          empname:"",
          emailid:"",
          age:"",
          designation:"",
          salary:"",
        });
    
        // Handle input change
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      useEffect(()=>{
      const fetchEmployees = async () =>{
     try{
        const response =await fetch(`http://localhost:9090/api/v1/getEmp/${empid}`);
        const data=await response.json();
        setFormData(data);
    }catch(error){
        console.error("Error in Fetching Employee Details:",error.message)
    }
 }
   fetchEmployees();
      },[empid])


  // Handle Update Submit
  /*const handleSubmit = async (e) => {
    e.preventDefault();  // prevent form reload
    try {
      const response = await fetch(
        `http://localhost:9090/api/v1/updateEmp/${empid}`,
        {
          method: "PUT", // or POST depending on your backend
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Employee updated successfully ✅");
        navigate(`/viewEmployees`); // go back to employees list
      } else {
        console.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error.message);
    }
  };*/


 const handleSubmit = async (e) => {
  e.preventDefault(); // prevent form reload

  try {
    const response = await axios.put(
      `http://localhost:9090/api/v1/updateEmp/${empid}`,
      formData, // Axios automatically converts this to JSON
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      alert("Employee updated successfully ✅");
      navigate("/viewEmployees"); // redirect to employees list
    } else {
      console.error("Failed to update employee");
    }
  } catch (error) {
    console.error("Error updating employee:", error.message);
  }
};
  
    return(
       
    <>
       <AppNavbar/>
      <div className="form-container">
        <Title>Update Employee</Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="text" name="empname" placeholder="Enter Employee Name" value={formData.empname} onChange={handleInputChange} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="email" name="emailid" placeholder="Enter Emailid" value={formData.emailid} onChange={handleInputChange} required/>
          </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control type="number" name="age" placeholder="Enter age" value={formData.age} onChange={handleInputChange} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" name="designation" placeholder="Enter Designation" value={formData.designation} onChange={handleInputChange} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="number" name="salary" placeholder="Enter Salary" value={formData.salary} onChange={handleInputChange} required/>
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-btn">
           Update Employee
         </Button>
        </Form>
      </div>
    </>
  
    );
}




export default UpdateEmployee;
