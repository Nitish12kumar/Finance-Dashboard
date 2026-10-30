import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", balance: 1000 },
  { name: "Feb", balance: 2000 },
  { name: "Mar", balance: 3000 },
  { name: "Apr", balance: 5000 },
];
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 text-green-400 px-3 py-2 rounded-md text-sm border border-white/10">
        balance : {payload[0].value}
      </div>
    );
  }
  return null;
};
const CustomLineChart = () => {
  return (
    <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-white/10 text-white">
      <h3 className="mb-4 font-semibold text-gray-300">
        Balance Trend
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
        <XAxis dataKey="name" stroke="#9ca3af" />
<YAxis stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
         <Line
  type="monotone"
  dataKey="balance"
  stroke="#4ade80"
  strokeWidth={4}
  dot={{ r: 5 }}
  activeDot={{ r: 8 }}
/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;