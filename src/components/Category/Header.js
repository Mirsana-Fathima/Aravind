import React, {useState} from 'react'
import './Header.css'
import Modal from "components/UICategory/AddModal.js"


const Header = (props) => {

  const [state, setState] = useState(false);
  const stateHandler = () => {
    state ? setState(false) : setState(true);
  
  }
 
  return (
    <div className='header'>
        {state && <Modal  onState ={stateHandler}/>}
        <h1>Categories</h1>
        <div className='header-buttons'>
              {/* Search box */}
              <div class="input-group">
              <input type="text" className="form-control" placeholder="Search" />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className='add-category'>
            <button type="button" className="btn btn-primary" onClick={stateHandler} >
            <i className="fa-solid fa-plus"></i>
            Add Category
            </button>
          </div> 
          
         
        </div>
        
        

    </div>
  )
}

export default Header