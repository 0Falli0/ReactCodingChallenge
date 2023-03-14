import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';


interface ApiResponse {
  data: any
}

function MyComponent(){
  const [responseData, setResponseData] = useState<ApiResponse>();

  const fetchData = async () => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(
        'https://rest.ensembl.org/ga4gh/features/ENSG00000176515.1?content-type=application/json'
      );
      setResponseData(response.data);
      console.log(responseData)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [responseData]);

  return (
    <div>
      <p>{JSON.stringify(responseData)}</p>
    </div>
  );
};

export default MyComponent;