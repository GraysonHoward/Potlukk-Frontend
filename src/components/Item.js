import { useState } from "react";

export default function Item(props){
    const [showSignUpBtn, setShowSignUpBtn] = useState(true);
    const [supplier, setSupplier] = useState("");

    let item = props.props.item;
    let user = props.props.user;
    let hostId = props.props.host;

    async function signUp(){
        console.log(JSON.stringify(item));
        await fetch(`http://localhost:8080/items/${item.id}`,{
            body:JSON.stringify(item),
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }
        });
    }

    async function removeItem(){
        await fetch(`http://localhost:8080/items/${item.id}`,{
            body:JSON.stringify(item),
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }     
        });
    }

    function updateSupplier(event){
        setSupplier(event.target.value);
    }

    function signUpInput(){
            return <>
                <input onChange={updateSupplier} type="text" value={supplier} placeholder="Enter Name"/>
                <button onClick={() => signUp(item.id)}>Sign Up!</button>
            </>
    }

    function unAssignSupplier(){
        setSupplier(null);
        setShowSignUpBtn(true);
        signUp();
    }

    function showSignUp(){ // decide if we display a username or a sign up option
        let display;
        let supplier = item.supplier
        if(supplier){
            display = <>{supplier} <button onClick={unAssignSupplier} 
                                                                style = {{color: 'red', border:'none', backgroundColor: 'transparent'}}>X</button></>;
        }else{
            display = (showSignUpBtn) ? <button id={item.id} onClick={() => setShowSignUpBtn(false)}>Sign Up!</button> : signUpInput()
        }
        return display
    }

    return(
        <>
                <td>{item.name}</td>
                <td>{showSignUp() }</td>
                <td>{item.status}</td>
                <td>{(user.uId === hostId) ? <button  onClick={removeItem}>Delete</button> : ""}</td>
        </>
    )
}