import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AppContext } from "../App";






export default function Auto() {
 const { 
    setTestInput,
    dropdownOptions,   
    value,
    setValue} = React.useContext(AppContext)



  return (
  

    <Autocomplete
      disablePortal
      autoHighlight
      multiple
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

  );
}
