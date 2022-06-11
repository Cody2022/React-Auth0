import logo from './logo.svg';
import './App.css';
import NavBar from './components/nav-bar';
import LoginButton from './components/login-button';
import LogoutButton from './components/logout-button';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div>
      <LoginButton />
      <LogoutButton/>
      <p>The users information is below!</p>
      <UserProfile/>

    </div>
  ) 
}

export default App;
