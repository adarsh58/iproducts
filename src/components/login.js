import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const Submit = async () => {
    const {email, password } = credentials;
    if (email && password) {

      const response = await fetch('http://iproducts-two.vercel.app/api/auth/LoginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user);
        navigate("/home");
      }
      else {
        alert('Invalid credentials')
      }



    }
    else {
      alert('Please fill all the fields')
    }

  }

  return (
    <div className='container mt-5'>
      <h2 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Login to the Iproducts</h2>
      <div className="mb-3 row">
        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-3">
          <input type="text" className="form-control" id="inputEmail" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-3">
          <input type="password" className="form-control" id="inputPassword" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-3 offset-sm-2">
          <button type="submit" className="btn btn-primary" onClick={() => Submit()}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
