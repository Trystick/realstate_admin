import "./newPayment.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { orderInputs, paymentInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const NewPayment = () => {
  const [info, setInfo] = useState({});
  const [categoryId, setCategoryId] = useState(undefined);
  const navigate = useNavigate();
  const [packetName, setPacketName] = useState("");
  const {data, loading, error} = useFetch("/order")
  
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
    
  };

  const handleSelectChange = (e) => {
    setCategoryId(e.target.value);
    const selectedOrder = data.find(order => order._id === e.target.value);
    if (selectedOrder) {
        setPacketName(selectedOrder.packetName);
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
 console.log(packetName);


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newProject = {
        ...info,
        userId: userLocal._id,
        orderId: categoryId,
        packetName: packetName,
      };
       await axios.post(`/payment`, newProject);
      
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
          <h1>Thêm thanh toán</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {paymentInputs.map((input) => (
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
                  <label>Chọn đơn hàng</label>
                  <select id="categoryId" onChange={handleSelectChange}> 
                  <option value=''> Đơn hàng </option>
                  {loading ? "loading" : data && data.map((category) => (
                    <option key={category._id} value={category._id}>{category.customerName}</option>
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

export default NewPayment;
