import { useState } from "react"
import styled from 'styled-components';
import { Form, Button} from "react-bootstrap";
import './AddEmployee.css';
import { useNavigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";

const Title = styled.h1({
  color: "green",
  fontWeight: "bold",
  marginBottom: "20px",
  padding: "10px 15px",
  borderRadius: "6px",
  textAlign: "center",
})
 

 

const AddEmployee = () => {
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

  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Employee Data:", formData);
    try{
      const response = await fetch("http://localhost:9090/api/v1/insertEmp",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      });

      const data=await response.json();
      console.log("Employee created: ",data);
       setFormData({
      empname: "",
      emailid: "",
      age: "",
      designation: "",
      salary: "",
    });
      navigate("/");
    }catch(error){
         console.log("Error in creating Employee: ",error.message);
    }
    //alert("Employee Added Successfully ✅");
   
  };

  return (
    <>
      <AppNavbar/>
      <div className="form-container">
        <Title>Add Employee</Title>
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
           Add New Employee
         </Button>
        </Form>
      </div>
    </>
  
  )
}

export default AddEmployee