import { Box, Table } from '@mantine/core';
import { ActionIcon, SimpleGrid } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';
import GcChart from './GcChart';


interface ApiResponse {
  attributes: any
}

function DetailView(props: any) {
  const [responseData, setResponseData] = useState<ApiResponse>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [failedRequest, setFailed] = useState<boolean>(false);
  const { height, width } = useViewportSize();

  function DetailTable() {
    const AdditionalInformationElements = [
      { type:"Biotype",value: responseData?.attributes?.vals['biotype'] },
      { type:"GC",value: responseData?.attributes?.vals['gene gc'] }
    ]

    const rows = AdditionalInformationElements.map((element) => (
      <tr key={element.type}>
        <td>{element.type}</td>
        <td>{element.value}</td>
      </tr>
    ))

    return (
      <Table>
        <thead>
          <tr>
            <th>Entry</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    )
  }

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
    <Box>
      <Box>
        <DetailTable />
      </Box>
      <SimpleGrid cols={2}>
        <Box sx={{ width: width / 4 }}>
          {!failedRequest && loaded && <GcChart gc_count={Number(responseData?.attributes?.vals['gene gc'])} />}
          {failedRequest && <p>ERROR</p>}
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