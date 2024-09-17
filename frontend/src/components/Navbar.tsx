import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar(){

const navigate=useNavigate();

const handleHomeClick = () => {
    navigate("/home")
}

return(
    <div>
        <p>test</p>
        <Link to="/home">Home</Link>
    </div>
)

}

export default Navbar