import { get, post } from '@/utils/request'

/** 获取系统通知 */
export const getNoticeList = () => post('/notice/list')

/** 获取统计数据 */
export interface StatisticsData {
  date: string[]
}

export const getStatisticsList = (data: StatisticsData) => post('/statistics/list', data)
