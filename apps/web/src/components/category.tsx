import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Category = () => {
  return (
    <>
      <Heading textAlign={'center'} mt={{ base: '5', sm: '-20' }} p={5}>
        Select from Categories
      </Heading>
      <Divider />
      <Flex bg={'azure'} mt={{ base: '5', sm: '2' }} pt={5} pb={10}>
        <Container p={'auto'}>
          <Box justifyContent={'center'}>
            <Grid
              templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)' }}
              gap={10}
              textAlign={'center'}
            >
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="sayur"
                    src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZlZ2V0YWJsZXxlbnwwfHwwfHx8MA%3D%3D"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Sayur</Text>
                </Link>
              </GridItem>
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="buah"
                    src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJ1aXR8ZW58MHx8MHx8fDA%3D"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Buah</Text>
                </Link>
              </GridItem>
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="Beras"
                    src="https://images.unsplash.com/photo-1610663711502-35f870cfaea2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJpY2V8ZW58MHx8MHx8fDA%3D"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Beras</Text>
                </Link>
              </GridItem>
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="Protein"
                    src="https://images.unsplash.com/photo-1629723448738-03475a1e536d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHByb3RlaW58ZW58MHx8MHx8fDA%3D"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Protein</Text>
                </Link>
              </GridItem>
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="siapsaji"
                    src="https://images.unsplash.com/photo-1495753379358-73c76ccd644b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGZhc3QlMjBmb29kfGVufDB8fDB8fHww"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Siap saji</Text>
                </Link>
              </GridItem>
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="Susu"
                    src="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8fDA%3D"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Susu dan Olahan</Text>
                </Link>
              </GridItem>
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="Bumbu"
                    src="https://images.unsplash.com/photo-1517646458010-ea6bd9f4a75f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Vhc29uaW5nfGVufDB8fDB8fHww"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Bumbu Dapur</Text>
                </Link>
              </GridItem>
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="Peralatan"
                    src="https://images.unsplash.com/photo-1572656934803-d2162b2e98bf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbiUyMHRvb2xzfGVufDB8fDB8fHww"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Peralatan Dapur</Text>
                </Link>
              </GridItem>
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="Perawatan"
                    src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xlYW5pbmclMjB0b29sc3xlbnwwfHwwfHx8MA%3D%3D"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Perawatan Rumah</Text>
                </Link>
              </GridItem>
              <GridItem>
                <Link href={'/'}>
                  <Avatar
                    name="Makananringan"
                    src="https://images.unsplash.com/photo-1616606103915-dea7be788566?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHNuYWNrfGVufDB8fDB8fHww"
                    size={'lg'}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'lg',
                    }}
                  />
                  <Text _hover={{ color: 'green' }}>Makanan Ringan</Text>
                </Link>
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default Category;
