import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar(){

const navigate=useNavigate();


return(
    <div>
        <Link to="/home"> Home </Link>
        <Link to="/achievements"> Achievements </Link>
        <Link to="/profile"> Profile </Link>
    </div>
)

}

export default Navbar