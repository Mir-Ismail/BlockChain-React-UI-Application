import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const chartoptions = {
    series: [
      {
        name: "Insurance Buy",
        data: [0, 31, 40, 28, 51, 42, 109, 100,90,42, 109, 100],
      },
      {
        name: "Hospital Treatment",
        data: [0, 11, 32, 45, 32, 34, 52, 41,32, 34, 52, 41,60],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"

        ],
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;