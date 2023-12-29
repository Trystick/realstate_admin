import "./editJobApply.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const EditJobApply = () => {
  const [file, setFile] = useState("");
  const ref = useRef(null);
  const [info, setInfo] = useState({})
  const {jobApplyId} = useParams();
  const {data, loading, error} = useFetch(`/jobApply/${jobApplyId}`);
 
  const navigate = useNavigate();
  
  const [username, setUsername] = useState(); 

  const ArrayData = [data];
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file)
    data.append("upload_preset", "upload")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dw1rf0o5f/auto/upload/", data);
      const {url} = uploadRes.data;

      const newJobApply = {
        ...info,
        file: url,
      };

      await axios.put(`/jobApply/${jobApplyId}`, newJobApply);

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
          <h1>Sửa ứng tuyển</h1>
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
                  Hồ sơ: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx"
                />
              </div>
                <div className="formInput">
                    <label>Tên công việc</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.namejob || item.namejob}
                    id="namejob"
                  />
                  </div>
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
                  
                  
              <button onClick={handleClick} >Gửi</button>
            </form>
             )) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobApply;
