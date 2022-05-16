import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function PotlukkHomePage(){

    const [potlukks, setPotlukks] = useState([])
    const [showEdit, setShowEdit] = useState({id:0, show:false})
    const [showAttend, setShowAttend] = useState({id:0, show:false})
    const navigate = useNavigate()

    const user = JSON.parse(sessionStorage.getItem('user'))

    async function getAllPotlukks() {
        const response = await fetch('http://localhost:8080/potlukks')
        const body = await response.json()
        setPotlukks(body)
    }

    useEffect(()=>{
        getAllPotlukks();
    },[]);

    function PotlukkRows() {
        return potlukks.map(p =>   
            <>
            <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.date}</td>
                <td><ButtonAction hostID={p.hostID} /></td>
            </tr>
            <tr id="action-row">
                <ActionRow id={p.hostID}/>
            </tr>
            </>
            )
    }

    function ActionRow(button) {
        if(showEdit.show && (showEdit.id === button.id)) {  
            return(<EditPotlukk />)
        } else if(showAttend.show && (showAttend.id === button.id)) {
            return(<AttendPotlukk />)
        }
    }

   //if logged in user id equals potlukk host_id, edit button
   //else attend button
    function ButtonAction(btn) {
        const action = (action, id) => {
            if(action) {
                setShowEdit({id:id, show:true})
            } else {
                setShowAttend({id:id, show:true})
            }
        }
        if(user.uId === btn.hostID) {
            return(<button onClick={() => action(true, btn.hostID)}>edit</button>)
        } else {
            return(<button onClick={() => action(false, btn.hostID)}>attend</button>)
        }
    }

    function EditPotlukk() {
        //const id = showEdit.id-1
        return(
        <div class="potlukk-popup" id="edit-potlukk-popup">
        <h5>edit potlukk</h5>
        <button onClick={() => setShowEdit(false)}>Cancel</button>
        </div>)
    }

    function AttendPotlukk() {
        let name = ""
        if(user.uId > 0) {
            name = user.username
        }
        return(<div class="potlukk-popup" id="attend-potlukk-popup">
        <h5>attend potlukk</h5>
        <button onClick={() => setShowAttend(false)}>Cancel</button>
        </div>)
    }

    function CreateNewPotlukk() {
        return (user.uID != -1) ? <button id="create-new-potlukk-btn" onClick={() => navigate('/potlukkcreation')}>create new potlukk</button> : null ;
    }

    return(
    <div class="container">

            <div id="potlukk-home">
        <h1>Upcoming Potlukks</h1>
        <table id="potlukk-view-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Date</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <PotlukkRows />
            </tbody>
        </table>
    </div>
    <CreateNewPotlukk />
    </div>)

}