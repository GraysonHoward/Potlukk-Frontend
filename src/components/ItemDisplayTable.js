import { useState, useEffect } from "react";
import Item from "./Item";

export default function ItemDisplayTable(props){

    const pid = props.props.value
    const hostId = props.props.host

    const [items, setItems] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const [showButton, setShowButton] = useState(true);

    // States for adding an item and signing up for one
    const [item, setItem] = useState("");
    const [status, setStatus] = useState("");

    //Get data from backend
    async function getItemsForPotlukk(){
        const response = await fetch(`http://localhost:8080/potlukks/${pid}/items`);
        const body = await response.json();
        setItems(body)
    }

    useEffect(()=>{
        getItemsForPotlukk();
    },[]);

    // Set state values
    function updateItemsetItem(event){
        setItem(event.target.value);
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
        const itemObj = {id:0, name: item, supplier:"", status: status, potlukkID: pid}

        await fetch("http://localhost:8080/items",{
            body:JSON.stringify(itemObj),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }     
        });
        items.push(itemObj)
        // Reset button
        setShowButton(true)
    }


    function addItemRows(){
        // Map items to table rows to display
        const itemRows = items.map(item =>
            <tr key={item.id}>
                    <Item props = {{item: item, user: userInfo, host: hostId }}/>
            </tr>)

        return itemRows
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
                {addItemRows()}
            </tbody>
        </table>

        {
        (showButton) ? <button onClick={() => setShowButton(false)}>Add Item</button> : addItemInput() 
        }
        
    </>)
}