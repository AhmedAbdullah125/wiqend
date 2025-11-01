'use client';
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useQuery } from "@tanstack/react-query";
const fetchCountries = async (lang) => {
  const headers = { "accept-language": lang, };
  if (localStorage.getItem("token")) headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  const response = await axios.get(
    `${API_BASE_URL}/countries`,
    { headers }
  );
  return response.data.data;

}

export const useCountries = (lang) => {

  const query = useQuery({
    queryKey: ["countries" + lang],
    queryFn: () => fetchCountries(lang),
    // only run when we have lang and a country id
    // enabled: Boolean(lang) && (country !== undefined && country !== null),
    staleTime: 1000 * 60, // 1 minute (adjust as you want)
    cacheTime: 1000 * 60 * 5,
  });

  return query;
};
