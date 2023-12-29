import "./newPacketType.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios"
import {packetTypeInputs} from "../../formSource";
import {useNavigate} from 'react-router-dom'

const NewPacketType = () => {
  const [info, setInfo] = useState({})
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      const newCategory = {
        ...info
      };

      await axios.post("/packetType/", newCategory);

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
              {packetTypeInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} 
                  placeholder={input.placeholder} 
                  id={input.id}/>
                </div>
              ))}
              <button onClick={handleClick}>Gửi</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPacketType;
