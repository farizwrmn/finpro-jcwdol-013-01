'use client';
import { getNearestStore } from '@/services/store.service';
import React, { useEffect, useState } from 'react';

interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

interface GeolocationPosition {
  coords: GeolocationCoords;
}

const GeoLocation = () => {
  const [userLocation, setUserLocation] = useState<any>(null);

  const getLocation = () => {
    const location = localStorage.getItem('location');
    if (!location) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    }
  };

  const showPosition = (position: GeolocationPosition) => {
    setUserLocation({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    });
  };

  useEffect(() => {
    console.log('getLocation');
    getLocation();
  }, []);

  useEffect(() => {
    (async () => {
      console.log('masuk1');
      if (!userLocation) return;
      console.log('masuk2');
      const store = await getNearestStore(userLocation);
      console.log('masuk3');
      localStorage.setItem(
        'location',
        JSON.stringify({ ...userLocation, storeId: store?.id }),
      );
    })();
  }, [userLocation]);

  return <></>;
};

export default GeoLocation;
