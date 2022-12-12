import React from 'react';
import Sidebar from "components/Sidebar/Sidebar.js";
import AdminNavbar from "src/components/Navbars/AdminNavbar";


export default function Homepage() {
    return (
        <>
        <div>
   <div className='side'>
    <Sidebar/>
    </div>
    <div className='nav'>
   <AdminNavbar/>
    </div>
   </div>
    </>
);
}