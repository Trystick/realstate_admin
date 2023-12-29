import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({})
  const navigate = useNavigate();
  const [jobCategoryId, setJobCategoryId] = useState(undefined);
  const [selectedRole, setSelectedRole] = useState({});
  const {data, loading, error} = useFetch("/packet")


  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedName = data.find((jobCategory) => jobCategory._id === selectedId).name;
    setSelectedRole({ id: selectedId, name: selectedName });
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
        type: selectedRole.name,
        img: url,
      };

      await axios.post("/auth/register/", newUser);

      alert('Thêm thành công!');
      // Quay lại trang trước
      navigate(-1);
    } catch (err) {
      alert("Thêm thất bại !!! Có thể trùng dặp dữ liệu hoặc lỗi sever");
      console.log(err);
    }
  }

  console.log(info);
  console.log(selectedRole.name);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
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
            <form>
              <div className="formInput">
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

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} 
                  placeholder={input.placeholder} 
                  id={input.id}/>
                </div>
              ))}
              <div className="formInput">
                  <label>Chọn loại khách hàng</label>
                  <select id="jobCategoryId" onChange={handleSelectChange}> 
                  <option> Loại </option>
                  {loading ? "loading" : data && data.map((jobCategory) => (
                    <option key={jobCategory._id} value={jobCategory._id}>{jobCategory.name}</option>
                  ))}
                 </select>
                </div>
              <button onClick={handleClick} >Gửi</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
