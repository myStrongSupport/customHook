import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (resConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(resConfig.url, {
        method: resConfig.method ? resConfig.method : "GET",
        headers: resConfig.headers ? resConfig.headers : {},
        body: resConfig.body ? JSON.stringify(resConfig.body) : null,
      });

      console.log(resConfig.url);
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
