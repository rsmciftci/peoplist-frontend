import { useState } from "react";


function Candidate(props){
    const [operationState, setOperationState] = useState("Change Status");
    const handleChange = (e) => {
        setOperationState(e.target.value);
      };
    return (
        <div class="min-w-[250px]  max-w-[250px] m-2 py-8 px-8 max-w-sm  bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 center">
        <div class="text-center space-y-2 sm:text-left">
        <div class="space-y-0.5">
        <p class="text-lg text-black font-semibold">
                {props.name + " " + props.surname}                
        </p>
        <p class="text-slate-500 font-medium">
                {props.phoneNumber}         
        </p>
        <p class="text-slate-500 font-medium">
                {props.email}         
        </p>
        <p class="text-slate-500 font-medium">
                {props.status}
        </p>
        </div>

        {/*<EditCandidate 
                id={props.id}
                name={props.name} 
                surname={props.surname} 
                email={props.email} 
                phoneNumber={props.phoneNumber} 
                status={props.status}
    />*/}
        </div>
        </div>
        

    );
}

export default Candidate;