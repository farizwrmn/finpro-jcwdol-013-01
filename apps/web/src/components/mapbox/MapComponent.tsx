'use client';
import React, { useState, useRef, useEffect } from 'react';
import mapboxgl, { LngLat } from 'mapbox-gl';
import { Box, Stack } from '@chakra-ui/react';
import { color } from 'framer-motion';

const MapComponent: React.FC = () => {
  // Replace with your Mapbox access token
  const accessToken =
    'pk.eyJ1IjoicmVoYW5hZGkiLCJhIjoiY2x4enRybzFzMGU1YzJ2cXZrcmxqYnkzZSJ9.vs6SmfosBPqUZ7HSvEsbhw';

  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const markerRef = useRef<mapboxgl.Marker | null>(null); // Store marker instance

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.8613031, -6.2477707],
        zoom: 13,
        accessToken,
      });

      map.on('click', (e: { lngLat: { lng: any; lat: any } }) => {
        const { lng, lat } = e.lngLat;
        setLongitude(lng);
        setLatitude(lat);

        // Create and add marker on click
        if (!markerRef.current) {
          // Check if marker exists
          const marker = new mapboxgl.Marker({
            color: 'green',
          });
          marker.setLngLat([lng, lat]).addTo(map);
          markerRef.current = marker; // Store marker reference
          // map.addLayer(marker as any);
        } else {
          // Update existing marker position
          markerRef.current!.setLngLat([lng, lat]);
        }
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [mapContainerRef]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{
          height: 500,
          width: 800,
          overflow: 'hidden',
          //   top: 0,
          //   bottom: 0,
          //   left: 0,
          //   right: 0,
        }}
        className="map-container"
      />
      <Box mt={20}>
        <p>Longitude: {longitude}</p>
        <p>Latitude: {latitude}</p>
      </Box>
    </div>
  );
};

export default MapComponent;
