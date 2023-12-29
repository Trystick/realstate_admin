import "./editLandLease.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const EditLandLease = () => {
  const ref = useRef(null);
  const [filed, setFiled] = useState("");
  const [info, setInfo] = useState({})
  const {landLeaseId} = useParams();
  const {data, loading, error} = useFetch(`/landLease/find/${landLeaseId}`);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/landLeaseCategory');
        setCategories(response.data);
      } catch (error) {
        // Xử lý lỗi
      }
    };
    fetchCategories();
  }, []);

  const [userLocal, setUserLocal] = useState([]);
  // Lấy thông tin người dùng từ API khi trang tải
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson);
    if (user && user._id) {
        const userId = user._id;
        axios.get(`/users/${userId}`, {withCredentials: true})
        .then(response => {
            setUserLocal(response.data);
            localStorage.setItem('userId', response.data._id);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
 }, []);

  const navigate = useNavigate();

  const ArrayData = [data];
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  };
  console.log(filed);
  const handleClick = async e => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(filed).map( async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dw1rf0o5f/image/upload", data);
        const {url} = uploadRes.data;
       
        return url;
    }));
    
      const updateProject = {
        ...info, 
        userId: userLocal._id,
        photos: list,
      };

      await axios.put(`/landLease/${landLeaseId}`, updateProject);

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
          <h1>Sửa nhà thuê</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                 filed
                  ? URL.createObjectURL(filed[0])
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
                  multiple
                  onChange={(e) => setFiled(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
                <div className="formInput">
                    <label>Tên</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.name || item.name}
                    id="name"
                  />
                   <div className="formInput">
                    <label>Địa chỉ</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.location || item.location}
                    id="location"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mô tả</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.desc || item.desc}
                    id="desc"
                  />
                  </div>
                  </div>
                  <div className="formInput">
                    <label>Diện tích</label>
                    <input onChange={handleChange} ref={ref} type='number'
                    value={info.area || item.area}
                    id="area"
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
                    <textarea onChange={handleChange}ref={ref}  
                    value={info.title || item.title}
                    id="title"
                  />
                  </div>
                  <div className="formInput">
                    <label>Tên liên hệ</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.nameContact || item.nameContact}
                    id="nameContact"
                  />
                  </div>
                  <div className="formInput">
                    <label>Số điện thoại liên hệ</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.phoneContact || item.phoneContact}
                    id="phoneContact"
                  />
                  </div>
                  <div className="formInput">
                    <label>Email liên hệ</label>
                    <input onChange={handleChange} ref={ref} type='email'
                    value={info.emailContact || item.emailContact}
                    id="emailContact"
                    />
                    </div>
                  <div className="formInput">
                    <label>Số phòng</label>
                    <input onChange={handleChange} ref={ref} type='number'
                    value={info.room || item.room}
                    id="room"
                    />
                    </div>
                   <div className="formInput">
                    <label>Số nhà vệ sinh</label>
                    <input onChange={handleChange} ref={ref} type='number'
                    value={info.toilet || item.toilet}
                    id="toilet"
                  />
                  </div>
                  <div className="formInput">
                  <label>Chọn danh mục nhà bán</label>
                  <select id="categoryLandLeaseId" onChange={handleChange}> 
                  <option> Danh mục </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                 </select>
                </div>
              <button onClick={handleClick}>Gửi</button>
            </form>
             )) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLandLease;
