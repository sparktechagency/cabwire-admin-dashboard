import { Card, Typography } from 'antd';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTotalRevinueQuery } from '../../features/dashboard/dashboardApi';
const { Title } = Typography;

const Revenue = () => {
  const { data, isLoading } = useTotalRevinueQuery();

  // Transform the API data to match the expected format
  const revenueData = data?.data?.map(item => ({
    month: item.month,
    revenue: item.amount
  })) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ color: '#336C79' }}>
            <strong>${payload[0].value.toLocaleString()}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <div>Loading revenue data...</div>;
  }

  return (
    <div className='w-full'>
      <Card
        className=" border border-primary"
        title={<Title level={5}>Total Revenue</Title>}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#041B44"
              strokeWidth={2}
              dot={{ r: 5 }}
              name="Monthly Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Revenue;