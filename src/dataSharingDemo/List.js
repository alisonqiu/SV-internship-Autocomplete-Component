import React, { useContext }from "react"
import AppContext from "./Store"


function List(props){
    const { list } = useContext(AppContext);
    return (
        <ul>
            {list.map(item => (
                <li key = {item.id}>
                    {item.id}
                    <ul>{item.aggregate_fileds}</ul>
                    <ul>{item.filter_params}</ul>
                </li>
            ))}
        </ul>
    );
}

export default List;