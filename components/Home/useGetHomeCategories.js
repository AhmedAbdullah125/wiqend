'use client';
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
const fetchHomeCategories = async (lang) => {
  const token = localStorage.getItem("token");
  const headers = { "accept-language": lang, };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await axios.get(
    `${API_BASE_URL}/categories`,
    { headers }
  );
  return response.data.data;

}

export const useGetHomeCategories = (lang) => {

  const query = useQuery({
    queryKey: ["homeCategories" + lang],
    queryFn: () => fetchHomeCategories(lang),
    // only run when we have lang and a country id
    // enabled: Boolean(lang) && (country !== undefined && country !== null),
    staleTime: 1000 * 60, // 1 minute (adjust as you want)
    cacheTime: 1000 * 60 * 5,
  });

  return query;
};
