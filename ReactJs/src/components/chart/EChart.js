import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import React, { useState, useEffect } from "react";


function EChart() {
  const { Title, Paragraph } = Typography;

  const [emps, setEmps] = useState([]);
  const [value,setValue] = useState(false);
  let idData= JSON.parse(localStorage.getItem('key'));
  let data = [];
useEffect(() => {
  getEms()
  },[]);
   const getEms = () => {
    fetch('https://localhost:44314/api/Chart/'+idData)
    .then(res => res.json())
    .then(res => {
      setEmps(res)
      setValue(true)
    })
   }
 
   let sum=emps.reduce((a,v) =>  a = a + v.count, 0 );
   const currentYear = new Date().getFullYear();
   console.log(currentYear);

  const eChart = {
    series: [
      {
        data: emps.map(o => parseFloat(o.count)),
        name: "Taches",
        color: "#fff",
      },
    ],
  
    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
  
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories:emps.map(o => o.month),
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
  
      tooltip: {
        y: {
          formatter: function (val) {
            return  val ;
          },
        },
      },
    },
  };
  
  const items = [
    {
      Title: "30",
      user: "À FAIRE",
    },
    {
      Title: "50",
      user: "EN COURS",
    },
    {
      Title: "10",
      user: "EN ATTENTE",
    },
    {
      Title: "150",
      user: "TERMINÉ",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Barre graphique</Title>
        <Paragraph className="lastweek">
        les tâches complétées pendants {currentYear}: <span className="bnb2">+{sum}</span>
        </Paragraph>  
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
