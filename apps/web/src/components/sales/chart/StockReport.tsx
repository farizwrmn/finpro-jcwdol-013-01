'use client';

import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
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
import { useAppSelector } from "@/lib/hooks";
import { getStores } from "@/services/store.service";
import { getStockReportPerMonth } from "@/services/report.service";

const DashboardSalesReport: React.FC = () => {
  const [filters, setFilters] = useState({
    year: '',
    storeId: '',
  });
  const [stores, setStores] = useState<any[]>([]);
  const [monthDatasets, setMonthDatasets] = useState<any[]>([]);
  const user = useAppSelector((state) => state.auth.user);

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

  useEffect(() => {
    (async () => {
      const dataStores = await getStores({});
      setStores(dataStores?.stores);
    })();
  }, []);

  useEffect(() => {
    if (user.role === "store_admin" && user.storeId) {
      setFilters(prevFilters => ({ ...prevFilters, storeId: user.storeId as string }));
    }
  }, [user.role, user.storeId]);

  useEffect(() => {
    (async () => {
      const dataMonth = await getStockReportPerMonth(filters);
      setMonthDatasets(dataMonth);

    })();
  }, [filters]);

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
                datasets={monthDatasets}
              />
            </AspectRatio>
          </Box>
        </GridItem>
      </Grid>

      <Box>
        <Text align="center" mb={5} fontWeight={500}>
          Detail Laporan Stok Produk
        </Text>
        <TableChart />
      </Box>
    </Box>
  );
};

export default DashboardSalesReport;
