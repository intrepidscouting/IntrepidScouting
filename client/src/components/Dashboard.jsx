import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Datazone from './Datazone'
import Settings from './Settings'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCog , faHome} from '@fortawesome/free-solid-svg-icons';

import './css/Dashboard.css'
import './css/responsive/Dashboard.css'
import AddForm from './AddForm'

const Dashboard = () => {

  const location = useLocation();
  const [loginId, setLoginId] = useState(); 
  const [scoutName, setScoutName] = useState(); 
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState('A');

  useEffect(() => {
    // const location = useLocation();
    setLoginId(localStorage.getItem('_id'));
    setScoutName(localStorage.getItem('name')); // Access the state passed via navigate

    const verifyToken = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/'); // Redirect to homepage if no token
            return;
        }
        try {
            navigate("/dashboard");
        } catch (error) {
            localStorage.removeItem('jwtToken'); // Clear invalid token
            navigate('/'); // Redirect to homepage
        }
    };

      verifyToken();
  }, []);

  useEffect(() => {
    let timer;
    const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            localStorage.removeItem('jwtToken'); // Clear token
            localStorage.removeItem("_id");  // Remove _id token
            localStorage.removeItem("name");  // Remove name token
            window.location.href = '/'; // Redirect to homepage
        }, 5 * 60 * 1000); // 5 minutes inactivity
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    resetTimer(); // Initialize timer

    return () => {
        clearTimeout(timer);
        window.removeEventListener('mousemove', resetTimer);
        window.removeEventListener('keypress', resetTimer);
    };
}, []);

  // Function to handle switching of components
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  // Function to render the selected form component
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'A':
        return <Datazone key="A" scoutName={scoutName}/>; // Provide unique key to force re-mount
      case 'B':
        return <AddForm key="B" scoutName={scoutName}/>;
      case 'C':
        return <Settings key="C" scoutId={loginId}/>;
      default:
        return <Datazone key="A" scoutName={scoutName}/>;
    }
  }
  const handleLogout = () => {
    
    localStorage.removeItem("jwtToken");  // Remove JWT token
    localStorage.removeItem("_id");  // Remove _id token
    localStorage.removeItem("name");  // Remove name token
    navigate("/");  // Redirect back to login page
  };



  return (
    <div className="holder">

      {/* <Header/> */}

      <div className="dash holder">
        <div className='sidebar'>
          <div className="logo">
              <img src="/Intrepid.png" alt="" />
              <h4>Intrepid Scouting</h4>
          </div>
          <ul>
              <li onClick={() => handleComponentChange(`A`)}>
                  <div className="dashIcon"><FontAwesomeIcon icon={faHome} /></div>
                  <span>Dashboard</span>
              </li>
              <li onClick={() => handleComponentChange(`B`)}>
                  <div className="dashIcon"><FontAwesomeIcon icon={faAdd} /></div>
                  <span>Add Player</span>
              </li>
              <li onClick={() => handleComponentChange(`C`)}>
                  <div className="dashIcon"><FontAwesomeIcon icon={faCog}/></div>
                  <span>Change Password</span>
              </li>
          </ul>
          <div className="signout">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        
        {/* Conditionally rendered component */}
        <div className="component-container">
          {renderComponent()}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
