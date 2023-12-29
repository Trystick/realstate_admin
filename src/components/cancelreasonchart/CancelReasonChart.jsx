import './cancelReasonChart.scss'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useEffect, useState } from 'react';


const CancelReasonChart = () => {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('/order/cancelReason')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);
    
  return (
    <div>
        <BarChart width={1000} height={400} data={data}>
            <XAxis dataKey="name" />
            <YAxis tickCount={4}/>
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="count" fill="#8884d8" barSize={30} />
        </BarChart>
    </div>
  )
}

export default CancelReasonChart
