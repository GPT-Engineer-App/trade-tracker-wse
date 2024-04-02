import React, { useState, useEffect } from "react";

import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Image, Spinner, Flex, Text } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Index = () => {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [historicalDate, setHistoricalDate] = useState(new Date("2024-04-02"));

  useEffect(() => {
    const fetchTrades = async (date) => {
      try {
        // Simulating API call with sample data
        const response = await fetch(`https://example.com/api/wse-trades?date=${date.toISOString()}`);
        const data = await response.json();
        setTrades(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching trades:", error);
        setIsLoading(false);
      }
    };

    fetchTrades(historicalDate);

    // Refresh trades every 30 minutes
    const interval = setInterval(fetchTrades, 30 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box p={4}>
      <Flex align="center" mb={4}>
        <Image src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3YXJzYXclMjBzdG9jayUyMGV4Y2hhbmdlJTIwbG9nb3xlbnwwfHx8fDE3MTIwNTUzNzJ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="WSE Logo" boxSize="50px" mr={2} />
        <Heading as="h1" size="xl">
          Warsaw Stock Exchange - Top 20 Companies
        </Heading>
      </Flex>

      {isLoading ? (
        <Flex justify="center" mt={8}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Company</Th>
              <Th>Symbol</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Change</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trades.map((trade) => (
              <Tr key={trade.symbol}>
                <Td>{trade.company}</Td>
                <Td>{trade.symbol}</Td>
                <Td isNumeric>{trade.price}</Td>
                <Td isNumeric>
                  <Flex align="center">
                    {trade.change >= 0 ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                    <Text ml={1}>{trade.change.toFixed(2)}%</Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Text mt={4} fontSize="sm" color="gray.500">
        Data refreshes every 30 minutes.
      </Text>
      <Text mt={2} fontSize="sm" color="gray.500">
        Historical date: {new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(historicalDate)}
      </Text>
    </Box>
  );
};

export default Index;
