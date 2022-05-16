import { useState, useEffect } from "react";

export default function ItemDisplayTable(id){

    const [items, setItems] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const [potlukk, setPotlukk] = useState({});
    const [showButton, setShowButton] = useState(true);
    const [showSignUp, setShowSignUp] = useState(true);
    // States for adding an item and signing up for one
    const [itemID, setItemID] = useState("");
    const [item, setItem] = useState("");
    const [supplier, setSupplier] = useState("");
    const [status, setStatus] = useState("");

    //Get data from backend
    async function getItemsForPotlukk(){
        const response = await fetch(`http://localhost:8080/potlukks/${id.value}/items`);
        const body = await response.json();
        setItems(body)
    }
    async function getPotlukk(){
        const response = await fetch(`http://localhost:8080/potlukks/${id.value}`);
        const body = await response.json();
        setPotlukk(body)
    }
    useEffect(()=>{
        getItemsForPotlukk();
        getPotlukk();
    },[]);

    // Set state values
    function updateItemsetItem(event){
        setItem(event.target.value);
    }
    function updateSupplier(event){
        setSupplier(event.target.value);
    }

    function addItemInput(){
        return <fieldset>
                <legend>Add a new item:</legend>
                    <label htmlFor="item">Item </label>
                    <input onChange={updateItemsetItem} type="text" value={item}/><br/>
                    <label htmlFor="WANTED">Wanted </label>
                    <input type="radio" onClick={() => setStatus("WANTED")}/> <br/>
                    <label htmlFor="NEEDED">Needed </label>
                    <input type="radio" onClick={() => setStatus("NEEDED")}/> <br/>
                    <button onClick={addItem}>Add</button>
            </fieldset>
    }
    async function addItem(){
        const itemObj = {id:0, name:item, supplier:"", status:status, potlukkID:id.value}

        await fetch("http://localhost:8080/items",{
            body:JSON.stringify(itemObj),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }     
        });
        
        //dont do this
        getItemsForPotlukk()
        // Reset button
        setShowButton(true)
    }

    function signUpInput(item_id){
        if(userInfo.uId !== -1){
            setSupplier(userInfo.username);
            signUp(item_id);
        }
        else{
            return <>
                <input onChange={updateSupplier} type="text" value={supplier} placeholder="Enter Name"/>
                <button onClick={() => signUp(item_id)}>Sign Up!</button>
            </>
        }
    }

    async function signUp(item_id){
        const itemObj = {id:item_id, supplier:supplier, status:"FULFILLED", potlukkID:id.value}
        console.log(JSON.stringify(itemObj));
        await fetch(`http://localhost:8080/items/${itemID}`,{
            body:JSON.stringify(itemObj),
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }
        });
        // Still bad don't do
        getItemsForPotlukk()
    }

    // Map items to table rows to display
    const itemRows = items.map(item =>

        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{nameOrButton(item.supplier, item.id)}</td>
            <td>{item.status}</td>
            <td><DeleteItem/></td>
        </tr>)

    function nameOrButton(supplier, id){ // decide if we display a username or a sign up option
        let display;
        if(supplier){
            display = <>{supplier}</>;
        }else{
            display = <>{(showSignUp) ? <button id={id} onClick={() => setShowSignUp(false)}>Sign Up!</button> : signUpInput(id)}</>
        }
        return display
    }
    function DeleteItem(){ // Give option to delete item iff current user is potlukk owner
        let deleteButton;
        if(userInfo.uId === -1){
            if(potlukk.hostID === userInfo.uId){
                deleteButton = <button>Delete</button>
            }
            else{
                deleteButton = ""
            }
        }

        return deleteButton
    }

    return(<>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Supplier</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {itemRows}
            </tbody>
        </table>

        {
        (showButton) ? <button onClick={() => setShowButton(false)}>Add Item</button> : addItemInput() 
        }
        
    </>)
}