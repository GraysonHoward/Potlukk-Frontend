import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ItemDisplayTable from "./ItemDisplayTable"

function convertEpochToDate(epoch) {
    const date = new Date(epoch*1000)
    return date.toLocaleDateString()
}

function convertEpochToTime(epoch) {
    const date = new Date(epoch*1000)
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
}

export default function PotlukkHomePage(){

    const [potlukks, setPotlukks] = useState([])
    const [showEdit, setShowEdit] = useState({id:0, show:false})
    const [showAttend, setShowAttend] = useState({id:0, show:false})
    const navigate = useNavigate()

    let user = JSON.parse(sessionStorage.getItem('user'))

    async function getAllPotlukks() {
        const response = await fetch('http://localhost:8080/potlukks')
        const body = await response.json()
        setPotlukks(body)
    }

    useEffect(()=>{
        getAllPotlukks();
    },[]);

    function PotlukkRows() {
        let btnIndex = 0
        return potlukks.map(p =>   
            <>
            <tr key={p.id}>
                <td>{p.name}</td>
                <td><div>
                    <p id="date">{convertEpochToDate(p.epochTime)}</p>
                    <p id="time">{convertEpochToTime(p.epochTime)}</p>
                    </div></td>
                <td><ButtonAction hostID={p.hostID} /></td>
            </tr>
            <tr id="action-row">
                <ActionRow id={p.hostID} index={btnIndex++}/>
            </tr>
            </>
            )
    }

    function ActionRow(button) {
        if(showEdit.show && (showEdit.id === button.id)) {  
            return(<EditPotlukk index={button.index}/>)
        } else if(showAttend.show && (showAttend.id === button.id)) {
            return(<AttendPotlukk index={button.index}/>)
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
            return(<button className="action-btn" onClick={() => action(true, btn.hostID)}>edit</button>)
        } else {
            return(<button className="action-btn" onClick={() => action(false, btn.hostID)}>attend</button>)
        }
    }

    function EditPotlukk(btn) {
        const btnIndex = btn.index
        return(
        <div className="potlukk-popup" id="edit-potlukk-popup">
        <ItemDisplayTable props={{value: potlukks[btnIndex].id, host: potlukks[btnIndex].hostID}} />
        <button onClick={() => setShowEdit(false)}>Cancel</button>
        </div>)
    }

    function AttendPotlukk(btn) {
        const btnIndex = btn.index
        return(<td className="potlukk-popup" id="attend-potlukk-popup">
        <ItemDisplayTable props={{value: potlukks[btnIndex].id, host: potlukks[btnIndex].hostID}}/>
        <button onClick={() => setShowAttend(false)}>Cancel</button>
        </td>)
    }

    function CreateNewPotlukk() {
        return (user.uId === -1) ? null : <button id="create-new-potlukk-btn" onClick={() => navigate('/potlukkcreation')}>create new potlukk</button> ;
    }

    return(
    <div className="container">

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