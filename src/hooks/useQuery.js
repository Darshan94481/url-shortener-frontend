import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import dayjs from 'dayjs';

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ['my-shortenurls'],
    queryFn: async () => {
      return await api.get('/api/urls/myurls', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
    },
    select: (data) => {
      if (!data?.data) return [];
      return data.data.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    },
    staleTime: 5000,
    onError,
  });
};

export const useFetchTotalClicks = (token, onError) => {
  const currentYear = dayjs().year();
  const startDate = `${currentYear}-01-01`;
  const endDate = `${currentYear}-12-31`;

  return useQuery({
    queryKey: ['url-totalclicks', startDate, endDate],
    queryFn: async () => {
      return await api.get(
        `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
    },
    select: (data) => {
      if (!data?.data) return [];
      return Object.keys(data.data).map((key) => ({
        clickDate: key,
        count: data.data[key],
      }));
    },
    staleTime: 5000,
    onError,
  });
};
