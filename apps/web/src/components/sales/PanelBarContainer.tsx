import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Heading,
  VStack,
  HStack,
  Grid,
  GridItem,
  Flex,
  Image,
  Text,
  Center,
} from '@chakra-ui/react';

// Define panel bar data types (assuming your data structure)
interface PanelBarDataItem {
  firstName: string;
  lastName: string;
  position: string;
  imageUrl?: string; // Optional image URL
}

interface PanelBarData {
  teammates: PanelBarDataItem[];
  salesReports: { title: string }[]; // Simplified data structure
}

// Sample panel bar data (replace with your actual data)
const panelBarData: PanelBarData = {
  teammates: [
    { firstName: 'John', lastName: 'Doe', position: 'Software Engineer' },
    { firstName: 'Jane', lastName: 'Smith', position: 'Marketing Manager' },
    // ... other teammates
  ],
  salesReports: [
    { title: 'Q1 Sales Report' },
    { title: 'Product Performance Analysis' },
    // ... other reports
  ],
};

const PanelBarContainer: React.FC = () => {
  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Panel Bar
      </Heading>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box display="flex" alignItems="center">
              <Heading size="sm" mr={2}>
                My Teammates
              </Heading>
              <AccordionIcon />
            </Box>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))">
              {panelBarData.teammates.map((item, idx) => (
                <GridItem key={idx}>
                  <Flex direction="column" alignItems="center">
                    {item.imageUrl && <Image src={item.imageUrl} alt={item.firstName + ' ' + item.lastName} mb={2} />}
                    <Text as="h3" fontWeight="bold" mb={1}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text>{item.position}</Text>
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box display="flex" alignItems="center">
              <Heading size="sm" mr={2}>
                Projects
              </Heading>
              <AccordionIcon />
            </Box>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Flex wrap="wrap">
              {panelBarData.salesReports.map((item, idx) => (
                <GridItem key={idx} w="100%" mb={2}>
                  <Text as="h4" fontSize="md" fontWeight="bold">
                    {item.title}
                  </Text>
                </GridItem>
              ))}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem isDisabled>
          <AccordionButton>
            <Box display="flex" alignItems="center">
              <Heading size="sm" mr={2}>
                Communication
              </Heading>
              <AccordionIcon />
            </Box>
          </AccordionButton>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default PanelBarContainer;
