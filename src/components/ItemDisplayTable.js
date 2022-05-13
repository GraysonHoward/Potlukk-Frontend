import { useState } from "react"


export default function ItemDisplayTable(id){

    cosnt [items, setItems] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem(""))

    //Get data from backend
    async function getItemsForPotlukk(){
        const response = await fetch(`localhost:8080/potlukks/${id}/items`);
        const body = await response.json();
        setItems(body)
    }

    useEffect(()=>{
        getItemsForPotlukk();
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