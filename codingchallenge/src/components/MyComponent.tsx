import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

interface ApiResponse {
  data: any
}

function DetailView(props:any){
  const [responseData, setResponseData] = useState<ApiResponse>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [failedRequest, setFailed] = useState<boolean>(false);



  useEffect(() => {
    props.setLoading(true);
    const FetchData = async () => {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
          'https://rest.ensembl.org/ga4gh/features/'+props.choosenGene+'.1?content-type=application/json'
        );
        setLoaded(true);
        setFailed(false);
        props.setLoading(false);
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
        setFailed(true);
        props.setLoading();
      }
    }

    FetchData();
  }, [props.choosenGene]);

    return (
      <div>
        {!failedRequest && loaded && <p>{JSON.stringify(responseData,null,2)}</p>}
        {failedRequest && <p>ERROR</p>}
      </div>
        );
  

};

export default DetailView;