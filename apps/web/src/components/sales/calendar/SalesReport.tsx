// components/SalesReport.tsx
import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardBody,
  Heading,
  Text,
  HStack,
  VStack,
  Grid,
} from '@chakra-ui/react';
import { format } from 'date-fns'; // For date formatting (optional)

interface SalesReportProps {
  leadsData: Lead[];
  newVisitorData: NewVisitor[];
  salesData: Sale[];
}

const SalesReport: React.FC<SalesReportProps> = ({
  leadsData,
  newVisitorData,
  salesData,
}) => {
  const calculateTotalSales = () => {
    return salesData.reduce((acc, sale) => acc + sale.quantity * sale.price, 0);
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Sales Report
      </Heading>

      {/* Leads Table */}
      <Box mb={4}>
        <Heading as="h3" size="md" mb={2}>
          Leads
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Source</Th>
                <Th isNumeric>Count</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leadsData.map((lead) => (
                <Tr key={lead.source}>
                  <Td>{lead.source}</Td>
                  <Td isNumeric>{lead.count}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* New Visitors Table */}
      <Box mb={4}>
        <Heading as="h3" size="md" mb={2}>
          New Visitors
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Country</Th>
                <Th isNumeric>Active</Th>
                <Th isNumeric>Downloads</Th>
                <Th isNumeric>Sales</Th>
                <Th isNumeric>From Search</Th>
                <Th isNumeric>From Bookmarks</Th>
              </Tr>
            </Thead>
            <Tbody>
              {newVisitorData.map((visitor) => (
                <Tr key={visitor.id}>
                  {' '}
                  {/* Use ID if available */}
                  <Td>{visitor.id}</Td> {/* Use ID if available */}
                  <Td>{visitor.country}</Td>
                  <Td isNumeric>{visitor.active ? 'Yes' : 'No'}</Td>
                  <Td isNumeric>{visitor.downloads}</Td>
                  <Td isNumeric>{visitor.sales}</Td>
                  <Td isNumeric>{visitor.fromSearch}</Td>
                  <Td isNumeric>{visitor.fromBookmarks}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* Overall Sales Card */}
      <Grid mt={4} gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))">
        <Card>
          <CardBody>
            <Heading as="h4" size="md" mb={2}>
              Overall Sales
            </Heading>
            <Text fontSize="xl">${calculateTotalSales().toFixed(2)}</Text>
          </CardBody>
        </Card>

        {/* Sales by Source Cards (example) */}
        {/* Replace with logic to calculate sales from different sources */}
        <Card>
          <CardBody>
            <Heading as="h4" size="md" mb={2}>
              Sales from Facebook
            </Heading>
            <Text fontSize="xl">$1,250.00</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Heading as="h4" size="md" mb={2}>
              Sales from Twitter
            </Heading>
            <Text fontSize="xl">$780.00</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Heading as="h4" size="md" mb={2}>
              Sales from Search
            </Heading>
            <Text fontSize="xl">$1,820.00</Text>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
};

export default SalesReport;
