import { useState, useEffect } from "react"


export default function ItemDisplayTable(id){

    const [items, setItems] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem(""));
    const [potlukk, setPotlukk] = useState({});

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

    
    const itemRows = items.map(item =>
        <tr key={item.id}>
            <td>{item.name}</td>
            <td><nameOrButton/></td>
            <td>{item.status}</td>
            <td><deleteItem/></td>
        </tr>)

    function nameOrButton(supplier){
        let display;
        if(supplier){
            display = supplier;
        }else{
            display = <button>Sign Up!</button>
        }
        return display
    }
    function deleteItem(){
        let deleteButton;
        if(potlukk.id===userInfo.uid){
            deleteButton = <button>Delete</button>
        }
        else{
            deleteButton = ""
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
    </>)
}