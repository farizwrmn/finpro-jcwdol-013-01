import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Flex,
  Divider,
  SimpleGrid,
  Center,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2'; // Import Doughnut chart component

// Define chart data types (assuming your data structure)
interface DonutChartData {
  foodType: string;
  percentSold: number;
}

// Sample chart data (replace with your actual data)
const donutChartData: DonutChartData[] = [
  { foodType: 'Pizza', percentSold: 40 },
  { foodType: 'Burgers', percentSold: 30 },
  { foodType: 'Salads', percentSold: 20 },
  { foodType: 'Others', percentSold: 10 },
];

const DonutChartContainer: React.FC = () => {
  // Define chart options (customize as needed)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false, // Hide legend by default
    },
    cutoutPercentage: 60, // Adjust donut hole size
    plugins: {
      datalabels: {
        color: '#fff', // Set label color
        font: {
          weight: 'bold',
        },
        formatter: (value: any, context: { dataset: { label: string; }; }) => {
          const label = context.dataset.label || '';
          return `${label}: ${value}%`;
        }, // Customize label content (similar to labelTemplate)
      },
    },
  };

  const chartData = {
    labels: donutChartData.map((item) => item.foodType),
    datasets: [
      {
        label: 'Percent Sold', // Optional label
        data: donutChartData.map((item) => item.percentSold),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ], // Adjust colors as needed
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ], // Adjust border colors as needed
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Donut Chart
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
        <GridItem>
          <Box borderWidth={1} borderRadius="lg" p={4}>
            <Doughnut data={chartData} options={chartOptions} />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DonutChartContainer;
