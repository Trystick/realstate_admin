import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import CancelReasonChart from "../../components/cancelreasonchart/CancelReasonChart";
import DownSide from "../../components/downside/DownSide";
import PostWeek from "../../components/postweek/PostWeek";
import JobAndAdvise from "../../components/jobandadvise/JobAndAdvise";


const Home = () => {
 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listInteract">Hoạt động kinh doanh</div>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Giao dịch mới nhất</div>
          <Table />
        </div>
        <div className="cancelReasonContainer">
          <div className="listTitleCancel">Lý do hủy gói</div>
          <CancelReasonChart />
        </div>
        <div className="listInteract">Tương tác khách hàng</div>
        <div className="widgets">
          <DownSide type="like" />
          <DownSide type="favorite" />
          <DownSide type="comment" />
        </div>
        <div className="cancelReasonContainer">
          <div className="listTitleCancel">Bất động sản trong tháng</div>
          <PostWeek/>
        </div>
        <div className="listInteract">Công việc và tư vấn</div>
          <div className="widgets">
            <JobAndAdvise type="job" />
            <JobAndAdvise type="jobApply" />
            <JobAndAdvise type="advise" />
          </div>
      </div>
    </div>
  );
};

export default Home;
