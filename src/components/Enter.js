import React, { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';
import EditRole from './EditRole';
import LoginButton from './login-button';
import LogoutButton from './logout-button';
import Profile from './Profile';
import { Newcomer } from './Newcomer';
import { Volunteer } from './Volunteer';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Admin } from './Admin';


const Enter = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isNewcomer, setIsNewcomer] = useState(null);
  const [isVolunteer, setIsVolunteer] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const [role, setRole] = useState();
  const handleSelectRole = (event) => {
    setRole(event.target.value);
  };

  let email = user.email;
  console.log(typeof user);
  console.log("user.email:", user.email);

  useEffect(() => {
    const fetchUserRoles = async (email) => {
      let response = await fetch(`/get/${email}`);
      let userRoles = await response.json();
      setIsAdmin(userRoles.isAdmin);
      setIsNewcomer(userRoles.isNewcomer);
      setIsVolunteer(userRoles.isVolunteer);
    };
    fetchUserRoles(email);
  }, []);

  if (isLoading) {
    return <div>isLoading...</div>;
  }
  /*New user: direct to profile edit page*/
  if (
    isAdmin === undefined &&
    isNewcomer === undefined &&
    isAdmin === undefined
  ) {
    return <Profile />;
  }
  /*User is Admin: direct to admin page*/
  if (isAdmin) {
    return (
      <div>
        <LoginButton />
        <LogoutButton />
        <Admin />
      </div>
    );
  }
  
  /*User is newcomer: direct to newcomer page*/
  if (isNewcomer && !isVolunteer) {
    return (
      <div>
        <LoginButton />
        <LogoutButton />
        <Newcomer />
      </div>
    );
  }
  /*User is volunteer: direct to volunteer page*/
  if (!isNewcomer && isVolunteer) {
    return (
      <div>
        <LoginButton />
        <LogoutButton />
        <Volunteer />
      </div>
    );
  }

  /*User has two roles, i.e., volunteer and newcomer: Select role first then direct to the corresponding page*/
  if (isNewcomer && isVolunteer) {
    return (
      <div>
        {!role && (
          <FormControl>
            <FormLabel id="controlled-radio-buttons-group">
              Select your role please!
            </FormLabel>
            <RadioGroup
              aria-labelledby="controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={role}
              onChange={handleSelectRole}
            >
              <FormControlLabel
                value="newcomer"
                control={<Radio />}
                label="Newcomer"
              />
              <FormControlLabel
                value="volunteer"
                control={<Radio />}
                label="Volunteer"
              />
            </RadioGroup>
          </FormControl>
        )}
        <LoginButton />
        <LogoutButton />

        {role && role === "newcomer" && <Newcomer />}
        {role && role === "volunteer" && <Volunteer />}
      </div>
    );
  }
};

export default withAuthenticationRequired(Enter, {
    onRedirecting: () => <Loading />,
  });;