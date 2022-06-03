import React from 'react';
import './App.css';
import {autocomplete_text_fields, obj_autocomplete_text_fields} from './Components/vars'
import Dropdown from './Components/Dropdown';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const AppContext = React.createContext();

function App() {
  //originally in Dropdown.js
  const [name, setName] = React.useState(autocomplete_text_fields[0]);
  const [textInput, setTestInput] = React.useState("");
  const [dropdownOptions, setDropdownOptions] = React.useState([]);
  const [value, setValue] = React.useState([]);

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
      setValue

    }}
  >

      <Dropdown/>
      {/* slider needs {name:value} */}
 
    </AppContext.Provider>
  );
}

export default App;
