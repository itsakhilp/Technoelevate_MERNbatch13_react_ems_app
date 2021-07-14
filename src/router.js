import { Link,BrowserRouter as Router,Route , } from "react-router-dom"
import Home from "./Components/Home"
import Accounts from "./Components/Accounts"
import Register from "./Components/Register"
import Login from "./Login"


import { LoginConsumer } from "./Context/LoginContext"
export const routing=(
    
    <Router>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <Link className="navbar-brand" to="/">EMS</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">

{
  <LoginConsumer>
     {
       (loginInfo)=>{
                if(loginInfo.login){
                  return (
                    <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/register">Resgister <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/accounts">Accounts</Link>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link" onClick={ ()=>{
                      loginInfo.logout()
                      

                    }

                    }>Logout</p>
                  </li>
                  </>
                  )
                }
                else{
                     return (
                            <>
                            <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                           </li>
                            </>
                     )

                }
       }
       
     }
  </LoginConsumer>
}

  
      

     
      </ul>
      </div>
</nav>

<Route path="/" exact component={Home}/>
<Route path="/home" component={Home}/>
<Route path="/Accounts" component={Accounts}/>
<Route path="/Register" component={Register}/>
<Route path="/login" component={Login}/>
</Router>



)