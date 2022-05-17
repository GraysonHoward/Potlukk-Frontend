import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function UserRegistrationPage(){


    // states for values in the input field
    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    //update state values
    function updateUser(event){
        setUser(event.target.value)
    }

    function updatePassword(event){
        setPassword(event.target.value)
    }

    async function createUser(){
        const user = {id:0,username:username,password:password}
        console.log(user)
        const response = await fetch("http://localhost:8080/users",{
            body:JSON.stringify(user),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }     
        });

        if(response.status === 200){
            const userInfo = await response.json();
            alert(`New user registered with id of ${userInfo.id}`)
            // Added session storage for registered user and they are then taken to the potlukks page
            sessionStorage.setItem("user", JSON.stringify(userInfo)); // store user in session storage
            console.log(userInfo)
            navigate("/potlukks") // Take person to the potlukk page.
        }else{
            alert("FAILED TO CREATE A USER")
        }
    }

    return(
        <div className="container">
            <div id="registration">
        <fieldset>
            <legend>User Registration</legend>
            <label htmlFor="username">Username: </label>
            <input onChange={updateUser} name="username" type="text" placeholder="Provide a username."/>
            <br/>
            <label htmlFor="password">Password: </label>
            <input onChange={updatePassword} name="password" type="text" placeholder="Provide a password."/>
            <br/>
            <button onClick={createUser}>Register as a User</button>
            <br/>
        </fieldset>
        <Link to="/login"><button>
              Already registered? Login.
            </button>
        </Link>
            </div>

        </div>)
}