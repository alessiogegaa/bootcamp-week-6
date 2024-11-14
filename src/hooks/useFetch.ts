import { useState, useEffect } from 'react';

export type ApiResponse = {
  data: any;
  error: any;
  loading: Boolean;
};

export const useFetch = (url: string, params:string | undefined): ApiResponse => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const getAPIData = async () => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(params).toString();
      const apiResponse = await fetch(`${url}?${queryString}`);
      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await apiResponse.json();
      setData(json);
    } catch (error) {
      setError(error);
    }
    finally{
    setLoading(false);
    }
  };

  useEffect(() => {
    getAPIData();
  }, [url, JSON.stringify(params)]);

  return { data, error, loading };
};