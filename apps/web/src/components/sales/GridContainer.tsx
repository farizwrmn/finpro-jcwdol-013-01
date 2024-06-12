/*import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Flex,
  SimpleGrid,
  GridItem,
  Center,
} from '@chakra-ui/react';// Import Sparklines component

// Define grid data types (assuming your data structure)
interface GridDataItem {
  ProductID: number;
  ProductName: string;
  Category: { CategoryName: string };
  UnitPrice: number;
  UnitsInStock: number;
  PriceHistory: number[];
  Discontinued?: boolean; // Optional field
}

// Sample grid data (replace with your actual data)
const gridData: GridDataItem[] = [
  {
    ProductID: 1,
    ProductName: 'Product 1',
    Category: { CategoryName: 'Category A' },
    UnitPrice: 10,
    UnitsInStock: 20,
    PriceHistory: [20, 30, 25, 40, 35, 28, 32, 45],
  },
  // ... other data items
];

const GridContainer = () => {
  const processData = (data: GridDataItem[]) => {
    return data.map((item) => ({
      ...item,
      PriceHistory: Array.from({ length: 40 }, () => Math.floor(Math.random() * 100)),
    }));
  };

  const sparklineOptions = {
    width: 100,
    height: 20,
    lineColor: 'blue', // Adjust line color as needed
  };

  const renderDiscontinued = (props: { dataItem: GridDataItem }) => (
    <Td>
      <input type="checkbox" disabled checked={props.dataItem.Discontinued || false} />
    </Td>
  );

  const processedData = processData(gridData);

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Grid with Sparkline Charts
      </Heading>
      <SimpleGrid columns={1}>
        <GridItem>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Category Name</Th>
                  <Th>Price</Th>
                  <Th>In stock</Th>
                  <Th>Price history</Th>
                  <Th>Discontinued</Th>
                </Tr>
              </Thead>
              <Tbody>
                {processedData.map((item) => (
                  <Tr key={item.ProductID}>
                    <Td>{item.ProductID}</Td>
                    <Td>{item.ProductName}</Td>
                    <Td>{item.Category.CategoryName}</Td>
                    <Td>{item.UnitPrice}</Td>
                    <Td>{item.UnitsInStock}</Td>
                    <Td>
                      <Flex justifyContent="center">
                        <sparklineOptions data={item.PriceHistory} options={sparklineOptions} />
                      </Flex>
                    </Td>
                    <Td>{item.Discontinued ? renderDiscontinued({ dataItem: item }) : '-'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default GridContainer;
*/
