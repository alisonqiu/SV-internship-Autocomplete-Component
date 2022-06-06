# Issues and how I fixed them
1. defining and using async functions in useEffect

`
      
     React.useEffect(()=>{
      const fetchData = async (name,textInput) => {
        ...
      }

      fetchData(name,textInput).catch(console.error)
    },[name,textInput])`

2. incompatible data body format when sending post request (or undefined)

**original**: 

<img width="477" alt="Screen Shot 2022-06-03 at 4 00 14 PM" src="https://user-images.githubusercontent.com/90943803/171952158-d254a8a7-c0a6-41fb-9f08-fe6d73ff0dd8.png">


**fixed**: 
1.  postman -> code snippet -> JavaScript - Fetch
<img width="662" alt="Screen Shot 2022-06-03 at 4 00 18 PM" src="https://user-images.githubusercontent.com/90943803/171952180-e71b9d3b-0183-4a05-aced-6cf95ca6910d.png">




## otherthings I learned:
1. the state update using the updater provided by useState hook is also asynchronous

solution: If you want to perform an action on state update, you need to use the useEffect hook (https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately)

2. For GitHub, don't forget to `git pull` before `git push`


# TODOS
- [x]  allow multi select 
- [ ] change the display of text fields 
- [ ] Get human-readable labels from an options call piped into variable-selection dropdowns
- [ ] clean up my code and use more appropriate var names 😂
