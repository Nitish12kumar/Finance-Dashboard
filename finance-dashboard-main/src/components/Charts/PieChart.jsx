import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", value: 500 },
  { name: "Travel", value: 800 },
  { name: "Shopping", value: 700 },
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

const COLORS = ["#4ade80", "#60a5fa", "#f472b6"];

const CustomPieChart = () => {
  return (
   <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-white/10 text-white">
      <h3 className="mb-4 font-semibold text-gray-300">
        Expenses Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;