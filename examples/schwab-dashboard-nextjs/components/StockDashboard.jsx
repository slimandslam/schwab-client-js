"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";

const StockDashboard = () => {
  const [data, setData] = useState([]);
  const [lastHighPrice, setLastHighPrice] = useState(null);
  const [lastLowPrice, setLastLowPrice] = useState(null);
  const [closePrice, setClosePrice] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/market-stream");

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        console.log("Incoming SSE Data:", parsedData); // Debug: Log the incoming data

        if (parsedData?.data?.[0]?.content) {
          parsedData.data[0].content.forEach((entry) => {
            const timestamp = new Date(
              parsedData.data[0].timestamp,
            ).toLocaleTimeString();

            // Persist high/low prices and close price if they are undefined
            const highPrice = entry[10] ?? lastHighPrice;
            const lowPrice = entry[11] ?? lastLowPrice;

            if (entry[10] !== undefined) setLastHighPrice(entry[10]);
            if (entry[11] !== undefined) setLastLowPrice(entry[11]);
            if (entry[12] !== undefined) setClosePrice(entry[12]);

            setData((prevData) => [
              ...prevData.slice(-100), // Keep only the last 100 points to limit memory usage
              {
                time: timestamp,
                bidPrice: entry[1],
                askPrice: entry[2],
                lastSize: entry[9],
                highPrice,
                lowPrice,
                netChange: entry[18],
              },
            ]);
          });
        }
      } catch (error) {
        console.error("Error processing SSE data:", error);
      }
    };

    return () => eventSource.close();
  }, [lastHighPrice, lastLowPrice]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Bid and Ask Prices */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Bid and Ask Prices</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} tickCount={8} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="bidPrice"
              stroke="#e74c3c"
              strokeWidth={3}
              name="Bid Price"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="askPrice"
              stroke="#3498db"
              strokeWidth={3}
              name="Ask Price"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Last Size Scatter Plot */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Last Size</h2>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              dataKey="lastSize"
              domain={["dataMin - 10", "dataMax + 10"]}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter
              name="Last Size"
              data={data}
              fill="#9b59b6"
              shape="circle"
              line
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* High and Low Prices */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">High and Low Prices</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["dataMin - 1", "dataMax + 1"]} tickCount={8} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="highPrice"
              stroke="#27ae60" // Green
              strokeWidth={3}
              name="High Price"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="lowPrice"
              stroke="#e74c3c" // Red
              strokeWidth={3}
              name="Low Price"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Net Change and Close Price */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Net Change</h2>
          <span className="text-lg font-bold text-gray-700">
            Close Price: ${closePrice || "N/A"}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["dataMin - 1", "dataMax + 1"]} tickCount={8} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="netChange"
              stroke="#e67e22"
              strokeWidth={3}
              name="Net Change"
              dot={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockDashboard;
