import "./login.css"

import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

   
    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]:e.target.value}))
    }

    const [adminRoles, setAdminRoles] = useState([]);

    useEffect(() => {
        const fetchAdminRoles = async () => {
            try {
                const response = await axios.get('/role');
                setAdminRoles(response.data.map(role => role.name));
            } catch (error) {
                console.error('Failed to fetch admin roles:', error);
            }
        };

        fetchAdminRoles();
    }, []); // Chú ý: mảng rỗng này đảm bảo rằng effect chỉ chạy một lần sau khi component được render lần đầu tiên.

    console.log(adminRoles);

    const handleClick = async e => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      alert("Vui lòng nhập tên đăng nhập và mật khẩu!");
      return;
    }

    dispatch({type:"LOGIN_START"})
    try {
        const res = await axios.post("/auth/login", credentials)
        if (res.data.error) {
            if (res.data.error === 'Invalid username') {
                alert('Tên đăng nhập không hợp lệ!');
            } else if (res.data.error === 'Invalid password') {
                alert('Mật khẩu không hợp lệ!');
            } else if (res.data.error === 'User does not exist') {
                alert('Tài khoản không tồn tại!');
            }
            dispatch({type:"LOGIN_FAILURE", payload: {message: res.data.error}})
        } else {
            if (adminRoles.includes(res.data.role.name)) {
                dispatch({ type: "LOGIN_SUCCESS", payload: { ...res.data.details, role: res.data.role.name } });
                // Thêm thông báo chào mừng
                alert(`Chào mừng bạn đã đăng nhập với vai trò ${res.data.role.name}!`);
                navigate('/home')
            } else {
                dispatch({type:"LOGIN_FAILURE", payload: {message:"You are not allowed !!"}})
            }
        }
        
    } catch (err) {
        dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
    }
}
  
  return (
    <div className='login'>
        <div className="loginContainer">
            <h1 className="adminTitle">Trang quản trị GoldenLand</h1>
            <input type="text" placeholder='Tên tài khoản' id='username' className="loginInput" onChange={handleChange} />
            <input type="password" placeholder='Mật khẩu' id='password' className="loginInput" onChange={handleChange} />
            <button disabled={loading} onClick={handleClick} className="loginButton">Đăng nhập</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login
