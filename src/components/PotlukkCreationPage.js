import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PotlukkCreationPage(){

    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState(0);
    const navigate = useNavigate();

    //update state values
    function updateName(event){
        setName(event.target.value)
    }
    function updateDate(event){
        setDate(Date.parse(event.target.value))
    }
    function updateLocation(event){
        setLocation(event.target.value)
    }

    async function createNewPotlukk(){
        const newPotlukk = {id:0,name:name,epochTime:date,hostID:userInfo.uId ,location:location}
        console.log(JSON.stringify(newPotlukk))
        const response = await fetch("http://localhost:8080/potlukks",{
            body:JSON.stringify(newPotlukk),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }     
        });

        if(response.status === 200){
            navigate("/potlukks") // Take person to the potlukk page.
        }else{
            alert("FAILED TO CREATE A Potlukk"); //
        }
    }

    function createNewPotlukkInput(){
        return(<div class="container">
            <h1>Create New Potlukk</h1>
            <div id="potlukk-create">
            <fieldset>
                <legend>New Potlukk</legend>
                    <label htmlFor="Name">Name: </label>
                    <input onChange={updateName} name="Name" type="text" placeholder="Super fun Potlukk"/>
                    <br/>
                    <label htmlFor="Date">Date: </label>
                    <input onChange={updateDate} name="date" type="datetime-local"/>
                    <br/>
                    <label htmlFor="Location">Location: </label>
                    <input onChange={updateLocation} name="Location" type="text" placeholder="Pondside Park"/>
                    <br/>
                    <button onClick={createNewPotlukk}>Submit</button>
                    <button onClick={() => navigate('/potlukks')}>Cancel</button>
                    <br/>
            </fieldset>
            </div>

        
        </div>)
    }

    function GoLogin(){
        return(<>
            <h1>Error!</h1>
            <h3>Only logged in users can create new potlukks!</h3>
            <Link to="/login"><button>
                Have an account? Login.
                </button>
            </Link>
            <Link to="/register"><button>
                Need an account?
                </button>
            </Link>
        </>)
    }

    return((userInfo.uId === -1)? <GoLogin/> : createNewPotlukkInput())
}