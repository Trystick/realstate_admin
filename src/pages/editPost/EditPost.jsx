import "./editPost.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const EditPost = () => {
  const ref = useRef(null);
  const [filed, setFiled] = useState("");
  const [info, setInfo] = useState({})
  const {postId} = useParams();
  const {data, loading, error} = useFetch(`/post/find/${postId}`);

  const [postCategories, setPostCategories] = useState([]);

  useEffect(() => {
    const fetchPostCategories = async () => {
      try {
        const response = await axios.get('/postCategory');
        setPostCategories(response.data);
      } catch (error) {
        // Xử lý lỗi
      }
    };
    fetchPostCategories();
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
    
      const updatePost = {
        ...info, 
        photos: list,
      };

      await axios.put(`/post/${postId}`, updatePost);

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
          <h1>Sửa tin tức</h1>
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
                    <input onChange={handleChange}ref={ref}
                    id="name"
                    value={info.name || item.name}
                  />
                  </div>
                  <div className="formInput">
                    <label>Nội dung</label>
                    <textarea onChange={handleChange} ref={ref} 
                    id="descone"
                    value={info.descone || item.descone}
                  />
                  </div>
                  <div className="formInput">
                    <label>Nội dung</label>
                    <textarea onChange={handleChange} ref={ref} 
                    id="desctwo"
                    value={info.desctwo || item.desctwo}
                  />
                  </div>
                  <div className="formInput">
                    <label>Nội dung</label>
                    <textarea onChange={handleChange} ref={ref} 
                    id="descthree"
                    value={info.descthree || item.descthree}
                  />
                  </div>
                  <div className="formInput">
                    <label>Nội dung</label>
                    <textarea onChange={handleChange} ref={ref} 
                    id="descfour"
                    value={info.descfour || item.descfour}
                  />
                  </div>
                  <div className="formInput">
                    <label>Nội dung</label>
                    <textarea onChange={handleChange}ref={ref}  
                    id="descfive"
                    value={info.descfive || item.descfive}
                  />
                  </div>
                  <div className="formInput">
                    <label>Tiều đề</label>
                    <input onChange={handleChange} ref={ref} 
                    id="title"
                    value={info.title || item.title}
                  />
                  </div>
                  <div className="formInput">
                  <label>Chọn danh mục tin tức</label>
                  <select id="postCategoryId" onChange={handleChange}> 
                  <option> Danh mục tin tức </option>
                  {postCategories.map((postCategory) => (
                    <option key={postCategory._id} value={postCategory._id}>
                      {postCategory.name}
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

export default EditPost;
