import React,{useState, useContext} from "react";   
import{UserContext} from "views/admin/Categorynew";
import Card from "./Card";
import Button from "./Button";
import classes from "./Modal.module.css";
import axios from "axios";

const EditModal = (props) => {
    const [category, setcategory] = useState('');
    const {setResponse} = useContext(UserContext)
    const editUrl = `https://localhost:7093/api/Category/${props.sl}`
    
    const setCatHandler = (e) => {
        setcategory(e.target.value);
    }
    const addUserHandler = (event) => {
        event.preventDefault();
        if(category.trim().length === 0){
            return;
        }

        axios.put(editUrl, {
            categoryName : category
         })
         .then(res => {setResponse(res.data)})
          setcategory('');
          props.onEdit(false);
  
      };
        
    const closeModal = () => {
        props.onEdit(false);
    }
    return(
        <div>
            <div className={classes.backdrop} />
            <Card className={classes.modal}>
            <header className={classes.header}>
            <h2>Edit Category</h2>
            </header>
            <div className={classes.content}>
                <label htmlFor ="categoryname">Enter category name : &nbsp; &nbsp; </label>
                <input type="text" name="category" onChange={setCatHandler} defaultValue ={props.value} />
            </div>
            <footer className={classes.actions}>
                <Button onClick={closeModal}>Close</Button>
                <Button onClick={addUserHandler}>Save</Button>
            </footer>
            </Card>
        </div>
    );
};
export default EditModal;