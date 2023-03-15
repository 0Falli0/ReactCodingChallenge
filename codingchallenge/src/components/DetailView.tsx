import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import GcChart from './GcChart';

interface ApiResponse {
  attributes: any
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
        console.log(responseData);
      } catch (error) {
        setFailed(true);
        props.setLoading();
      }
    }

    FetchData();
  }, [props.choosenGene]);

    return (
      <div>
        {!failedRequest && loaded && <GcChart gc_count={Number(responseData?.attributes?.vals['gene gc'])}/>}
        {/* {!failedRequest && loaded && <GcChart gc_count={44}/>} */}
         {/* {!failedRequest && loaded && <p>{JSON.stringify(responseData)}</p>} */}
        {failedRequest && <p>ERROR</p>}
      </div>
        );
  

};

export default DetailView;