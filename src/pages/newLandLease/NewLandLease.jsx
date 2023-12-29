import "./newLandLease.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { landLeaseInputs, landSaleInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const NewLandLease = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [categoryLandLeaseId, setLandLeaseCategoryId] = useState(undefined);
  const navigate = useNavigate();
  const {data, loading, error} = useFetch("/landLeaseCategory")
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
    
  };

  const handleSelectChange = (e) => {
    setLandLeaseCategoryId(e.target.value);
  };

  console.log(files);

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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map( async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dw1rf0o5f/image/upload", data);
        const {url} = uploadRes.data;
        return url;
    }));
      const newProject = {
        ...info,
        categoryLandLeaseId: categoryLandLeaseId,
        userId: userLocal._id,
        photos: list,
      };
       await axios.post(`/landLease/${categoryLandLeaseId}`, newProject);
      
       alert('Thêm thành công!');
      // Quay lại trang trước
      navigate(-1);
    } catch (err) {
      alert("Thêm thất bại !!! Có thể trùng dặp dữ liệu hoặc lỗi sever");
      console.log(err);
    }
  }

  console.log(info);
  console.log(categoryLandLeaseId);
 
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm nhà thuê</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {landLeaseInputs.map((input) => (
                <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                {input.type === "textarea" ? ( // Kiểm tra nếu type là "textarea"
                  <textarea
                    id={input.id}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                  />
                ) : (
                  <input
                    type={input.type}
                    id={input.id}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                  />
                )}
              </div>
              ))}
              <div className="formInput">
                  <label>Chọn loại nhà thuê</label>
                  <select id="categoryLandLeaseId" onChange={handleSelectChange}> 
                  <option> Danh mục nhà thuê </option>
                  {loading ? "loading" : data && data.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
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

export default NewLandLease;
