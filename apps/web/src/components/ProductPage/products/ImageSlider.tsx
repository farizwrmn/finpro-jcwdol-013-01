'use client';

// Import React and required components
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Flex } from '@chakra-ui/react';

// Import Swiper styles (assuming they are bundled with Swiper)
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// Import required Swiper modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

type Props = {
  images: string[];
};

const ImageSlider = ({ images = [] }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  console.log(images);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <Box
              mt={2}
              h="400px"
              bgImage={`http://localhost:8000/public/products/${image}`}
              bgPos="center"
              bgSize="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <Box
              h="100px"
              bgImage={`http://localhost:8000/public/products/${image}`}
              bgPos="center"
              bgSize="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlider;
