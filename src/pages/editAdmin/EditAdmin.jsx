import "./editAdmin.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const EditAdmin = () => {
  const ref = useRef(null);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({})
  const {adminId} = useParams();
  const {data, loading, error} = useFetch(`/users/${adminId}`);


  const navigate = useNavigate();
  
  const ArrayData = [data];
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = async e => {
    e.preventDefault();
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dw1rf0o5f/image/upload", data);

      const {url} = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.put(`/users/${adminId}`, newUser);

      alert('Sửa thành công!');
      // Quay lại trang trước
      navigate(-1);
    } catch (err) {
      alert("Sửa thất bại !!! Có thể trùng dặp dữ liệu hoặc lỗi sever");
      console.log(err);
    }
  }

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/role');
        setRoles(response.data);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);

  console.log(info);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Sửa quản trị viên</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
          {ArrayData.map(item =>  (
            <form key={item._id} item={item}>
              <div className="formInput" >
                <label htmlFor="file">
                  Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
                <div className="formInput">
                    <label>Tên quản trị viên</label>
                    <input  ref={ref}
                    onChange={handleChange}  
                    value={info.username || item.username}
                    id="username"
                  />
                  </div>
                  <div className="formInput">
                    <label>Email</label>
                    <input onChange={handleChange}  
                    ref={ref}
                    value={info.email || item.email}
                    id="email"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mật khẩu</label>
                    <input onChange={handleChange}  
                    ref={ref}
                    value={info.password || item.password}
                    id="password"
                  />
                  </div>
                  <div className="formInput">
                  <label>Quyền quản trị</label>
                  <select onChange={handleChange}  
                      ref={ref}
                      value={info.role || item.role}
                      id="role">
                      <option value=''>Chọn</option>
                      {roles.map(role => (
                        <option key={role._id} value={role.name}>{role.name}</option>
                      ))}
                  </select>
                  </div>
              <button onClick={handleClick} >Gửi</button>
            </form>
             )) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
