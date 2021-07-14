import React , {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import LoginContext from './Context/LoginContext'
import  './Login.css'
import { Button } from 'react-bootstrap';


export default function Login() {
    const context = useContext(LoginContext);
    const history =useHistory();

    const login =(e)=>{
        e.preventDefault()
        console.log(context);
        history.push("/home");
        context.changeLogin(true)
     
        
    }

    const Styles={
       
        width:"120px",
        border:"2px solid grey",
        margin:"auto",
        marginTop:"200px",
        marginLeft:"600px"


    }


    return (
        
                <>
               
                <Button variant="success" style={Styles} id="login" onClick={login}>Login</Button>
                </>
    )
}
