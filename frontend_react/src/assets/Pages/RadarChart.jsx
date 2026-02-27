"use client";
import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { fetchTemperatureData } from "../../data/temperaturedata";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

import "./RadarChart.css";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    async function load() {
      const tempData = await fetchTemperatureData({
        press: "tcp01",
        date: "2026-02-27",
      });

      const temperature_1 = tempData.data.temperature_1.slice(0, 192);
      const temperature_2 = tempData.data.temperature_2.slice(0, 192);
      const temperature_3 = tempData.data.temperature_3.slice(0, 192);

      setDate(tempData.data.date);

      const labels = Array.from({ length: 192 }, () => "");

      setChartData({
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperature_1,
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 2,
            pointRadius: 2,
            fill: false
          },
          {
            label: "Temperature 2",
            data: temperature_2,
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            borderColor: "rgba(34, 197, 94, 1)",
            borderWidth: 2,
            pointRadius: 2,
            fill: false
          },
          {
            label: "Temperature 3",
            data: temperature_3,
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            borderColor: "rgba(239, 68, 68, 1)",
            borderWidth: 2,
            pointRadius: 2,
            fill: false
          }
        ]
      });
    }

    load();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: { circular: true, color: "#94a3b8" },
        angleLines: { display: false },
        ticks: { stepSize: 10, backdropColor: "transparent", color: "#000" },
        pointLabels: { color: "#000", font: { size: 10 } },
      }
    },
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Time : 24 Hour - 15 Min",
        color: "#1e40af",
        font: { size: 16 }
      }
    }
  };

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <>
      <div className="heading">
        <h2>Circular Chart</h2>

        <select style={{ width: "150px", height: "30px", margin: "0 30px" }}>
          <option value="TCP1">TCP1</option>
          <option value="TCP2">TCP2</option>
          <option value="TCP3">TCP3</option>
        </select>

        <input type="date" style={{ width: "150px", height: "30px" }} />

        <button
          style={{
            backgroundColor: "#513cb1",
            border: "none",
            color: "white",
            padding: "10px 30px",
            borderRadius: "5px",
            marginLeft: "20px"
          }}
        >
          Submit
        </button>

        <h2>Date: {date}</h2>
      </div>

      <div className="radar-wrapper">
        <div className="radar-container">
          <div className="chart-section">
            <Radar data={chartData} options={options} />
          </div>
        </div>

        <footer className="footer">
          © Multiquadrant Industrial Controls (I) Pvt. Ltd. 2025
        </footer>
      </div>
    </>
  );
};

export default RadarChart;