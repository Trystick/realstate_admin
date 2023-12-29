import "./editAdvise.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const EditAdvise = () => {
  // const [file, setFile] = useState("");
  const ref = useRef(null);
  const [info, setInfo] = useState({})
  const {adviseId} = useParams();
  const {data, loading, error} = useFetch(`/advise/${adviseId}`);
 
  const navigate = useNavigate();
  
  const [username, setUsername] = useState(); 

  const ArrayData = [data];
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      const newUser = {
        ...info,
      };

      await axios.put(`/advise/${adviseId}`, newUser);

      alert('Sửa thành công!');
      // Quay lại trang trước
      navigate(-1);
    } catch (err) {
      alert("Sửa thất bại !!! Có thể trùng dặp dữ liệu hoặc lỗi sever");
      console.log(err);
    }
  }

  console.log(info);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Sửa tư vấn</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
          {ArrayData.map(item =>  (
            <form key={item._id} item={item}>
             
              {/* <div className="formInput" >
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}
                <div className="formInput">
                    <label>Họ tên</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.fullname || item.fullname}
                    id="fullname"
                  />
                  </div>
                  <div className="formInput">
                    <label>Email</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.email || item.email}
                    id="email"
                  />
                  </div>
                  <div className="formInput">
                    <label>Số điện thoại</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.phone || item.phone}
                    id="phone"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mô tả</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.desc || item.desc}
                    id="desc"
                  />
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

export default EditAdvise;
