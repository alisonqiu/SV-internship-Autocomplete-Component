//import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { AppContext } from "../App";



export default function SliderComponent() {

    const {
      range,sliderOutput,handleSliderChange,handleCommittedChange
    } = React.useContext(AppContext)


    
    
     
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
    

