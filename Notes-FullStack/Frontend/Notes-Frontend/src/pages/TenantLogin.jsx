import React from 'react'
import Auth from '../Components/auth.jsx';

function TenantLogin({handleLogin}) {
  return (
    <div>
       <Auth login={"Tenant-Login"} Account={"Do not have an account?"} next={"/TenantSignup"} route ={"TenantLogin"} handleLogin={handleLogin} page="User" />
    </div>
  );
}

export default TenantLogin
