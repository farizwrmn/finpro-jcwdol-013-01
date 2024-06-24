import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Button,
  Stack,
  Image,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

interface PaymentMethod {
  name: string;
  cardNetwork?: string; // Optional field for card network logos
  imageSrc?: string; // Optional field for payment provider logos
}

const paymentMethods: PaymentMethod[] = [
  { name: 'Credit Card' },
  { name: 'Debit Card' },
  {
    name: 'PayPal',
  },
  { name: 'Apple Pay' },
  { name: 'Google Pay' },
];

export default function PaymentMethodPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | undefined
  >();
  const [cardNumber, setCardNumber] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleMethodChange = (selectedMethod: string) => {
    setSelectedPaymentMethod(selectedMethod);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityCode(e.target.value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process payment information here
    console.log('Payment submitted:', {
      method: selectedPaymentMethod,
      cardNumber,
      securityCode,
      expiryDate,
    });
  };

  return (
    <Stack spacing={8}>
      <Heading as="h1" fontSize="2xl">
        Payment Method
      </Heading>

      <Stack
        spacing={8}
        w={'full'}
      >
        <form onSubmit={handleSubmit}>
          <RadioGroup onChange={handleMethodChange} value={selectedPaymentMethod}>
            {paymentMethods.map((method) => (
              <Stack key={method.name} mb={4}>
                <Radio value={method.name}>
                  <Box display="flex" alignItems="center">
                    {method.imageSrc && (
                      <Image
                        src={method.imageSrc}
                        alt={method.name}
                        width="40px"
                        height="40px"
                      />
                    )}
                    <Text fontSize="md">{method.name}</Text>
                  </Box>
                </Radio>
                {selectedPaymentMethod === method.name && (
                  <>
                    <FormControl isInvalid={!cardNumber}>
                      <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="**** **** **** ****"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                      {!cardNumber && (
                        <FormErrorMessage>
                          Card number is required
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <Flex mt={4} justifyContent="space-between">
                      <FormControl isInvalid={!securityCode}>
                        <FormLabel htmlFor="securityCode">
                          Security Code
                        </FormLabel>
                        <Input
                          id="securityCode"
                          type="text"
                          placeholder="***"
                          maxLength={3}
                          value={securityCode}
                          onChange={handleSecurityCodeChange}
                        />
                        {!securityCode && (
                          <FormErrorMessage>
                            Security code is required
                          </FormErrorMessage>
                        )}
                      </FormControl>

                      <FormControl isInvalid={!expiryDate}>
                        <FormLabel htmlFor="expiryDate">
                          Expiry Date (MM/YY)
                        </FormLabel>
                        <Input
                          id="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                        />
                        {!expiryDate && (
                          <FormErrorMessage>
                            Expiry date is required
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </Flex>
                  </>
                )}
              </Stack>
            ))}
          </RadioGroup>
        </form>
      </Stack>
    </Stack>
  );
}
