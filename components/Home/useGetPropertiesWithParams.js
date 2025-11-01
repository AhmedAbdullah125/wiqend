'use client';
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
const fetchHomeCategories = async (lang, key) => {
  const token = localStorage.getItem("token");
  const headers = { "accept-language": lang, };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await axios.get(
    `${API_BASE_URL}/properties/${key}`,
    { headers }
  );
  return response.data.data;

}

export const useGetPropertiesWithParams = (lang, key) => {

  const query = useQuery({
    queryKey: ["properties" + key + lang],
    queryFn: () => fetchHomeCategories(lang, key),
    // only run when we have lang and a country id
    // enabled: Boolean(lang) && (country !== undefined && country !== null),
    staleTime: 1000 * 60, // 1 minute (adjust as you want)
    cacheTime: 1000 * 60 * 5,
  });

  return query;
};
