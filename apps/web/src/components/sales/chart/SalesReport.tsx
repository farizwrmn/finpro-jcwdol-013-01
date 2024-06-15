'use client';

import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { AspectRatio, Box, Grid, GridItem } from '@chakra-ui/react';

// Sales Data Interface (replace with your actual data structure)
interface SalesData {
  month: string; // Month name
  revenue: number;
  expenses: number;
  profit: number;
  // Add more properties as needed
}

const salesData: SalesData[] = [
  // Replace with your actual sales data for each month
  { month: 'January', revenue: 10000, expenses: 5000, profit: 5000 },
  { month: 'February', revenue: 12000, expenses: 6000, profit: 6000 },
  { month: 'March', revenue: 15000, expenses: 7000, profit: 8000 },
  // ... data for remaining months
];

const DashboardSalesReport: React.FC = () => {
  const monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const categoryDatasets = [
    {
      label: 'Sayur',
      data: monthLabels.map(() => 100),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Daging',
      data: monthLabels.map(() => 200),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ];

  const productDatasets = [
    {
      label: 'Bayam',
      data: monthLabels.map(() => 100),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Sapi',
      data: monthLabels.map(() => 200),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ];

  const categoryLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  const pieDatasets = [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ];

  return (
    <Box className="dashboard-sales-report">
      <h1>Sales Report</h1>
      <div className="sales-summary"></div>

      {/* Charts Section */}
      <h2>Sales by Month</h2>
      <Grid templateColumns="repeat(auto-fit,minmax(300px,1fr">
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
          <GridItem colSpan={1}>
            <Box w="full" mb={8}>
              <AspectRatio>
                <BarChart
                  title="Laporan Penjualan Per Kategori"
                  labels={monthLabels}
                  datasets={categoryDatasets}
                />
              </AspectRatio>
            </Box>
          </GridItem>
        </Grid>
        <GridItem colSpan={1}>
          <Box w="full" mb={8}>
            <AspectRatio ratio={16 / 9}>
              <LineChart
                title="Laporan Penjualan Per Produk"
                labels={monthLabels}
                datasets={productDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
      </Grid>

      {/* Additional Charts (optional) */}
      <GridItem colSpan={1}>
        <h2>Top Selling Products (Pie Chart)</h2>
        <Box w="full" mb={8}>
          <AspectRatio ratio={16 / 9}>
            <PieChart labels={categoryLabels} datasets={pieDatasets} />
          </AspectRatio>
        </Box>
      </GridItem>
    </Box>
  );
};

export default DashboardSalesReport;
