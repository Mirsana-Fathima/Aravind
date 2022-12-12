import React from "react";
import './Table.css'
import TableRow from './TableRow'
import {useContext} from "react";
import {UserContext} from "views/admin/Categorynew";



const Table = () => {
    const {data} = useContext(UserContext)

    return(
        <div className = "category-table">
            <li className = "table-header">
                <div className = "col">Category Id</div>
                <div className = "col">Category Name</div>
                <div className = "col">Actions</div>
            </li>
            {
                data && data.map((cat,id) => {
                    return <TableRow
                        key = {id}
                        sl = {cat.categoryId}
                        cat = {cat.categoryName}
                    />
                }
                )
            }
        </div>
    )
}
export default Table