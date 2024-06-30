import { PrismaClient } from '@prisma/client';
import { IFilterReport } from '@/interfaces/report.interface';

const prisma = new PrismaClient();

const getSalesReportPerMonthQuery = async (filters: IFilterReport) => {
  try {
    const { year = '', storeId = '' } = filters;
    const report: any[] = await prisma.$queryRawUnsafe(`
        WITH master_month AS (
            SELECT '01' month UNION ALL
            SELECT '02' month UNION ALL
            SELECT '03' month UNION ALL
            SELECT '04' month UNION ALL
            SELECT '05' month UNION ALL
            SELECT '06' month UNION ALL
            SELECT '07' month UNION ALL
            SELECT '08' month UNION ALL
            SELECT '09' month UNION ALL
            SELECT '10' month UNION ALL
            SELECT '11' month UNION ALL
            SELECT '12' month
        ), 
        master_total AS (
            SELECT DATE_FORMAT(order_date, '%m') AS month, SUM(1) AS total
            FROM orders
            WHERE store_id LIKE '%${storeId}%'
            AND DATE_FORMAT(order_date, '%Y') LIKE '%${year}%'
            GROUP BY month
            ORDER BY month
        )
        SELECT a.month, COALESCE(b.total, 0) total
        FROM master_month a
        LEFT JOIN master_total b ON a.month = b.month;
    `);

    return report.map((item) => Number(item?.total));
  } catch (err) {
    throw err;
  }
};

export { getSalesReportPerMonthQuery };
