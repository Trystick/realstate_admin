import './profile.css'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [file, setFile] = useState("");
    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    // Lấy thông tin người dùng từ API khi trang tải
    useEffect(() => {
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const userId = user._id;
        axios.get(`/users/${userId}`, {withCredentials: true})
        .then(response => {
            setForm(response.data);
            localStorage.setItem('userId', response.data._id);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, []);



    const checkUsernameExists = async (username) => {
        try {
            const res = await axios.get(`http://localhost:8800/api/checkexist?username=${username}`);
            return res.data.exists;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    
    const handleClick = async e => {
        e.preventDefault();
    
        // Kiểm tra tên đăng nhập
        if (form.username.length <= 5) {
            alert('Tên đăng nhập phải dài hơn 5 ký tự!');
            return;
        }
    
        // Kiểm tra tên đăng nhập đã tồn tại
        const usernameExists = await checkUsernameExists(form.username);
        if (usernameExists) {
            alert('Tên đăng nhập đã tồn tại!');
            return;
        }
    
        // Kiểm tra số điện thoại
        if (!/^\d{10,}$/.test(form.phoneNumber)) {
            alert('Số điện thoại phải có ít nhất 10 số!');
            return;
        }
    
    
        // Kiểm tra email
        if (!/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(form.email)) {
            alert('Email không hợp lệ!');
            return;
        }
    
    
        // Kiểm tra mật khẩu
        if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/.test(form.password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ viết hoa, 1 ký tự đặc biệt và 1 số!');
            return;
        }

        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const userId = user._id;

        axios.put(`/users/nopass/${userId}`, form, {withCredentials: true})
        .then( response => {
            setForm(response.data);
            console.log(response.data);
            alert('Thông tin đã được cập nhật thành công!');
            localStorage.setItem('form', JSON.stringify(form));
            localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
            window.location.href = '/'; // Chuyển hướng người dùng đến trang đăng nhập
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
        console.log(localStorage.getItem('form'));
     // Cập nhật trạng thái khi người dùng nhập vào form
        const handleChange = async (e) => {
            // Cập nhật trạng thái ngay lập tức khi sự kiện thay đổi xảy ra
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        
            const data = new FormData()
            data.append("file", file)
            data.append("upload_preset", "upload")
            try {
                const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dw1rf0o5f/image/upload", data);
                const {url} = uploadRes.data;
                // Cập nhật URL hình ảnh sau khi yêu cầu POST thành công
                setForm(prevForm => ({
                    ...prevForm,
                    img: url
                }));
            } catch {
                // Xử lý lỗi tại đây
            }
        }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleClick(e);
    }
  return (
    <div className='profile'>
      <Sidebar />
      <div className="profileContainer">
        <Navbar/>
        <div className="top">
          <h1>Hồ sơ</h1>
          <form onSubmit={handleSubmit} className='formProfile'>
                    <img
                    src={
                        file
                        ? URL.createObjectURL(file)
                        : form.img
                    }
                    alt="" className='pictureavatar'
                    />
                        <label htmlFor="file" className='chooseavatar'>
                         Chọn ảnh đại diện
                        </label>
                        <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                    <label className='labelprofile'>
                        Tên đăng nhập
                        <input className='inpprofile' type="text" name="username" id='username' value={form.username} onChange={handleChange}/>
                    </label>
                    <label className='labelprofile'>
                        Số điện thoại
                        <input className='inpprofile' type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange}/>
                    </label>
                    <label className='labelprofile'>
                        Email
                        <input className='inpprofile' type="text" name="email" value={form.email} onChange={handleChange}/>
                    </label>
                    <label className='labelprofile'>
                        Mật khẩu
                        <div className="passwordContainer">
                            <input className='inpprofile' type='password' name="password" id='password'value={form.password} onChange={handleChange} disabled/>
                        </div>
                    </label>
                    <input className='inpbtn' type="submit" value="Cập nhật hồ sơ" />
                </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
