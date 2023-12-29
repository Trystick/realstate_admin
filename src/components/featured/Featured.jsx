import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect } from "react";
import { useState } from "react";

const Featured = () => {
  const [data, setData] = useState({amount: 0, percentage:0});
  const [amount, setAmount] = useState(0);
  const [lastWeek, setLastWeek] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);

  useEffect(() => {
    const target = 1000000;

    Promise.all([
        fetch('/order/today').then(response => response.json()),
        fetch('/order/last-week').then(response => response.json()),
        fetch('/order/last-month').then(response => response.json())
    ]).then(([todayData, lastWeekData, lastMonthData]) => {
        const amount = todayData.totalToday;
        let percentage = 0;
        if (amount !== 0) {
          percentage = (amount / target) * 100;
        }
        console.log(percentage);
        setAmount(amount);
        setData({
          amount: amount,
          percentage: percentage,
        });
        setLastWeek(lastWeekData.totalLastWeek);
        setLastMonth(lastMonthData.totalLastMonth);
    }).catch(error => console.error(error));
}, []);


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Tổng doanh thu</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
         <CircularProgressbar value={data.percentage} text={`${data.percentage}%`} strokeWidth={5} />
        </div>
        <p className="title">Doanh thu trong ngày</p>
        <p className="amount">{amount.toLocaleString()} VND</p>
        <p className="desc">
          Xử lý giao dịch trước đó. Các khoản thanh toán cuối cùng có thể không được bao gồm.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Mục tiêu tháng</div>
            <div className="itemResult negative">
              <div className="resultAmount">10,000K VND</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tuần trước</div>
            <div className="itemResult positive">
              <div className="resultAmount">{lastWeek.toLocaleString()} VND</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tháng trước</div>
            <div className="itemResult positive">
              <div className="resultAmount">{lastMonth.toLocaleString()} VND</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
