import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UserLoginPage(){
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const styles = {
        h1DivStyle: {
            position: 'absolute',
            top: '32%',
            left: '40%',
            width: '250px',
            height: '200px',
            textAlign: 'center'
        },

        divStyle: {
            border: '2px solid', 
            position: 'absolute',
            top: '40%',
            left: '40%',
            width: '250px',
            height: '200px',
          },

          labelStyle: {
              marginLeft: '20px'
          },

          loginButtonStyle: {
              marginLeft: '52%'
          },

          guestButtonStyle: {
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            marginTop:'20px'
        },

         newUserButtonStyle: {
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            marginLeft: '50%'
        }
    }


    function updateUsername(event){
        setUsername(event.target.value)
    }

    function updatePassword(event){
        setPassword(event.target.value)
    }

    async function sendLoginInfo(){
        const loginInfo = {username, password}
        const response = await fetch("http://localhost:8080/login", {
            method:"POST", 
            body:JSON.stringify(loginInfo),
            headers:{
                "Content-Type":"application/json"
            }
        });

        const userInfo = await response.json()
        sessionStorage.setItem("user", JSON.stringify(userInfo)); // store our employee in session storage
        console.log(userInfo)
        navigate("/potlukks")
    }

     function navigateNewUserPage(){
        navigate("/register")
    }

    function navigatePotlukksPageAsGuest(){
        sessionStorage.setItem("user", JSON.stringify({uId:-1,username:'guest'}))
        navigate("/potlukks")
    }

    return(
        <>
        <div style={styles.h1DivStyle}>
        <h1>Login</h1>
        </div>
        <div style={styles.divStyle}>
            <p style = {{marginTop: '20%'}}>
                <label style={styles.labelStyle} htmlFor="username">Username</label>
                <input onChange={updateUsername} name="username" type="text"/>
            </p>
            <p>
                <label style={styles.labelStyle} htmlFor="password"> Password </label>
                <input onChange={updatePassword} name="password" type="password"/>
            </p>
            <button style={styles.loginButtonStyle} onClick={sendLoginInfo} >Login</button>
            <p>
                <button style={styles.guestButtonStyle}  onClick={navigatePotlukksPageAsGuest} >Guest</button>
                <button  style={styles.newUserButtonStyle} onClick={navigateNewUserPage} >New User</button>
            </p>
        </div>
        </>
    )
}