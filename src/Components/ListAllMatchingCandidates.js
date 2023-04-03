import axios from "axios";
import React, { useEffect, useState } from "react";
import Candidate from "./Candidate";


function ListAllMathingCandidates(props){
    

    const [candidates, setCandidates] = useState([]);

    const getRequrestURL = () => {
        const url = "http://localhost:8080/candidate/name/"+ props.name + "/surname/" + props.surname;
        return url;
    };   
    
    useEffect(() => {
        axios.get(getRequrestURL())
        .then( res => setCandidates(res.data)).catch(err => console.log(err))
      }, []);
    
      if (!candidates) return null;

      
    return(
        <>            
            <div>
            {
            candidates.map((candidate) => {
            return(
              <Candidate 
              id={candidate.id}
              name={candidate.name} 
              surname={candidate.surname}
              phoneNumber={candidate.phoneNumber}
              email={candidate.email}
              status={candidate.status}              
              />
            )
          })}

            </div>



        
        </>     
    );
}

export default ListAllMathingCandidates;