'use client';

import React from 'react';
import { Box, Stack, Heading, Container } from '@chakra-ui/react';
import Slider from 'react-slick';
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Hero() {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const cards = [
    {
      title: 'We deliver great foods at all cost!',
      image:
        'https://images.unsplash.com/photo-1546072533-72256bac6a51?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3V0ZG9vciUyMGNhZmV8ZW58MHx8MHx8fDA%3D',
    },
    {
      title: 'Cozy Scheme Interior',
      image:
        'https://images.unsplash.com/photo-1524193982970-5273c9c11049?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Celebrate Holiday with Theme',
      image:
        'https://images.unsplash.com/photo-1710880694444-970aaf7e7f97?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
    },
  ];

  return (
    <Box
      position={'relative'}
      height={{ base: '200px', sm: '700px' }}
      width={'full'}
      overflow={'hidden'}
    >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={{ base: 'xs', sm: 'lg' }}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            <Container size="box.lg" height="600px" position="relative">
              <Stack
                w={'fit'}
                maxW={'lg'}
                position="absolute"
                top={{ base: '15%', sm: '40%' }}
                transform="translate(0, -50%)"
                bgGradient={'linear(to-b, whiteAlpha.800, transparent)'}
                borderRadius={'20'}
              >
                <Heading
                  fontSize={{ base: 'lg', sm: '4xl' }}
                  fontWeight={'800'}
                  color={'Teal'}
                  textAlign={'center'}
                  borderRadius={'20'}
                  p={2}
                  fontFamily={'Gill sans'}
                  bgGradient={'linear(to-t, whiteAlpha.800, transparent)'}
                >
                  {card.title}
                </Heading>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
