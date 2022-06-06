import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { AppContext } from "../App";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {autocomplete_text_fields, obj_autocomplete_text_fields} from './vars'
//import MultipleSelect from "./Multiselect"



const header={ "Authorization": 'Token bd233c83dceb9a0f70ffd2b47d6cd3a18a095260',
}
const base_url = "https://voyages3-api.crc.rice.edu/"
const mapbox_access_token='pk.eyJ1IjoiamNtMTAiLCJhIjoiY2wyOTcyNjJsMGY5dTNwbjdscnljcGd0byJ9.kZvEfo7ywl2yLbztc_SSjw'



   

    //return { dropdownOptions, loading };
  


export default function Dropdown() {
  // const [name, setName] = React.useState(autocomplete_text_fields[0]);
  // const [textInput, setTestInput] = React.useState("");
  // const [dropdownOptions, setDropdownOptions] = React.useState([]);

  const { name,
    setName,
    textInput,
    setTestInput,
    dropdownOptions,
    setDropdownOptions,      
    value,
    setValue,label,object} = React.useContext(AppContext)



    React.useEffect(()=>{
      const fetchData = async (name,textInput) => {
        var formdata = new FormData();
        formdata.append(name, textInput);
        console.log("🚀 ~ name, textInput", name, textInput)
        var requestOptions = {
            method: 'POST',
            headers: header,
            body: formdata,
            redirect: 'follow'
        };
        fetch("https://voyages3-api.crc.rice.edu/voyage/autocomplete", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("🚀YAYAYAY fetch is successful!!! result", result)
            var newOptions = result[name]
            console.log("🚀 ~ file: Dropdown.js ~ line 43 ~ fetchData ~ newOptions", newOptions)
            setDropdownOptions(newOptions) })
      }

      fetchData(name,textInput).catch(console.error)
    },[name,textInput])


  const handleChange = (event) => {
    setName(event.target.value);
 
  };






  return (
    <>
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">name</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={name}
        label="name"
        onChange={handleChange}
      >

        {/* 1. 😄 using static file  */}
        
        {/* {
          autocomplete_text_fields.map((name)=>(
            <MenuItem value={name}>{name}</MenuItem>
          ))
        } */}

        {/* 2. 😄 using API NOT filtered by static file  */}

        {/* {
          label.map((name)=>(
            <MenuItem value={name}>{name}</MenuItem>
          ))
        } */}

        {/* 3. 😄 using API filtered by static file  */}

        {
          object.map((name)=>{
            if(autocomplete_text_fields.includes(name['name'])){
              return <MenuItem value={name['name']}>{name['flatlabel']}</MenuItem>}
            })
        }
      </Select>
    </FormControl>
  </Box>
    <Autocomplete
      disablePortal
      autoHighlight
      multiple
      id="combo-box-demo"
      options={dropdownOptions}
      value={dropdownOptions[0]}
      onChange={(event, newValue) => {
        setValue(oldArray => [newValue][0]);
        console.log(value)
      }}
      sx={{ width: 300 }}
      renderInput={(params) => {
        //params.inputProps.value is what i type in 
        //console.log("🚀 ~ file: Dropdown.js ~ line 108 ~ Dropdown ~ params", params.InputProps)
        setTestInput(params.inputProps.value)
        return <TextField {...params} label="field" />
         
    }}
    />
    </>
  );
}
