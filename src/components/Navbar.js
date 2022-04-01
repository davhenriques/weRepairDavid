import React from "react";
import {Link} from 'react-router-dom';



const NavBar = () =>{
    return(
    <nav id="main-nav">
        <div id="nav-content">
           <Link to="/"><span className="brand">weRepair </span></Link> 
           {/* <Link to="/repair"><span >repair</span></Link>  */}
        </div>
    </nav>
    )
}


export default NavBar;