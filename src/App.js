import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainDrawer from './Components/MainDrawer';
import DrawerForInteractions from './Components/DrawerForInteractions';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="" Component={MainDrawer} />

        <Route path="/candidate/name/:name/surname/:surname" Component={MainDrawer} />
        <Route path="/interactions/candidateId/:candidateId" Component={DrawerForInteractions} />

 
      </Routes>
    </BrowserRouter>
    
    
    </>
  );
}

export default App;
