// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Link , Outlet} from 'react-router-dom';
import SingleSenator from "./components/SingleSenator";
import HomePageOutter from "./components/Home Page Folder/HomePageOutter"

import ProfilePage from "./components/Home Page Folder/ProfilePage";

function App() {

  return (
  <BrowserRouter> 
     {/* <div className="app">  */}
     <div>
     <Routes>
     <Route exact path="/home" element={<HomePageOutter />} />

     <Route exact path="/profilePage/:userId" index element={<ProfilePage />} />
     <Route exact path="/senatorProfile/:senatorId" index element={<SingleSenator />} />

     </Routes>



     </div> 

     <Outlet /> 


 </BrowserRouter>

  );
}

export default App;



