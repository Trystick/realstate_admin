import "./editPayment.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios"
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";

const EditPayment = () => {
  const ref = useRef(null);
  const [info, setInfo] = useState({})
  const {paymentId} = useParams();
  const {data, loading, error} = useFetch(`/payment/find/${paymentId}`);

  const [categories, setCategories] = useState([]);
  const [packetName, setPacketName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/order');
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
    const selectedOrder = categories.find(order => order._id === e.target.value);
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
 console.log(packetName);

  const handleClick = async e => {
    e.preventDefault();
    try {
     
      const updateProject = {
        ...info, 
        userId: userLocal._id,
        packetName: packetName,
      };

      await axios.put(`/payment/${paymentId}`, updateProject);

      alert('Sửa thành công!');
      // Quay lại trang trước
      navigate(-1);
    } catch (err) {
      alert("Sửa thất bại !!! Có thể trùng dặp dữ liệu hoặc lỗi sever");
      console.log(err);
    }
  }

  console.log(info);
  console.log(categories);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Sửa thanh toán</h1>
        </div>
        <div className="bottom">
          <div className="right">
          {ArrayData.map(item =>  (
            <form key={item._id} item={item}>
                  <div className="formInput">
                    <label>Tổng tiền</label>
                    <input onChange={handleChange} ref={ref} 
                    value={info.amount || item.amount}
                    id="amount"
                  />
                  </div>
                  <div className="formInput">
                    <label>Trạng thái</label>
                    <select onChange={handleChange} ref={ref} 
                    id="status">
                    <option value=''>Chọn</option>
                    <option value='Thành công'>Thành công</option>
                    <option value='Hủy'>Hủy</option>
                  </select>
                  </div>
                  <div className="formInput">
                  <label>Chọn đơn hàng</label>
                  <select id="orderId" onChange={handleChange}> 
                  <option value=''> Đơn hàng </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.customerName}
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

export default EditPayment;
