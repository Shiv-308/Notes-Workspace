import Auth from "../Components/auth.jsx"

function Login({handleLogin}) {
return (
  <div>
    <Auth  login={"Login"} Account={"Already have an account?"} next={"/SignUp"} route ={"login"} handleLogin={handleLogin} page="Admin" />
  </div>
)
}

export default Login
