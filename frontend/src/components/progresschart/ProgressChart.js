import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useParams } from "react-router";

const ProgressChart = () => {
  const [value, setValue] = useState([]);
  const { boardId } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/tasksgroup/getboardcollections",
        {
          boardId,
        }
      );
      setValue(res.data.collections);
      console.log(res.data.collections[0].tasks )
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const labels = value.map((el) => el.name);
  const dataA = value.map((el) => el.tasks.length);
  const colors = value.map((el) => el.color);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tasks",
        backgroundColor: colors,
        borderColor: "rgb(255, 99, 132)",
        data: dataA,
      },
    ],
  };

  const options = {
    indexAxis: "y",
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
