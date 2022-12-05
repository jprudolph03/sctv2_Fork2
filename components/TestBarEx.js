import React from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import LossDeptChart from "./LossDeptChart";
const TestBarEx = (t1Data) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const ext = t1Data.t1Data[4] ? t1Data.t1Data[4] : null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "100% vs Final Count",
      },
    },
  };

  const labels = [
    "Expected Total",
    "Forging",
    "Pressing",
    "Tapping",
    "VS/Packing",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "100%",
        data: labels.map(() => ext),
        backgroundColor: " rgba(55, 202, 87, 0.8)",
      },
      {
        label: "Final",
        data: [
          ext,
          t1Data.t1Data[0],
          t1Data.t1Data[1],
          t1Data.t1Data[2],
          t1Data.t1Data[3],
        ],
        backgroundColor: "rgba(214, 40, 40, 0.8)",
      },
    ],
  };
  return (
    <>
      <Grid columns="equal">
        <Grid.Column width={8}>
          <Bar data={data} height={0.8} width={0.7} options={options} />
        </Grid.Column>

        <Grid.Column width={8}>
          <Segment>
            <Header as="h2">Loss By Dept</Header>
            <LossDeptChart t1Data={t1Data} />
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default TestBarEx;
