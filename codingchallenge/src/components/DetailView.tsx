import { Box } from '@mantine/core';
import { ActionIcon, SimpleGrid } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import GcChart from './GcChart';

import ExtraInformation from './ExtraInformation';

interface ApiResponse {
  attributes: any
}

function DetailView(props: any) {
  const [responseData, setResponseData] = useState<ApiResponse>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [failedRequest, setFailed] = useState<boolean>(false);
  const { height,width } = useViewportSize();


  useEffect(() => {
    props.setLoading(true);
    const FetchData = async () => {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
          'https://rest.ensembl.org/ga4gh/features/' + props.choosenGene + '.1?content-type=application/json'
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
            <SimpleGrid cols={2}>
      {!failedRequest && loaded && <GcChart gc_count={Number(responseData?.attributes?.vals['gene gc'])} />}
      {failedRequest && <p>ERROR</p>}
      <ActionIcon onClick={props.close} sx={{float:'right'}}>
        <IconX size="15rem"/>
      </ActionIcon>
    </SimpleGrid>
      </Box>
        );

};

export default DetailView;