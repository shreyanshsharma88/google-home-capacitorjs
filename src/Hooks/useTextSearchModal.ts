import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export const useTextSearch = () => {
 
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const searchMutation = useMutation({
    mutationKey: ["search"],
    mutationFn: (query: string) =>
      axios.get(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyBvIX_3L-CvxkoneksT9BLJrZ6bXc6EGo4&cx=02476a804532ba0c9&q=${query}`
      ),
  });

  const handleSearchChange = (value: string) => setSearchValue(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  useEffect(() => {
    if (debouncedSearchValue) {
      searchMutation.mutate(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

  const searchResults = useMemo(() => {
    
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchRes = searchMutation?.data?.data?.items?.map((item: any) => ({
      title: item.title,
      link: item.formattedUrl,
      isHistory: false,
    }));
    return [ ...(searchRes || [])];
  }, [searchMutation?.data?.data?.items] );

  return {
    
    handleSearchChange,
    searchValue,
    searchResults,
  };
};
