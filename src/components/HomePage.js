
import { useNavigate } from "react-router-dom"


export default function HomePage(){

    const backgroundImage = require('../images/potluck.jpg');
    const navigate = useNavigate()

    const styles = {
        divStyle: {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover' ,
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100vw',
            height: '100vh'
        },
        navBoxStyle: {
            position: 'absolute',
            top: '55vh',
            left: '55vw',
            width: '250px',
            height: '200px',
        },
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
            <div style= {styles.navBoxStyle}>
                {viewPotlukksBtn}
                {loginBtn}
                {registerBtn}
            </div>
        )
    }
    return(
        <div style={styles.divStyle}>
            <NavigationBox />
        </div>
    )
}