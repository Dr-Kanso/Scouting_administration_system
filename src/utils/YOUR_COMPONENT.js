// At the top of your file, add this import if it's not already there:
import { useNavigate } from 'react-router-dom';

// Inside your component function, add this line:
const navigate = useNavigate();

// Then find your logo element and update it:
<img 
  src={logo} 
  alt="14th Willesden Logo" 
  className="logo" 
  onClick={() => navigate('/dashboard')}
/>
