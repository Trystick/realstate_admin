import "./editProject.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const EditProject = () => {
  const ref = useRef(null);
  const [filed, setFiled] = useState("");
  const [info, setInfo] = useState({})
  const {projectId} = useParams();
  const {data, loading, error} = useFetch(`/project/find/${projectId}`);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/category');
        setCategories(response.data);
      } catch (error) {
        // Xử lý lỗi
      }
    };
    fetchCategories();
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
        photos: list,
      };

      await axios.put(`/project/${projectId}`, updateProject);

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
          <h1>Sửa dự án</h1>
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
                    <label>Mô tả địa chỉ</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descLocation || item.descLocation}
                    id="descLocation"
                  />
                  </div>
                  </div>
                  <div className="formInput">
                    <label>Nhà đầu tư</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.investor || item.investor}
                    id="investor"
                  />
                  </div>
                  <div className="formInput">
                    <label>Nhà thầu</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.construction || item.construction}
                    id="construction"
                  />
                  </div>
                  <div className="formInput">
                    <label>Diện tích đất</label>
                    <input onChange={handleChange}ref={ref}  
                    value={info.land_area || item.land_area}
                    id="land_area"
                  />
                  </div>
                  <div className="formInput">
                    <label>Quy mô</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.scale || item.scale}
                    id="scale"
                  />
                  </div>
                  <div className="formInput">
                    <label>Tiện ích</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.utiliti || item.utiliti}
                    id="utiliti"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mô tả nội tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiIn || item.descUtilitiIn}
                    id="descUtilitiIn"
                    />
                    </div>
                  <div className="formInput">
                    <label>Mô tả nội tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiInSe || item.descUtilitiInSe}
                    id="descUtilitiInSe"
                    />
                    </div>
                   <div className="formInput">
                    <label>Mô tả nội tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiInTh || item.descUtilitiInTh}
                    id="descUtilitiInTh"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mô tả nội tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiInFo || item.descUtilitiInFo}
                    id="descUtilitiInFo"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mô tả nội tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiInFi || item.descUtilitiInFi}
                    id="descUtilitiInFi"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mô tả ngoại tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiOut || item.descUtilitiOut}
                    id="descUtilitiOut"
                    />
                    </div>
                   <div className="formInput">
                    <label>Mô tả ngoại tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiOutSe || item.descUtilitiOutSe}
                    id="descUtilitiOutSe"
                    />
                    </div>
                   <div className="formInput">
                    <label>Mô tả ngoại tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiOutTh || item.descUtilitiOutTh}
                    id="descUtilitiOutTh"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mô tả ngoại tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiOutFo || item.descUtilitiOutFo}
                    id="descUtilitiOutFo"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mô tả ngoại tiện ích</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.descUtilitiOutFi || item.descUtilitiOutFi}
                    id="descUtilitiOutFi"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mặt bằng</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.ground || item.ground}
                    id="ground"
                    />
                    </div>
                   <div className="formInput">
                    <label>Mặt bằng</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.groundSe || item.groundSe}
                    id="groundSe"
                    />
                    </div>
                   <div className="formInput">
                    <label>Mặt bằng</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.groundTh || item.groundTh}
                    id="groundTh"
                  />
                  </div>
                  <div className="formInput">
                    <label>Mô tả danh mục dự án</label>
                    <textarea onChange={handleChange} ref={ref} 
                    value={info.categoryDesc || item.categoryDesc}
                    id="categoryDesc"
                  />
                  </div>
                  <div className="formInput">
                    <label>Pháp lý</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.juridical || item.juridical}
                    id="juridical"
                  />
                  </div>
                  <div className="formInput">
                    <label>Giá</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.price || item.price}
                    id="price"
                  />
                  </div>
                  <div className="formInput">
                    <label>Thời gian bắt đầu</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.time_start || item.time_start}
                    id="time_start"
                  />
                  </div>
                  <div className="formInput">
                  <label>Chọn danh mục dự án</label>
                  <select id="categoryId" onChange={handleChange}> 
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

export default EditProject;
