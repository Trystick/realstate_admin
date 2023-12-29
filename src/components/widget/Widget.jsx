import "./widget.scss";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  const [data, setData] = useState(null);
  const [amount, setAmount] = useState(0);
 
  useEffect(() => {
    let url;
    switch (type) {
      case "user":
        url = '/users/users/users';
        break;
      case "order":
        url = '/order';
        break;
      case "earning":
        url = '/order';
        break;
      case "balance":
        url = ['/landSale', '/landLease'];
        break;
      default:
        break;
    }

    if (Array.isArray(url)) {
      Promise.all(url.map(u => fetch(u).then(res => res.json())))
        .then(dataArr => {
          // Assuming each API returns an array of items
          const total = dataArr.reduce((sum, curr) => sum + curr.length, 0);
          setAmount(total);
        })
        .catch(error => console.error(error));
    } else {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Assuming the API returns an array of items
          if (type === 'earning') {
            // Assuming each order has a 'status' and 'amount' property
            const successfulOrders = data.filter(order => order.status === 'Thành công');
            const total = successfulOrders.reduce((sum, order) => sum + order.amount, 0);
            setAmount(total);
          } else {
            setAmount(data.length);
          }
        })
        .catch(error => console.error(error));
    }

  switch (type) {
    case "user":
      setData({
        title: "Số khách hàng",
        isMoney: false,
        link: "Tất cả khách hàng",
        linkUrl : "/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      });
      break;
    case "order":
      setData({
        title: "Số đơn hàng",
        isMoney: false,
        link: "Tất cả đơn hàng",
        linkUrl : "/order",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      });
      break;
    case "earning":
      setData({
        title: "Số tiền",
        isMoney: true,
        link: "Xem số tiền",
        linkUrl : "/order",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      });
      break;
    case "balance":
      setData({
        title: "Tổng số bài đăng",
        isMoney: false,
        link: "Xem chi tiết",
        linkUrl : "/landSale",
        icon: (
          <ArrowCircleUpIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      });
      break;
    default:
      break;
  }
}, [type]);

  if (!data) {
    return <div>Loading...</div>;
  }

return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {amount.toLocaleString()} {data.isMoney && "VND"} 
        </span>
        <a href={data.linkUrl} className="link">{data.link}</a>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};


export default Widget;
