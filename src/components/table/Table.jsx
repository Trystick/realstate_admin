import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const List = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('/order/newest')
      .then(response => response.json())
      .then(async orders => {
        const updatedOrders = await Promise.all(orders.map(async order => {
          const userResponse = await fetch(`/users/${order.userId}`);
          const user = await userResponse.json();
          return {
            ...order,
            customer: user.username,
            imgcustomer: user.img,
          };
        }));
        setRows(updatedOrders);
      })
      .catch(error => console.error(error));
  }, []);

  //hàm chuyển đổi ngày tháng
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Mã đơn hàng</TableCell>
            <TableCell className="tableCell">Gói thanh toán</TableCell>
            <TableCell className="tableCell">Khách hàng</TableCell>
            <TableCell className="tableCell">Ngày</TableCell>
            <TableCell className="tableCell">Số tiền</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                  {row.packetName}
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.imgcustomer} alt="" className="image" />
                      {row.customer}
                  </div>
                </TableCell>
              <TableCell className="tableCell">{formatDate(row.createdAt)}</TableCell>
              <TableCell className="tableCell">{row.amount.toLocaleString()}</TableCell>
              <TableCell className="tableCell">
              <span className={`status ${row.status.toLowerCase().replace(' ', '_')}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
