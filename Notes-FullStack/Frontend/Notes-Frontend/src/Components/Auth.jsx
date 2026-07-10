import  { useState } from "react";
import loginPage from "../assets/BGimage.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"


const bgImage = {
  backgroundImage: `url(${loginPage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
   
function Auth({ login, Account, next, route ,handleLogin ,page}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantID,setTenanatId] = useState("");
  const navigate = useNavigate(); 
  const [error,setError] =useState("");

  const FetchData = async (e) => {
  e.preventDefault();
  if(!email.trim(" ") || !password.trim(" ")){
    setError("All the fields must be filled!");
    return;
  }
  try{ 
     const reponse = await axios.post(`http://localhost:3001/auth/${route}`, {
       email: email,
      password: password,
      tenantId:tenantID
      })
    
      const token = "Bearer "+reponse.data.token;
      const user = reponse.data.user;
      handleLogin(token,user);
      navigate("/Notes");
 
  }catch(err){
    console.log("req",err.message);
     alert("Sigin Failed! Try again later");
  }
  }


  return (
    <main
      style={bgImage}
      className="h-screen w-full rounded-t-xl mt-2 ml-2 mr-2 flex items-center justify-center"
    > 
    {(login == "SignUp" || login=== "Login") ? (<div className="absolute top-2 right-7 pt-7 text-white text-xl cursor-pointer "><Link to="/TenantSignup">{page}</Link></div> ) : <div className="absolute top-2 right-7 pt-7 text-white text-xl cursor-pointer "><Link to="/SignUp">{page}</Link></div>}
      <div className=" w-[500px] flex justify-center h-[600px] border-4 border-white rounded-3xl bg-white">
        <div className="text-green-700 absolute top-44">
          <h1 className="text-5xl font-bold cursor-pointer">{login}</h1>
         
        </div>
         <div className="text-red-500 text-xl mt-4 absolute top-56">{error}</div>
        <form
          onSubmit={FetchData}
          className="mt-32 text-green-700 mr-12 w-full pl-7"
        >
          <div className="text-xl p-3">
            <h2 className="mb-3 mr-2 cursor-pointer">Email</h2>
            <input
              type="text"
              placeholder="Enter Email"
              className="p-2 border-2 border-green-700 rounded-lg w-full "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="text-xl p-3">
            <h2 className="mb-3 mr-2 cursor-pointer">Password</h2>
            <input
              type="password"
              placeholder="Enter Password"
              className="p-2 border-2 border-green-700 rounded-lg w-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {login =="SignUp" && (
             <div className="text-xl p-3">
            <h2 className="mb-3 mr-2 cursor-pointer">Tenant Id</h2>
            <input
              type="text"
              placeholder="Enter"
              className="p-2 border-2 border-green-700 rounded-lg w-full"
              value={tenantID}
              onChange={(e) => {
                setTenanatId(e.target.value);
              }}
            />
          </div> )}
          <button
            type="Submit"
            className=" cursor-pointer text-3xl text-white border-3 border-white bg-green-700 p-3 px-4 w-full rounded-xl  mt-6 "
          >
            {login}
          </button>
          <h3 className="ml-24 w-full mt-4">
            {Account}
            <Link to={next}>{next}</Link>{" "}
          </h3>
        </form>
      </div>
    </main>
  );
}

export default Auth;

