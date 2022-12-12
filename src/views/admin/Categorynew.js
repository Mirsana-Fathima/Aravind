import React, {useState, createContext, useEffect} from "react";
import Header from "components/Category/Header";
import Table from "components/Category/Table";
import "views/admin/Categorynew.css";
import  axios  from "axios";

export const UserContext = createContext();

function Categorynew(){
        const [data, setData] = useState([]);
        const [response, setResponse] = useState('');
       
        useEffect(() => {
            const Url = "https://localhost:7093/api/Category"
            let token = localStorage.getItem("token");

            axios({
            url: Url ,
            method: "get",
            headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
            }).then(function (response) {
            setData(response.data.data);
            });
         },[response]);
        
        return (
        <>
        <div className="Categorynew">
            <UserContext.Provider value={{data,setData,response,setResponse}}>
            <Header />
            <Table />
        </UserContext.Provider>
        </div>
        </>
);
}
export default Categorynew;