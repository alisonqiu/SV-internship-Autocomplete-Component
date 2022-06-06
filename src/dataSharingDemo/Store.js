import React , {createContext, useState} from "react";

const AppContext = createContext();
const { Provider } = AppContext;

export function AppProvider(props){
    const[list, setList] = useState([
        {   
            id:"2022-06-03",
            aggregate_fileds: "voyage_slaves_numbers__imp_total_num_slaves_embarked",
            filter_params: "sum",
        },{
            id:"2022-06-04",
            aggregate_fileds: "voyage_slaves_numbers__imp_total_num_slaves_disembarked",
            filter_params:"average"
        },
    ]);
    return <Provider value = {{list, setList}}>{props.children}</Provider>;
}
export default AppContext;