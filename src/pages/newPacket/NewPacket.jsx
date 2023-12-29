import "./newPacket.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import {packetInputs} from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const NewPacket = () => {
  const [info, setInfo] = useState({});
  const [jobCategoryId, setJobCategoryId] = useState(undefined);
  const navigate = useNavigate();
  const {data, loading, error} = useFetch("/packetType")
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
    
  };

  console.log(info);

  const handleSelectChange = (e) => {
    setJobCategoryId(e.target.value);
  };
  
  console.log(jobCategoryId);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newJob = {
        ...info,
        packetTypeId: jobCategoryId,
      };
       await axios.post(`/packet/${jobCategoryId}`, newJob);
      
       alert('Thêm thành công!');
      // Quay lại trang trước
      navigate(-1);
    } catch (err) {
      alert("Thêm thất bại !!! Có thể trùng dặp dữ liệu hoặc lỗi sever");
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
          <h1>Thêm gói</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {packetInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} 
                  id={input.id}
                  onChange={handleChange}
                  placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput">
                  <label>Chọn loại gói</label>
                  <select id="jobCategoryId" onChange={handleSelectChange}> 
                  <option> Danh mục gói </option>
                  {loading ? "loading" : data && data.map((jobCategory) => (
                    <option key={jobCategory._id} value={jobCategory._id}>{jobCategory.name}</option>
                  ))}
                 </select>
                </div>
              <button onClick={handleClick}>Gửi</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPacket;
