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
//'Content-type': 'application/json' ,
//'Accept': 'application/json'
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
    setValue} = React.useContext(AppContext)


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

    //******************************* The function to get all autocomplete labels*/
    
    // const optionCall = async () => {
    //   var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Token 0bfda2118118484d52aeec86812269aadeb37c67");

    //     var formdata = new FormData();
    //     formdata.append("voyage_dates__date_departed_africa", "");

    //     var requestOptions = {
    //       method: 'OPTIONS',
    //       headers: myHeaders,
    //       body: formdata,
    //       redirect: 'follow'
    //     };

    //     fetch("https://voyages3-api.crc.rice.edu/voyage/?hierarchical=False", requestOptions)
    //       .then(response => response.json())
    //       .then(result => {
    //         console.log('666666666666',result)
    //         var array_result = []
            
    //         for(var i in result){
    //           array_result.push([i,result[i]])
    //         }
    //         console.log("🚀 ~ file: Dropdown.js ~ line 74 ~ optionCall ~ array_result", array_result)
    //         // Array(2)
    //         //   0: "voyage_itinerary__int_second_port_emb__geo_location__child_of__spatial_extent"
    //         //   1: {type: "<class 'rest_framework.relations.PrimaryKeyRelatedField'>", label: 'Polygon', flatlabel: 'Itinerary : Second intended port of embarkation (EMBPORT2) : Location : Child of : Polygon'}
    //         // length: 2

    //         const pokemon = array_result.map((obj) => ({
    //           name: obj[0],
    //           type: obj[1].type,
    //           label: obj[1].label,
    //           flatlabel: obj[1].flatlabel,
    //         }))
    //         console.log("🚀 ~ file: Dropdown.js ~ line 85 ~ pokemon ~ pokemon", pokemon)
    //         //{name: 'voyage_itinerary__int_second_port_emb__geo_location__child_of__spatial_extent', type: "<class 'rest_framework.relations.PrimaryKeyRelatedField'>", label: 'Polygon', flatlabel: 'Itinerary : Second intended port of embarkation (EMBPORT2) : Location : Child of : Polygon'}


    //         const filteredPokemonsByType= pokemon.filter(x=>x.type==="<class 'rest_framework.fields.CharField'>");
    //         console.log("🚀 ~ filteredPokemonsByType", filteredPokemonsByType)
    //         // 0: {name: 'voyage_itinerary__port_of_departure__geo_location__child_of__name', type: "<class 'rest_framework.fields.CharField'>", label: 'Location name', flatlabel: 'Itinerary : Port of departure (PORTDEP) : Location : Child of : Location name'}
    //         // 1: {name: 'voyage_itinerary__port_of_departure__geo_location__parent_of__name', type: "<class 'rest_framework.fields.CharField'>", label: 'Location name', flatlabel: 'Itinerary : Port of departure (PORTDEP) : Location : Geographic Location : Location name'}
    //         // 2:

    //         var labels = []
            
    //         for(var i in filteredPokemonsByType){
    //           labels.push(filteredPokemonsByType[i])
    //         }
    //         console.log("🚀 ~ file: Dropdown.js ~ line 74 ~ optionCall ~ labels", labels)
    //         })

    //       .catch(error => console.log('error', error));
    // }

    // optionCall()
    //**************************************** */

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
        {/* TODO: dynamic rendering names in var.js */}
        {/* TODO: change the display of text fields */}
        
        {
          autocomplete_text_fields.map((name)=>(
            <MenuItem value={name}>{name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  </Box>
     <div>{`value: ${value !== null ? `${value}` : 'null'}`}</div>
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
