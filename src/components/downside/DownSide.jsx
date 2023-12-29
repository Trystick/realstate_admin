import './downside.scss'
import { useEffect, useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const DownSide = ({ type }) => {
    const [data, setData] = useState(null);
    const [amount, setAmount] = useState(0);
   
    useEffect(() => {
      let url;
      switch (type) {
        case "like":
          url = '/like';
          break;
        case "favorite":
          url = '/favorite';
          break;
        case "comment":
          url = '/comment';
          break;
        default:
          break;
      }
  
        if (Array.isArray(url)) {
            Promise.all(url.map(u => fetch(u).then(res => res.json())))
            .then(dataArr => {
                const total = dataArr.reduce((sum, curr) => sum + curr.length, 0);
                setAmount(total);
            })
            .catch(error => console.error(error));
        } else {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setAmount(data.length);
                })
                .catch(error => console.error(error));
        }
    
    switch (type) {
      case "like":
        setData({
          title: "Lượt thích",
          icon: (
            <ThumbUpIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        });
        break;
      case "favorite":
        setData({
          title: "Lượt yêu thích",
          icon: (
            <FavoriteIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        });
        break;
      case "comment":
        setData({
          title: "Lượt bình luận",
          icon: (
            <CommentIcon
              className="icon"
              style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
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
            {amount}
          </span>
        </div>
        <div className="right">
          {data.icon}
        </div>
      </div>
    );
  };
  

export default DownSide
