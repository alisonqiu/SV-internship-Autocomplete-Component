# Issues and how I fixed them
1. defining and using async functions in useEffect

**original**: 

const useFetch = (data) => {
    //should define this in main function
    const [dropdownOptions, setDropdownOptions] = React.useState([]);


    React.useEffect(()=> {
    //should say const fetchData = async() ={...}
      async function fetchData() {
      ...
    }
    fetchData();}, [data]);

export default function Dropdown() {
 ...
  const {dropdownOptions, loading} = useFetch(data);
  ...


**fixed**: 
React.useEffect(()=>{
      const fetchData = async (name,textInput) => {
        ...
      }

      fetchData(name,textInput).catch(console.error)
    },[name,textInput])

2. incompatible data body format when sending post request (or undefined)

**original**: 

 const response = await fetch(base_url+'voyage/autocomplete', 
      { 
          method: 'POST', 
          body: JSON.stringify(data),
          headers: header
      }


**fixed**: 
1.  postman -> code snippet -> JavaScript - Fetch


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


## otherthings I learned:
1. the state update using the updater provided by useState hook is also asynchronous

solution: If you want to perform an action on state update, you need to use the useEffect hook (https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately)

2. For GitHub, don't forget to `git pull` before `git push`


# TODOS
- [ ]  allow multi select 
- [ ] change the display of text fields 
- [ ] dynamic rendering names in var.js 
