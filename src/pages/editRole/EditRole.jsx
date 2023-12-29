import "./editRole.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const EditRole = () => {
  const ref = useRef(null);
  const [info, setInfo] = useState({})
  const {roleId} = useParams();
  const {data, loading, error} = useFetch(`/role/${roleId}`);
 
  const navigate = useNavigate();

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

      await axios.put(`/role/${roleId}`, newUser);

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
          <h1>Sửa phân quyền</h1>
        </div>
        <div className="bottom">
          <div className="right">
          {ArrayData.map(item =>  (
            <form key={item._id} item={item}>
                <div className="formInput">
                    <label>Tên</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.name || item.name}
                    id="name"
                  />
                  </div>
                  <div className="formInput">
                    <label>Chức năng</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.module || item.module}
                    id="type"
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

export default EditRole;
