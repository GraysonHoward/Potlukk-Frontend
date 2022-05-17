import { useNavigate } from "react-router-dom"

export default function HomePage(){

    const backgroundImage = require('../images/potluck.jpg');
    const navigate = useNavigate()

    const styles = {
        buttonStyle: {
            fontSize: '32px',
            width: "100%",
            borderRadius: '12px',
            backgroundColor: 'black',
            color: 'white'
        }
    }

    function navigatePotlukksPageAsGuest(){
        sessionStorage.setItem("user", JSON.stringify({uId:-1,username:'guest'}))
        navigate("/potlukks")
    }
    function login(){
        navigate("/login")
    }
    function signup(){
        navigate("/register")
    }

    function NavigationBox(){
        const viewPotlukksBtn = <p><button onClick={navigatePotlukksPageAsGuest} style={styles.buttonStyle}>View Potlucks</button></p>
        const loginBtn = <p><button onClick={login} style={styles.buttonStyle}>Login</button></p>

        const registerBtn = <p><button onClick={signup} style={styles.buttonStyle}>Sign Up</button></p>
        return (
            <div id="nav-box">
                {viewPotlukksBtn}
                {loginBtn}
                {registerBtn}
            </div>
        )
    }
    return(
        <div className="container">
            <NavigationBox />
        </div>
    )
}