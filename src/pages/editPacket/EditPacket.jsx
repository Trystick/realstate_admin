import "./editPacket.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const EditPacket = () => {
  const ref = useRef(null);
  // const [filed, setFiled] = useState("");
  const [info, setInfo] = useState({})
  const {packetId} = useParams();
  const {data, loading, error} = useFetch(`/packet/find/${packetId}`);
  const [jobCategories, setJobCategories] = useState([]);

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await axios.get('/packetType');
        setJobCategories(response.data);
      } catch (error) {
        // Xử lý lỗi
      }
    };
    fetchJobCategories();
  }, []);

  const navigate = useNavigate();

  const ArrayData = [data];
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
    
      const updateJob = {
        ...info, 
      };

      await axios.put(`/packet/${packetId}`, updateJob);

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
          <h1>Sửa gói</h1>
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
                   <div className="formInput">
                    <label>Thời gian kết thúc</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.timeend || item.timeend}
                    id="timeend"
                  />
                  </div>
                  <div className="formInput">
                    <label>Chức năng</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.function || item.function}
                    id="function"
                  />
                  </div>
                  </div>
                  <div className="formInput">
                    <label>Mô tả</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.desc || item.desc}
                    id="desc"
                  />
                  </div>
                  <div className="formInput">
                    <label>Giá</label>
                    <input onChange={handleChange} ref={ref} type='number'
                    value={info.price || item.price}
                    id="price"
                  />
                  </div>
                  <div className="formInput">
                    <label>Tiêu đề</label>
                    <input onChange={handleChange}ref={ref}  
                    value={info.title || item.title}
                    id="title"
                  />
                  </div>
                  <div className="formInput">
                  <label>Chọn loại gói</label>
                  <select id="packetTypeId" onChange={handleChange}> 
                  <option>Loại gói</option>
                  {jobCategories.map((jobCategory) => (
                    <option key={jobCategory._id} value={jobCategory._id}>
                      {jobCategory.name}
                    </option>
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

export default EditPacket;
