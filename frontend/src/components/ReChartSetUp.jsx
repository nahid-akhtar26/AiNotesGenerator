import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  Line,
  LineChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ReChartSetUp = ({ charts }) => {
  const COLOR = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  if (!charts || charts.length === 0) return null;

  return (
    <div className="space-y-8">
      {charts.map((chart, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-4 bg-white"
        >
          <h4 className="font-semibold text-gray-800 mb-3">
            📊 {chart.title}
          </h4>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              
              {/* BAR CHART */}
              {chart.type === "bar" && (
                <BarChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLOR[i % COLOR.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {/* LINE CHART */}
              {chart.type === "line" && (
                <LineChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              )}

              {/* PIE CHART */}
              {chart.type === "pie" && (
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLOR[i % COLOR.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}

            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReChartSetUp;