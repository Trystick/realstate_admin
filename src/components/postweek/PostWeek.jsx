import './postweek.scss'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';
import { useEffect, useState } from 'react';

const PostWeek = () => {
    const [data, setData] = useState([]);
    const [month, setMonth] = useState((new Date()).getMonth() + 1);
    const [year, setYear] = useState((new Date()).getFullYear());

    useEffect(() => {
        fetch(`landSale/weekly-land-sale-lease/${year}/${month}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, [month, year]);

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const renderCustomBarLabel = (dataKey) => (props) => {
        const { x, y, width, height, value} = props;
    
        if (value === 0) {
            return null;
        }
    
        const rotationAngle = -90;
        return (
            <text
                x={x + width / 2}
                y={y + height / 2}
                fill="#ffffff"
                textAnchor="middle"
                alignmentBaseline="middle"
                transform={`rotate(${rotationAngle}, ${x + width / 2}, ${y + height / 2})`}
                style={{ fontSize: '8px' }}
            >
                {`${dataKey}: ${value}`}
            </text>
        );
    };
    
    return (
        <div>
            <div className="selectpostweek">
                <div className="select-container">
                    <select onChange={handleMonthChange} value={month}>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>
                <div className="select-container">
                    <select onChange={handleYearChange} value={year}>
                        {Array.from({ length: (new Date()).getFullYear() - 2021 }, (_, i) => i + 2022).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            {data.length > 0 && (
            <BarChart width={1000} height={400} data={data}>
                <XAxis dataKey="week" />
                <YAxis tickCount={4} />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="landSales" fill="#8884d8" barSize={30}>
                    <LabelList dataKey="landSales" content={renderCustomBarLabel('Nhà bán')} />
                </Bar>
                <Bar dataKey="landLeases" fill="#82ca9d" barSize={30}>
                    <LabelList dataKey="landLeases" content={renderCustomBarLabel('Nhà thuê')} />
                </Bar>
            </BarChart>
            )}
        </div>
    );
}

export default PostWeek
