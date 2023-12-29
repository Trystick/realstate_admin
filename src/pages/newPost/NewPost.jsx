import "./newPost.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { postInputs, projectInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const NewPost = () => {
  const [filed, setFiled] = useState("");
  const [info, setInfo] = useState({});
  const [postCategoryId, setPostCategoryId] = useState(undefined);
  const navigate = useNavigate();
  const {data, loading, error} = useFetch("/postCategory")
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
    
  };

  const handleSelectChange = (e) => {
    setPostCategoryId(e.target.value);
  };

  console.log(filed);
  
  const handleClick = async (e) => {
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
      const newPost = {
        ...info,
        postCategoryId: postCategoryId,
        photos: list,
      };
       await axios.post(`/post/${postCategoryId}`, newPost);
      
       alert('Thêm thành công!');
      // Quay lại trang trước
      navigate(-1);
    } catch (err) {
      alert("Thêm thất bại !!! Có thể trùng dặp dữ liệu hoặc lỗi sever");
      console.log(err);
    }
  }

  console.log(info);
  console.log(postCategoryId);
 
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm tin tức</h1>
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
            <form>
              <div className="formInput">
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
              {postInputs.map((input) => (
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
                  <label>Chọn loại tin tức</label>
                  <select id="postCategoryId" onChange={handleSelectChange}> 
                  <option> Danh mục tin tức </option>
                  {loading ? "loading" : data && data.map((postCategory) => (
                    <option key={postCategory._id} value={postCategory._id}>{postCategory.name}</option>
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

export default NewPost;
