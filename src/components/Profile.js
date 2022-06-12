import React, { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';
import EditRole from './EditRole';

const Profile = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
   const [isNewcomer, setIsNewcomer]=useState();
   const [isVolunteer, setIsVolunteer]=useState();
   const [isAdmin, setIsAdmin]=useState();

  let email=user.email;
  console.log(typeof user)
  console.log("user.email:", user.email)

    useEffect(()=>{
        const fetchUserRoles=async(email)=>{
            let response=await fetch (`/get/${email}`)
            let userRoles=await response.json();
            setIsAdmin(userRoles.isAdmin);
            setIsNewcomer(userRoles.isNewcomer);
            setIsVolunteer(userRoles.isVolunteer);
        };
        fetchUserRoles(email)
    },[email])

  if(isLoading){
    return (<div>isLoading...</div>)
  }
  return (
       <div>
            <h1>Profile</h1>
            <img src={user.picture} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p className="col-12 text-light bg-dark p-4">{JSON.stringify(user, null, 2)}</p>
            <EditRole />
            {isAdmin &&<p>isAdmin: true </p>}
        </div>
  )
};

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loading />,
  });;