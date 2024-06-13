/*import React from 'react';
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
import { Bar } from 'react-chartjs-2'; // Import Bar chart component

// Define chart data types (assuming your data structure)
interface BarChartData {
  data: number[];
  name: string;
}

// Sample chart data (replace with your actual data)
const barChartQ4Months: string[] = ['Oct', 'Nov', 'Dec'];
const barChartMonthlyPercentages: BarChartData[] = [
  { data: [10, 15, 20], name: 'Series 1' },
  { data: [5, 12, 18], name: 'Series 2' },
];

const BarChartContainer: React.FC = () => {
  // Define chart options (customize as needed)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            autoSkip: false,
            rotation: 45,
            fontSize: 12,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: '#888',
            drawTicks: false,
          },
          ticks: {
            skip: 4,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };

  const chartData = {
    labels: barChartQ4Months,
    datasets: barChartMonthlyPercentages.map((item) => ({
      label: item.name,
      data: item.data,
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // adjust color as needed
      borderColor: 'rgba(54, 162, 235, 1)', // adjust color as needed
      borderWidth: 1,
    })),
  };

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Bar Chart
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
        <GridItem>
          <Box borderWidth={1} borderRadius="lg" p={4}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default BarChartContainer;
*/