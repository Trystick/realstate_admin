import "./newOrder.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { orderInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const NewOrder = () => {
  const [info, setInfo] = useState({});
  const [categoryId, setCategoryId] = useState(undefined);
  const [categoryName, setCategoryName] = useState(undefined);
  const [selectedPacketAmount, setSelectedPacketAmount] = useState('');
  const navigate = useNavigate();
  const {data, loading, error} = useFetch("/packet")
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
    
  };

  const handleSelectChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCategoryId(e.target.value);
    setCategoryName(selectedOption.text);

   
      const selectedPacketId = e.target.value;
      // Tìm gói đã chọn trong dữ liệu của bạn
      const selectedPacket = data.find(packet => packet._id === selectedPacketId);
      // Cập nhật giá trị amount tương ứng
      if (selectedPacket && selectedPacket.price) {
        setSelectedPacketAmount(selectedPacket.price);
      }
  };

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
  
 console.log(info);
 console.log(categoryId);
 console.log(categoryName);
 console.log(selectedPacketAmount);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newProject = {
        ...info,
        userId: userLocal._id,
        packetId: categoryId,
        packetName: categoryName,
        amount: selectedPacketAmount,
      };
       await axios.post(`/order`, newProject);
      
       alert('Thêm thành công!');
      // Quay lại trang trước
      navigate(-1);
    } catch (err) {
      alert("Thêm thất bại !!! Có thể trùng dặp dữ liệu hoặc lỗi sever");
      console.log(err);
    }
  }


 
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm đơn hàng</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {orderInputs.map((input) => (
                <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                  {input.type === "select" ? (
                  <select id={input.id} onChange={handleChange}>
                  {input.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                  ))}
                  </select>
                  ) : (
                  <input onChange={handleChange} type={input.type} 
                  placeholder={input.placeholder} 
                  id={input.id}/>
                  )}
              </div>
              ))}
              <div className="formInput">
                <label>Tổng tiền</label>
                <input id="amount" value={selectedPacketAmount} readOnly />
              </div>
              <div className="formInput">
                  <label>Chọn loại gói</label>
                  <select id="categoryId" onChange={handleSelectChange}> 
                  <option value=''> Danh mục gói </option>
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

export default NewOrder;
