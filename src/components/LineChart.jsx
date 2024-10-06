// src/components/LineChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

const LineChart = () => {
  const chartRef = useRef(null); // Referencia al div donde se cargará el gráfico

  useEffect(() => {
    // Inicializar el gráfico
    const chartInstance = echarts.init(chartRef.current);

    // Función para cargar los datos
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000'); // Realiza la solicitud HTTP
        const data = response.data.data;

        // Procesar datos para el gráfico
        const processedData = processChartData(data);

        // Configurar opciones del gráfico con los datos procesados
        const options = {
          title: { text: 'Sensor Data Over Time' },
          tooltip: { trigger: 'axis' },
          legend: { data: processedData.legend },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
          toolbox: { feature: { saveAsImage: {} } },
          xAxis: { type: 'category', boundaryGap: false, data: processedData.dates },
          yAxis: { type: 'value' },
          series: processedData.series,
        };

        chartInstance.setOption(options); // Establecer la configuración del gráfico
      } catch (error) {
        console.error('Error al obtener datos del gráfico:', error);
      }
    };

    // Llamar a la función para cargar los datos
    fetchData();

    // Limpiar la instancia del gráfico en caso de desmontaje del componente
    return () => {
      chartInstance.dispose();
    };
  }, []);

  // Función para procesar los datos recibidos del servidor y estructurarlos para el gráfico
  const processChartData = (data) => {
    const dates = []; // Array para las fechas (eje X)
    const seriesMap = {}; // Mapa para agrupar las series por nombre

    // Iterar sobre los datos y extraer información
    data.forEach((item) => {
      const name = item.input1.name; // Nombre del sensor
      const date = item.input1.date; // Fecha
      const value = parseFloat(item.input1.data.replace('[', '').replace(']', '')); // Valor del dato, convertido a número

      // Llenar el array de fechas si aún no contiene la fecha actual
      if (!dates.includes(date)) {
        dates.push(date);
      }

      // Agrupar los datos por nombre (serie)
      if (!seriesMap[name]) {
        seriesMap[name] = [];
      }
      seriesMap[name].push(value);
    });

    // Estructurar las series para el gráfico
    const legend = Object.keys(seriesMap); // Nombres de las series
    const series = legend.map((name) => ({
      name,
      type: 'line',
      stack: 'Total',
      data: seriesMap[name], // Datos de cada serie
    }));

    return { dates, legend, series };
  };

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default LineChart;
