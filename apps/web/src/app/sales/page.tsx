import SalesReport from '@/components/sales/SalesReport';
import React from 'react';

const page = () => {
  return (
    <div>
      <SalesReport salesData={[]} leadsData={[]} newVisitorData={[]} />
    </div>
  );
};

export default page;
