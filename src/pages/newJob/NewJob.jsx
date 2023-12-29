import "./newJob.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { jobInputs} from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const NewJob = () => {

  const [info, setInfo] = useState({});
  const [jobCategoryId, setJobCategoryId] = useState(undefined);
  const navigate = useNavigate();
  const {data, loading, error} = useFetch("/jobCategory")
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
    
  };

  const handleSelectChange = (e) => {
    setJobCategoryId(e.target.value);
  };
  console.log(jobCategoryId);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newJob = {
        ...info,
        jobCategoryId: jobCategoryId,
      };
       await axios.post(`/job/${jobCategoryId}`, newJob);
      
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
          <h1>Thêm công việc</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
             
              {jobInputs.map((input) => (
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
                  <label>Chọn loại công việc</label>
                  <select id="jobCategoryId" onChange={handleSelectChange}> 
                  <option> Danh mục công việc </option>
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

export default NewJob;
