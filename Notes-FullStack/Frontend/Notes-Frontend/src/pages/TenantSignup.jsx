import React from 'react'
import Auth from '../Components/auth.jsx';

function TenantSignup({handleLogin}) {
   return (
    <div>
       <Auth login={"Tenant-SignUp"} Account={"Already have an account?"} next={"/TenantLogin"} route ={"TenantSignup"} handleLogin={handleLogin} page="User" />
    </div>
  );
}

export default TenantSignup
