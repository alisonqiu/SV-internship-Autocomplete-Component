import React,  { useState, useContext } from 'react'
import AppContext from "./Store"

export function Add() {
    const [agg, setAgg] = useState("")
    const [filter, setFilter] = useState("")
    const { list, setList } = useContext(AppContext);
    return (
        <ul>
            <li>
                <input 
                    placeholder = "aggregate_fileds" 
                    onChange = {e => setAgg(e.target.value)} 
                /> 
            </li>
            <li>
                <input 
                    placeholder = "filter_params?" 
                    onChange = {e => setFilter(e.target.value)} 
                /> 
            </li>
            ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
            <br/>
            ***data validation***
            <br/>
            ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
            <li>
                <button 
                    onClick = {() => {
                        const date = new Date();
                        var res = date.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
                    const item = {
                        id:res,
                        aggregate_fileds:agg,
                        filter_params:filter
                    };
                    setList([item, ...list]); // set list data
            }}
            >
                SAVE
                </button>
            </li>
        </ul>
    );
}

export default Add
