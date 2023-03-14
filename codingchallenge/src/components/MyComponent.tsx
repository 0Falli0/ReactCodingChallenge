import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

interface ApiResponse {
  data: any
}

const MyComponent: React.FC = () => {
  const [responseData, setResponseData] = useState<ApiResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
          'https://rest.ensembl.org/ga4gh/features/ENSG00000176515.1?content-type=application/json'
        );
        setResponseData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>{JSON.stringify(responseData?.data, null, 2)}</p>
    </div>
  );
};

export default MyComponent;