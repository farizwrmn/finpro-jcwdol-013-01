"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  ButtonGroup,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import instance from "@/utils/axiosInstance";
import { deleteStore, getStores } from "./services";

// interface Store {
//   id: number;
//   name: string;
//   subdistrict: string;
//   city: string;
//   province: string;
// }

const Page = () => {
  // const stores: Store[] = [
  //   { id: 1, name: 'Toko Jakarta', subdistrict: "Mampang", city: "Jakarta Selatan", province: "DKI Jakarta" },
  //   { id: 2, name: 'Toko Bekasi', subdistrict: "Mampang", city: "Jakarta Selatan", province: "DKI Jakarta" },
  //   { id: 3, name: 'Toko Depok', subdistrict: "Mampang", city: "Jakarta Selatan", province: "DKI Jakarta" },
  //   { id: 4, name: 'Toko Bogor', subdistrict: "Mampang", city: "Jakarta Selatan", province: "DKI Jakarta" },
  //   { id: 5, name: 'Toko Tangerang', subdistrict: "Mampang", city: "Jakarta Selatan", province: "DKI Jakarta" },
  //   { id: 6, name: 'Toko Bandung', subdistrict: "Mampang", city: "Jakarta Selatan", province: "DKI Jakarta" },
  // ];

  // const [data, setData] = useState<Store[]>(stores);
  // const [filteredData, setFilteredData] = useState<Store[]>(stores);
  // const [keyword, setKeyword] = useState<string>('');
  // const [sortField, setSortField] = useState<string | null>(null);
  // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  const [stores, setStores] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getStores();
      setStores(data);
    })()
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure want to delete store ${name}`) || !id) return
    try {
      const store = await deleteStore(id);
      if (!store) throw new Error("Delete store failed");
      alert("Delete store success");

      const data = await getStores();
      setStores(data);
    } catch (err) {
      console.error(err);
      alert("Delete store failed");
    }
  }

  // useEffect(() => {
  //   // Apply filtering
  //   const filtered = data.filter((item) => {
  //     return String(item.name).toLowerCase().includes(keyword.toLowerCase());
  //     // Implement your filtering logic here
  //     // e.g., search by name, price range, etc.
  //     return true; // Replace with your actual filtering condition
  //   });

  //   // Apply sorting
  //   const sorted = filtered.sort((a: Store, b: Store) => {
  //     if (sortField && a[sortField] !== undefined && b[sortField] !== undefined) {
  //       if (typeof a[sortField] === 'string') {
  //         if (sortOrder === 'asc') {
  //           return a[sortField].localeCompare(b[sortField], undefined, {
  //             sensitivity: 'base',
  //           });
  //         } else {
  //           return b[sortField].localeCompare(a[sortField], undefined, {
  //             sensitivity: 'base',
  //           });
  //         }
  //       } else if (typeof a[sortField] === 'number') {
  //         if (sortOrder === 'asc') {
  //           return a[sortField] - b[sortField];
  //         } else {
  //           return b[sortField] - a[sortField];
  //         }
  //       }
  //     }
  //     return 0;
  //   });

  //   // Apply pagination
  //   const paginated = sorted.slice(
  //     (currentPage - 1) * pageSize,
  //     currentPage * pageSize
  //   );

  //   setFilteredData(paginated);
  // }, [data, keyword, sortField, sortOrder, currentPage, pageSize]);

  // const handleSortClick = (field: string) => {
  //   if (sortField === field) {
  //     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setSortField(field);
  //     setSortOrder('asc');
  //   }
  // };

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  // const handlePageSizeChange = (newPageSize: number) => {
  //   setPageSize(newPageSize);
  // };

  // const handleSearch = (text: string) => {
  //   setKeyword(text);
  //   handlePageChange(1);
  // }

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Store Management
      </Text>
      <Card mt={10}>
        <CardBody>
          <Flex p={4} gap={4}>
            {/* <Input
              placeholder="Search..."
              value={keyword}
              onChange={(e) => handleSearch(e.target.value)}
            // leftIcon={<Icon as={FiSearch} />}
            // Implement search functionality here
            /> */}
            <Button
              colorScheme='blue'
              onClick={() => {
                router.push(`/admin/stores/create`);
              }}
            >
              Add
            </Button>
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Name</Th>
                  <Th>Subdistrict</Th>
                  <Th>City</Th>
                  <Th>Province</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stores.map((store: any, index: number) => (
                  <Tr key={store.id}>
                    <Td>{index + 1}</Td>
                    <Td>{store.name}</Td>
                    <Td>{store.subdistrictName}</Td>
                    <Td>{store.cityName}</Td>
                    <Td>{store.provinceName}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme='blue'
                          onClick={() => {
                            router.push(`/admin/stores/edit/${store.id}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme='red'
                          onClick={() => handleDelete(store.id, store.name)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {/* <Box p={4} display="flex" justifyContent="space-between">
              <Select
                width="auto"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
              </Select>
              <Box display="flex">
                <IconButton
                  aria-label="left"
                  icon={<Icon as={FiChevronLeft} />}
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  isDisabled={currentPage === 1}
                />
                <Box p={2}>{currentPage} / {Math.ceil(data.length / pageSize)}</Box>
                <IconButton
                  aria-label="right"
                  icon={<Icon as={FiChevronRight} />}
                  onClick={() =>
                    setCurrentPage(
                      Math.min(currentPage + 1, Math.ceil(data.length / pageSize))
                    )
                  }
                  isDisabled={currentPage === Math.ceil(data.length / pageSize)}
                />
              </Box>
            </Box> */}
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;