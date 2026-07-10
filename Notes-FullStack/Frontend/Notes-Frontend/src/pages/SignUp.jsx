  import Auth from "../Components/auth.jsx";

  function SignUp({handleLogin}) {
    return (
      <div>
        <Auth login={"SignUp"} Account={"Do not have an Account?"} next={"/Login"} route={"Signup"} handleLogin={handleLogin} page="Admin" />
      </div>
    );
  }

  export default SignUp;
