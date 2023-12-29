import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const Edit = () => {
  const ref = useRef(null);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({})
  const {userId} = useParams();
  const {data, loading, error} = useFetch(`/users/${userId}`);
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

      await axios.put(`/users/${userId}`, newUser);

      alert('Sửa thành công!');
      // Quay lại trang trước
      navigate(-1);
    } catch (err) {
      alert("Sửa thất bại !!! Có thể trùng dặp dữ liệu hoặc lỗi sever");
      console.log(err);
    }
  }

  console.log(info);

  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/packet');
        setTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Sửa khách hàng</h1>
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
                    <label>Tên khách hàng</label>
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
                  <label>Loại</label>
                  <select onChange={handleChange}  
                      ref={ref}
                      value={info.type || item.type}
                      id="type">
                      <option value=''>Chọn</option>
                      {types.map(type => (
                        <option key={type._id} value={type.name}>{type.name}</option>
                      ))}
                  </select>
                  </div>
                  
              <button onClick={handleClick} >Send</button>
            </form>
             )) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
