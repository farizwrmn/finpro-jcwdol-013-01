'use client';

import React, { useState } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Select,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import TableChart from './TableChart';

const DashboardSalesReport: React.FC = () => {
  const [filters, setFilters] = useState({
    year: '',
    storeId: '',
  });
  const [stores, setStores] = useState<any[]>([]);

  const yearOptions = Array.from({ length: 2030 - 2024 + 1 }, (_, index) => ({
    value: 2024 + index,
    label: (2024 + index).toString(),
  }));

  const monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthDatasets = [
    {
      label: 'Penjualan',
      data: monthLabels.map(() => 100),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
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

  const categoryLabels = [
    'Sayur',
    'Buah',
    'Daging',
    'Minyak',
    'Garam',
    'Telur',
  ];

  const productLabels = [
    'Cap Kaki Naga',
    'Cap Buah Khuldi',
    'Daging Semut Abadi',
    'Minyak Cap Keikhlasan',
    'Garam Anti Miskin',
    'Telur Dinosaurus Gede Sebelah',
  ];

  const categoryPieDatasets = [
    {
      label: 'Penjualan',
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

  const productPieDatasets = [
    {
      label: 'Penjualan',
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
    <Box>
      <Stack flex={'1'} justify={'center'} direction={'row'} spacing={2} mb={10}>
        <Box>
          <Text fontWeight={500}>Year:</Text>
          <Select
            value={filters.year}
            onChange={e => setFilters(prevFilters => ({ ...prevFilters, year: e.target.value }))}
          >
            <option value="">--- All Years ---</option>
            {yearOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Text fontWeight={500}>Store:</Text>
          <Select
            value={filters.storeId}
            onChange={e => setFilters(prevFilters => ({ ...prevFilters, storeId: e.target.value }))}
          >
            <option value="">--- All Stores ---</option>
            {stores?.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </Select>
        </Box>
      </Stack>
      <Spacer />

      {/* Charts Section */}
      <Grid templateColumns="repeat(auto-fit,minmax(300px,1fr">
        <GridItem colSpan={1}>
          <Box w="full" mb={-150}>
            <Text align="center" mb={5} fontWeight={500}>
              Laporan Stok Produk Per Bulan
            </Text>
            <AspectRatio>
              <BarChart
                labels={monthLabels}
                datasets={categoryDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box w="full" mb={8}>
            <Text align="center" mb={5} fontWeight={500}>
              Laporan Penjualan Per Produk
            </Text>
            <AspectRatio ratio={16 / 9}>
              <LineChart
                labels={monthLabels}
                datasets={productDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
      </Grid>
      <TableChart />
    </Box>
  );
};

export default DashboardSalesReport;
