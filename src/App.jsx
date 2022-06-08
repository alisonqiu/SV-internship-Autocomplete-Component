import React from 'react';
import './App.css';
import {autocomplete_text_fields, obj_autocomplete_text_fields} from './Components/vars'
//import Dropdown from './Components/Dropdown_old';
import Main from './Components/Main';
import Dropdown from './Components/Dropdown';
import Auto from './Components/Autocomplete';
import SliderComponent from './Components/slider';
import axios, { Axios } from 'axios';
import {
  Container,
  Slider,
  Button,
  Checkbox,
  FormControlLabel,
  ListItem,
  Grid,
  List,
  ListItemText,
  Card, CardContent, CardHeader, Box, Paper, Chip, TextField
} from '@mui/material';
import {TreeView, TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ArrowRightAlt';
import ChevronRightIcon from '@mui/icons-material/ArrowRightAlt';
import { useQuery } from 'react-query'


export const AppContext = React.createContext();

function App() {
  //originally in Dropdown.js
  const [name, setName] = React.useState(autocomplete_text_fields[0]);
  const [textInput, setTestInput] = React.useState("");
  const [dropdownOptions, setDropdownOptions] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [label, setLabel] = React.useState([]);
  const [object, setObject] = React.useState([]);

  const header={ "Authorization": 'Token bd233c83dceb9a0f70ffd2b47d6cd3a18a095260',
}
const base_url = "https://voyages3-api.crc.rice.edu/"


const headers = {'Authorization': "Token 681437e129e58364eeb754a654ef847f18c54e5f"}
      //******************************* The function to get all autocomplete labels*/
    
      const optionCall = async () => {
        var myHeaders = new Headers();
          myHeaders.append("Authorization", "Token bd233c83dceb9a0f70ffd2b47d6cd3a18a095260");
  
          var formdata = new FormData();
          formdata.append("voyage_dates__date_departed_africa", "");
  
          var requestOptions = {
            method: 'OPTIONS',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
  
          fetch("https://voyages3-api.crc.rice.edu/voyage/?hierarchical=False", requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log('666666666666',result)
              var array_result = []
              
              for(var i in result){
                array_result.push([i,result[i]])
              }
              console.log("🚀 ~ file: Dropdown.js ~ line 74 ~ optionCall ~ array_result", array_result)
              // Array(2)
              //   0: "voyage_itinerary__int_second_port_emb__geo_location__child_of__spatial_extent"
              //   1: {type: "<class 'rest_framework.relations.PrimaryKeyRelatedField'>", label: 'Polygon', flatlabel: 'Itinerary : Second intended port of embarkation (EMBPORT2) : Location : Child of : Polygon'}
              // length: 2
  
              // const flatlabels =  array_result.map((obj) => ({
              //             flatlabel: obj[1].flatlabel
              //           }))
              // console.log("😇 ~ file: Dropdown.js ~ line 102 ~ flatlabels ~ flatlabels", flatlabels)
              //         }
              
              const pokemon = array_result.map((obj) => ({
                name: obj[0],
                type: obj[1].type,
                label: obj[1].label,
                flatlabel: obj[1].flatlabel,
              }))
              console.log("🚀 ~ file: Dropdown.js ~ line 85 ~ pokemon ~ pokemon", pokemon)
              //{name: 'voyage_itinerary__int_second_port_emb__geo_location__child_of__spatial_extent', type: "<class 'rest_framework.relations.PrimaryKeyRelatedField'>", label: 'Polygon', flatlabel: 'Itinerary : Second intended port of embarkation (EMBPORT2) : Location : Child of : Polygon'}
  
  
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
              console.log("🚀 ~ file: Dropdown.js ~ line 74 ~ optionCall ~ objects", objects)
              //3: {name: 'voyage_itinerary__port_of_departure', type: 'table', label: 'Port of departure (PORTDEP)', flatlabel: 'Itinerary : Port of departure (PORTDEP)'}
              //4: {name: 'voyage_itinerary__port_of_departure__id', type: "<class 'rest_framework.fields.IntegerField'>", label: 'ID', flatlabel: 'Itinerary : Port of departure (PORTDEP) : ID'}

              setLabel(flatlabels)
              setObject(objects)
              })
  
            .catch(error => console.log('error', error));
       }
       React.useEffect(()=> {
        optionCall()}, []);
     
      //**************************************** */

      //😁 from Dropdown (originally Script)
      const [labels, setLabels] = React.useState([]);
      // var data = "init value";

      React.useEffect(()=>{
        const fetchData = async (labels,textInput) => {
          var formdata = new FormData();
          formdata.append(labels, textInput);
          console.log("🚀 ~ labels[0], textInput", labels,labels[0], textInput)
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
              var newOptions = result[labels]
              console.log("🚀 ~ file: Dropdown.js ~ line 43 ~ fetchData ~ newOptions", newOptions)
              setDropdownOptions(newOptions) })
        }
  
        fetchData(labels[labels.length-1],textInput).catch(console.error)
      },[labels,textInput])



      const { isLoading, error, data: options } = useQuery('repoData', () => {
              return fetch(base_url + "voyage/", {
                  method: "OPTIONS",
                  headers: headers
              }).then(res => res.json())
          }
      )
  
      function isChildren(key) {
          return key !== "type" && key !== "label" && key !== "flatlabel"
      }
  
      function isLast(node) {
          return Object.keys(node).length <= 3
      }
  
      var count = 0;
      const renderTree = (nodes, name) => {
          //console.log("🚀 ~ file: Script.js ~ line 54 ~ Script ~ nodes", nodes)
          return <TreeItem key={nodes.label} nodeId={""+count++} label={nodes.label? nodes.label:"Menu"}>
              { Object.keys(nodes).map((key) =>
                  isChildren(key)
                      ? isLast(nodes[key])
                          ? <ListItem key={key} disablePadding>
                              <Checkbox  onChange={(event, checked) => handleCheck(checked, name ? (name.slice(2)+"__"+key) : key)}/>
                              <ListItemText primary={key+" ("+nodes[key].flatlabel+")"} secondary={nodes[key].type}/>
                          </ListItem>
                          : renderTree(nodes[key], name+"__"+key)
                      : null
              )
              }
          </TreeItem>
     
  };
  
      function handleCheck(isChecked, label){
          if (isChecked) {
              setLabels([...labels, label])
          }else{
              setLabels(labels.filter((i) => i !== label))
          }
          console.log("💙label ",labels)
      }
  
  
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
  
  
    // const handleChange = (event) => {
    //   setName(event.target.value);
   
    // };

    //😀from slider
    // var d = new FormData();
    // d.append('aggregate_fields', ["voyage_slaves_numbers__imp_total_num_slaves_disembarked"]);

    // const config =  {
    //   method: 'post',
    //   baseURL: 'https://voyages3-api.crc.rice.edu/voyage/aggregations',
    //   headers: {'Authorization': 'Token 1bd7b6a695d87fb17a752fdcf58cc98c28486dd1'},
    //   data:d
    // }

    // const [isLoading, setLoading] = React.useState(true);
    // const [range, setRange] = React.useState([0,0]);
    // const [sliderOutput, setSliderOutput] = React.useState([0,0]);

    // React.useEffect(() => {
    //     axios(config).then(res => {
    //       console.log("begin", [Object.values(res.data)[0]["min"], Object.values(res.data)[0]["max"]])

    //       var s = Object.values(res.data)[0]["min"]
    //       var e = Object.values(res.data)[0]["max"]
    
    //       setRange([s,e])
    //       console.log("range", [s,e])
    //       setSliderOutput([s,e])
    //       // setValue([range[0], range[1]/2]);
    //       setLoading(false);
    //     });
    //     console.log("useEffect")
    //   }, []);
    //   // slider {
      
    //   // console.log(range)
      
    
    //   function handleCommittedChange() {
    //     console.log("onchange", sliderOutput);
    //     //console.log("dataSend", dataSend);
    //   }
      
    //   const handleSliderChange = (event, newValue) => {
    //       setSliderOutput(newValue); 
    //       //setDataSend(newValue);
    //   };
    //   // } slider end
    
    //   if (isLoading) {
    //     return "loading";
    //   }
  
  
  
  
  
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
      label,
      object,
      //handleChange,
      //slider
      // isLoading, setLoading,
      // range, setRange,
      // sliderOutput, setSliderOutput,
      // handleCommittedChange,
      // handleSliderChange

      //script
      renderTree,options

    }}
  >
      <Grid container  sx={{display:'flex', flexDirection:'row'}}>
      <Grid item xs={8}>
        <h1>Dropdown</h1>
        <Dropdown/>
      </Grid>
        <Grid item xs={4}>
        <h1>Autocomplete/Slider</h1>
          <Auto/>
          {/* <SliderComponent/> */}
        </Grid>
      </Grid>

      <Main/>
 
    </AppContext.Provider>
  );
}

export default App;
