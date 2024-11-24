import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ComposedChart,
  Bar,
} from "recharts";
import "./App.css";

const App = () => {
  const [bidAskData, setBidAskData] = useState({ SPY: [], AAPL: [] });
  const [candlestickData, setCandlestickData] = useState({ SPY: [], AAPL: [] });

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/market-stream");

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Detect heartbeat and skip processing
      if (message.heartbeat) {
        console.log("Received heartbeat:", message);
        return; // Skip further processing
      }

      // Process LEVELONE_EQUITIES data
      const equities = message.data?.find(
        (item) => item.service === "LEVELONE_EQUITIES",
      );
      if (equities) {
        const updates = equities.content.reduce((acc, stock) => {
          const { key, 1: bid, 2: ask, 8: volume } = stock;
          acc[key] = [
            ...(acc[key] || []),
            {
              timestamp: new Date(equities.timestamp).toISOString(),
              bid: parseFloat(bid),
              ask: parseFloat(ask),
              volume: parseInt(volume, 10),
            },
          ];
          return acc;
        }, {});

        setBidAskData((prev) => ({
          SPY: updates.SPY
            ? [...prev.SPY.slice(-100), ...updates.SPY]
            : prev.SPY,
          AAPL: updates.AAPL
            ? [...prev.AAPL.slice(-100), ...updates.AAPL]
            : prev.AAPL,
        }));
      }

      // Process CHART_EQUITY data
      const charts = message.data?.find(
        (item) => item.service === "CHART_EQUITY",
      );
      if (charts) {
        const updates = charts.content.reduce((acc, stock) => {
          const { key, 1: open, 2: high, 3: low, 4: close } = stock;
          acc[key] = [
            ...(acc[key] || []),
            {
              timestamp: new Date(charts.timestamp).toISOString(),
              open: parseFloat(open),
              high: parseFloat(high),
              low: parseFloat(low),
              close: parseFloat(close),
            },
          ];
          return acc;
        }, {});

        setCandlestickData((prev) => ({
          SPY: updates.SPY
            ? [...prev.SPY.slice(-100), ...updates.SPY]
            : prev.SPY,
          AAPL: updates.AAPL
            ? [...prev.AAPL.slice(-100), ...updates.AAPL]
            : prev.AAPL,
        }));
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE Error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Stock Dashboard</h1>

      <span
        style={{
          fontWeight: "bold",
          fontSize: "10px",
          textAlign: "center",
          color: "#333",
        }}
      >
        Candlestick data is updated roughly once per minute
      </span>

      <div className="chart-row">
        {/* SPY Bid/Ask Chart */}
        <div className="chart-container">
          <h2>SPY Bid/Ask</h2>

          <LineChart width={600} height={300} data={bidAskData.SPY}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            />
            <YAxis
              domain={["dataMin - 0.5", "dataMax + 0.5"]} // Adjust Y-axis domain for better visibility
              tickCount={6} // Add more granularity to the Y-axis
              tickFormatter={(value) => `$${value.toFixed(2)}`} // Format ticks as prices
            />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            {/* Bid Line */}
            <Line
              type="monotone"
              dataKey="bid"
              stroke="#8884d8"
              strokeWidth={4} // Increase line thickness
              connectNulls={true} // Connect missing data points
            />
            {/* Ask Line */}
            <Line
              type="monotone"
              dataKey="ask"
              stroke="#82ca9d"
              strokeWidth={4} // Increase line thickness
              connectNulls={true} // Connect missing data points
            />
            <Brush />
          </LineChart>
        </div>

        {/* AAPL Bid/Ask Chart */}
        <div className="chart-container">
          <h2>AAPL Bid/Ask</h2>

          <LineChart width={600} height={300} data={bidAskData.AAPL}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            />
            <YAxis
              domain={["dataMin - 0.5", "dataMax + 0.5"]} // Adjust Y-axis domain for better visibility
              tickCount={6} // Add more granularity to the Y-axis
              tickFormatter={(value) => `$${value.toFixed(2)}`} // Format ticks as prices
            />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            {/* Bid Line */}
            <Line
              type="monotone"
              dataKey="bid"
              stroke="#8884d8"
              strokeWidth={4} // Increase line thickness
              connectNulls={true} // Connect missing data points
            />
            {/* Ask Line */}
            <Line
              type="monotone"
              dataKey="ask"
              stroke="#82ca9d"
              strokeWidth={4} // Increase line thickness
              connectNulls={true} // Connect missing data points
            />
            <Brush />
          </LineChart>
        </div>
      </div>

      <div className="chart-row">
        {/* SPY Candlestick Chart */}
        <div className="chart-container">
          <h2>SPY Candlestick</h2>
          <ComposedChart width={600} height={300} data={candlestickData.SPY}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              tickCount={6}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            {/* Candlestick bodies */}
            <Bar dataKey="close" fill="#82ca9d" />
          </ComposedChart>
        </div>

        {/* AAPL Candlestick Chart */}
        <div className="chart-container">
          <h2>AAPL Candlestick</h2>
          <ComposedChart width={600} height={300} data={candlestickData.AAPL}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              tickCount={6}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            {/* Candlestick bodies */}
            <Bar dataKey="close" fill="#82ca9d" />
          </ComposedChart>
        </div>
      </div>
    </div>
  );
};

export default App;
