//import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { AppContext } from "../App";
import axios, { Axios } from 'axios';



export default function SliderComponent() {

    // const {
    //   range,sliderOutput,handleSliderChange,handleCommittedChange
    // } = React.useContext(AppContext)

    //😀from slider
    var d = new FormData();
    d.append('aggregate_fields', ["voyage_slaves_numbers__imp_total_num_slaves_disembarked"]);

    const config =  {
      method: 'post',
      baseURL: 'https://voyages3-api.crc.rice.edu/voyage/aggregations',
      headers: {'Authorization': 'Token 1bd7b6a695d87fb17a752fdcf58cc98c28486dd1'},
      data:d
    }

    const [isLoading, setLoading] = React.useState(true);
    const [range, setRange] = React.useState([0,0]);
    const [sliderOutput, setSliderOutput] = React.useState([0,0]);

    React.useEffect(() => {
        axios(config).then(res => {
          console.log("begin", [Object.values(res.data)[0]["min"], Object.values(res.data)[0]["max"]])

          var s = Object.values(res.data)[0]["min"]
          var e = Object.values(res.data)[0]["max"]
    
          setRange([s,e])
          console.log("range", [s,e])
          setSliderOutput([s,e])
          // setValue([range[0], range[1]/2]);
          setLoading(false);
        });
        console.log("useEffect")
      }, []);
      // slider {
      
      // console.log(range)
      
    
      function handleCommittedChange() {
        console.log("onchange", sliderOutput);
        //console.log("dataSend", dataSend);
      }
      
      const handleSliderChange = (event, newValue) => {
          setSliderOutput(newValue); 
          //setDataSend(newValue);
      };
      // } slider end
    
      if (isLoading) {
        return "loading";
      }
  


    
    
     
      return (
                <div className="App">
                  <header className="App-header">   
                      <Box sx={{ width: 300 }}>
                      <Slider
                        min = {range[0]}
                        max = {range[1]}
                        getAriaLabel={() => 'Temperature range'}
                        value={sliderOutput}
                        step={1}
                        onChange={handleSliderChange}
                        onChangeCommitted={handleCommittedChange}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                   </header>
                 </div>
             );
      
    }
    

