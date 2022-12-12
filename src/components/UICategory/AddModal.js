import React,{useState, useContext} from 'react';
import {UserContext} from "views/admin/Categorynew";
import Card from './Card';
import Button from './Button';
import classes from './Modal.module.css';
import axios from 'axios';

const AddModal = (props) => {
    const [category, setCategory] = useState('');
    const [success, setSuccess] = useState();

    const {setResponse} = useContext(UserContext)

    const setCatHandler = (e) => {
        setCategory(e.target.value);
        
    }
    const addUserHandler = (event) => {
        event.preventDefault();

        if (category.trim().length === 0) {
          return;
        }
        const data = {categoryName : category}
        const Url = `https://localhost:7093/api/Category/CategoryName/${category}`
        const Add_Url = `https://localhost:7093/api/Category/Add`
        let token = localStorage.getItem("token"); 
         
       
        validate(Url,token)

        if(success===false){ 
          console.log("hai")
          axios.post(Add_Url, data, {
            headers: {
              'Authorization': `Basic ${token}`
            },
          })
          setResponse(category)
          setCategory('');
          props.onState(false);
          alert("category added")
    }
    };
       
    const validate = (Url,token) => {
      axios({
        url: Url ,
        method: "get",
        headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        },
        })
        .then((response) =>{
        setSuccess(response.data.success)})
    }
    const closeModal = () => {
      props.onState(true);
    }
  return (
    <div>
      <div className={classes.backdrop} />
      <Card className={classes.modal}>
        <header className={classes.header}> 
          <h2>Add Category</h2>
        </header>
        <div className={classes.content}>
          <label htmlFor="catName">Enter category name : &nbsp; &nbsp; </label>
          <input type="text" onChange={setCatHandler} value={category}  />
          {success &&<p>category already exists</p>}
        </div>
        <footer className={classes.actions}>
          <Button onClick={closeModal}>Close</Button>
          <Button onClick={addUserHandler}>Add</Button>
        </footer>
      </Card>
    </div>
  );
};

export default AddModal;