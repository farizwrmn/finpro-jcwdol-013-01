import { getSalesReportPerMonthQuery } from '@/queries/report.query';
import { IFilterReport } from '@/interfaces/report.interface';

const getSalesReportPerMonthAction = async (filters: IFilterReport) => {
  try {
    const data = await getSalesReportPerMonthQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

export { getSalesReportPerMonthAction };
