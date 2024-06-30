import { IFilterReport } from '@/interface/report.interface';
import instance from '@/utils/axiosInstance';

export const getSalesReportPerMonth = async ({
  year = '',
  storeId = '',
}: IFilterReport) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/report/sales/month?year=${year}&storeId=${storeId}`,
      config,
    );
    const report = data?.data;
    return report;
  } catch (err) {
    console.error(err);
  }
};
