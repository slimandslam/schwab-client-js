import { createChart } from "lightweight-charts";

// Chart configurations
const chartOptions = {
  width: 600,
  height: 400,
  layout: {
    attributionLogo: false,
    textColor: "#d1d4dc",
    backgroundColor: "#000",
  },
  timeScale: { timeVisible: true, secondsVisible: true },
};

// Create charts for each container
const chart1 = createChart(document.getElementById("chart1"), chartOptions);
const chart2 = createChart(document.getElementById("chart2"), chartOptions);
const chart3 = createChart(document.getElementById("chart3"), chartOptions);
const chart4 = createChart(document.getElementById("chart4"), chartOptions);

const forexChartContainers = {
  "EUR/USD": {
    bid: chart1.addLineSeries({ color: "blue" }),
    ask: chart1.addLineSeries({ color: "red" }),
  },
  "USD/JPY": {
    bid: chart2.addLineSeries({ color: "blue" }),
    ask: chart2.addLineSeries({ color: "red" }),
  },
  "USD/CAD": {
    bid: chart3.addLineSeries({ color: "blue" }),
    ask: chart3.addLineSeries({ color: "red" }),
  },
  "USD/MXN": {
    bid: chart4.addLineSeries({ color: "blue" }),
    ask: chart4.addLineSeries({ color: "red" }),
  },
};

// Connect to the SSE endpoint
const eventSource = new EventSource("http://localhost:5000/forex-stream");

eventSource.onmessage = (event) => {
  try {
    // Parse the incoming data
    const message = JSON.parse(event.data);

    // Verify it's an array before using forEach
    if (Array.isArray(message)) {
      message.forEach(({ key, bid, ask }) => {
        const chartSeries = forexChartContainers[key];
        if (chartSeries) {
          const now = Math.floor(Date.now() / 1000);

          // Update bid series
          if (bid !== undefined) {
            chartSeries.bid.update({ time: now, value: parseFloat(bid) });
          }

          // Update ask series
          if (ask !== undefined) {
            chartSeries.ask.update({ time: now, value: parseFloat(ask) });
          }
        }
      });
    } else {
      //  console.error("Unexpected message format: probably a heartbeat", message);
    }
  } catch (error) {
    console.error("Error processing message:", error);
  }
};

eventSource.onopen = () => console.log("Connected to Forex SSE stream.");
eventSource.onerror = () =>
  console.error("Error connecting to Forex SSE stream.");
