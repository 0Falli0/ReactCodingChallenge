import { Box } from '@mantine/core';
import { ActionIcon, SimpleGrid } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import axios, { AxiosResponse } from 'axios';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import GcChart from './GcChart';


interface ApiResponse {
  attributes: any
}

//set proptype
type proptype = {
  setLoading: React.Dispatch<SetStateAction<boolean>>
  close: ()=>void
  choosenGene : string|undefined
}

function DetailView(props: proptype) {
  const [responseData, setResponseData] = useState<ApiResponse>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [failedRequest, setFailed] = useState<boolean>(false);
  const { height, width } = useViewportSize();


  useEffect(() => {
    //fetch additional data
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
        props.setLoading(false);
      }
    }

    FetchData();
  }, [props.choosenGene]);

  return (
    //display data according to selected entry
    <Box>
      <SimpleGrid cols={2}>
        <Box sx={{ width: width / 4 }}>
          {!failedRequest && loaded && <GcChart gc_count={Number(responseData?.attributes?.vals['gene gc'])} />}
          {failedRequest && <p>ERROR Invalid request!</p>}
        </Box>
        <Box>
          <ActionIcon onClick={props.close}>
            <IconX size="15rem" />
          </ActionIcon>
        </Box>
      </SimpleGrid>
    </Box>
  );

};

export default DetailView;