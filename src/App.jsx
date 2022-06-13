import React from 'react';
import './App.css';
import {autocomplete_text_fields, obj_autocomplete_text_fields} from './Components/vars'
//import Dropdown from './Components/Dropdown_old';
import Main from './Components/Main';
//import Dropdown from './Components/Dropdown';

import Cascading from './Components/Cascading'

import Auto from './Components/Autocomplete';
import SliderComponent from './Components/slider';
import { Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import axios, { Axios } from 'axios';
import {
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {TreeView, TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ArrowRightAlt';
import FilterAlt from '@mui/icons-material/FilterAlt';
import ChevronRightIcon from '@mui/icons-material/ArrowRightAlt';
import { useQuery } from 'react-query'

import NestedMenuItem from "material-ui-nested-menu-item";
import ComponentFac from './ComponentFac';

import {base_url, headers} from './status'

import {useContext} from "react";
// import {GlobalContext} from "../App";

export const AppContext = React.createContext();

export const outputContext = React.createContext();

function App() {
  //originally in Dropdown.js
  const [name, setName] = React.useState(autocomplete_text_fields[0]);
  const [textInput, setTestInput] = React.useState("");
  const [dropdownOptions, setDropdownOptions] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [label, setLabel] = React.useState(autocomplete_text_fields[0]);
  const [type,setType]  = React.useState("default type");

  const [labels, setLabels] = React.useState([]);
  const [output, setOutput] = React.useState([]);

  const [option, setOption] = React.useState('');
  const [menuPosition, setMenuPosition] = React.useState(null);


  const header={ "Authorization": 'Token bd233c83dceb9a0f70ffd2b47d6cd3a18a095260',
}
const base_url = "https://voyages3-api.crc.rice.edu/"


const headers = {'Authorization': "Token 681437e129e58364eeb754a654ef847f18c54e5f"}
      //******************************* The function to get all autocomplete labels*/
    
      const optionCall = async () => {
        var myHeaders = new Headers();
          myHeaders.append("Authorization", "Token bd233c83dceb9a0f70ffd2b47d6cd3a18a095260");
  
          var formdata = new FormData();
          formdata.append("", "");
  
          var requestOptions = {
            method: 'OPTIONS',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
  
          fetch("https://voyages3-api.crc.rice.edu/voyage/?hierarchical=False", requestOptions)
            .then(response => response.json())
            .then(result => {
              //console.log('666666666666',result)
              var array_result = []
              
              for(var i in result){
                array_result.push([i,result[i]])
              }

              const pokemon = array_result.map((obj) => ({
                name: obj[0],
                type: obj[1].type,
                label: obj[1].label,
                flatlabel: obj[1].flatlabel,
              }))
              //console.log("🚀 ~ file: Dropdown.js ~ line 85 ~ pokemon ~ pokemon", pokemon)
              //{name: 'voyage_itinerary__int_second_port_emb__geo_location__child_of__spatial_extent', type: "<class 'rest_framework.relations.PrimaryKeyRelatedField'>", label: 'Polygon', flatlabel: 'Itinerary : Second intended port of embarkation (EMBPORT2) : Location : Child of : Polygon'}
              const map =  array_result.map((obj) => ({
                [obj[0]]:obj[1].type
              }))

              // const filteredPokemonsByType= pokemon.filter(x=>x.type==="<class 'rest_framework.fields.CharField'>");
              // console.log("🚀 ~ filteredPokemonsByType", filteredPokemonsByType)
              // 0: {name: 'voyage_itinerary__port_of_departure__geo_location__child_of__name', type: "<class 'rest_framework.fields.CharField'>", label: 'Location name', flatlabel: 'Itinerary : Port of departure (PORTDEP) : Location : Child of : Location name'}
              // 1: {name: 'voyage_itinerary__port_of_departure__geo_location__parent_of__name', type: "<class 'rest_framework.fields.CharField'>", label: 'Location name', flatlabel: 'Itinerary : Port of departure (PORTDEP) : Location : Geographic Location : Location name'}
              // 2:
  
              var flatlabels = []
              var objects = []
              
              for(var i in pokemon){
                flatlabels.push(pokemon[i]['flatlabel'])
                if (autocomplete_text_fields.includes(pokemon[i]['name'])){
                  objects.push(pokemon[i])
                }
              }
              //console.log("🚀 ~ file: Dropdown.js ~ line 74 ~ optionCall ~ objects", objects)
              //3: {name: 'voyage_itinerary__port_of_departure', type: 'table', label: 'Port of departure (PORTDEP)', flatlabel: 'Itinerary : Port of departure (PORTDEP)'}
              //4: {name: 'voyage_itinerary__port_of_departure__id', type: "<class 'rest_framework.fields.IntegerField'>", label: 'ID', flatlabel: 'Itinerary : Port of departure (PORTDEP) : ID'}

              // setLabel(flatlabels)
              // setObject(objects)
              })
  
            .catch(error => console.log('error', error));
       }
       React.useEffect(()=> {
        optionCall()}, []);
     
      //**************************************** */

      //😁 from Dropdown (originally Script)
      const { isLoading, error, data: options } = useQuery('repoData', () => {
        return fetch(base_url + "voyage/", {
            method: "OPTIONS",
            headers: headers
        }).then(res => res.json())
    }
)


      React.useEffect(()=>{
        console.log('use effect fetch dropdown options')
        const fetchData = async (labels,textInput) => {
          console.log("Labels: ----->", labels)
          var formdata = new FormData();
          formdata.append(labels.option, textInput);

          console.log("🚀 ~ label, textInput", labels, textInput)
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
              var newOptions = result[labels.option]
              console.log("🚀 ~ file: Dropdown.js ~ line 43 ~ fetchData ~ newOptions", newOptions)
              setDropdownOptions(newOptions) })
        }
  
        fetchData(labels[labels.length-1],textInput).catch(console.error)
      },[labels,textInput])



      if (isLoading) return 'Loading...'
  
      if (error) return 'An error has occurred: ' + error.message
  
      
      //😀 from dropdown_old
      // React.useEffect(()=>{
      //   const fetchData = async (name,textInput) => {
      //     var formdata = new FormData();
      //     formdata.append(name, textInput);
      //     console.log("🚀 ~ name, textInput", name, textInput)
      //     var requestOptions = {
      //         method: 'POST',
      //         headers: header,
      //         body: formdata,
      //         redirect: 'follow'
      //     };
      //     fetch("https://voyages3-api.crc.rice.edu/voyage/autocomplete", requestOptions)
      //     .then(response => response.json())
      //     .then(result => {
      //         console.log("🚀YAYAYAY fetch is successful!!! result", result)
      //         var newOptions = result[name]
      //         console.log("🚀 ~ file: Dropdown.js ~ line 43 ~ fetchData ~ newOptions", newOptions)
      //         setDropdownOptions(newOptions) })
      //   }
  
      //   fetchData(name,textInput).catch(console.error)
      // },[name,textInput])
  
  
  return (
    <AppContext.Provider
    value={{
      name,
      setName,
      textInput,
      setTestInput,
      dropdownOptions,
      setDropdownOptions,
      value,
      setValue,

      //script
      // renderTree,
      options,
      menuPosition, 
      setMenuPosition,
      isLoading,
      setOutput,
      output,
      labels, setLabels

    }}
  >

      <Accordion>
        <AccordionSummary
          expandIcon={<FilterAlt />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction={'row'} spacing={2} alignItems="center" justify = "center">
            <Grid item xs={4} >
             <Cascading/>
            </Grid>
            <Grid item xs={8}>
              <Card>
              {output.map((item) => {
                return(
                  <Grid margin={3} >
                    <Grid item>
                      <ComponentFac params={item} />
                    </Grid>
                  </Grid>
                )})
              }
              </Card>
            </Grid>
          </Grid>
          </AccordionDetails>
        </Accordion>

      <Main/>
    </AppContext.Provider>
  );
}

export default App;
