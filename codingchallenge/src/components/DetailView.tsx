import { Box } from '@mantine/core';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import GcChart from './GcChart';

interface ApiResponse {
  attributes: any
}

function DetailView(props:any){
  const [responseData, setResponseData] = useState<ApiResponse>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [failedRequest, setFailed] = useState<boolean>(false);
  const { height,width } = useViewportSize();


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
      <Box sx={{height: height / 2, width: width / 4}}>
        {!failedRequest && loaded && <GcChart gc_count={Number(responseData?.attributes?.vals['gene gc'])}/>}
        {/* {!failedRequest && loaded && <GcChart gc_count={44}/>} */}
         {/* {!failedRequest && loaded && <p>{JSON.stringify(responseData)}</p>} */}
        {failedRequest && <p>ERROR</p>}
      </Box>
        );

};

export default DetailView;