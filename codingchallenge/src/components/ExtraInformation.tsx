import React from 'react'
import axios, { AxiosResponse } from 'axios';

interface ApiResponse{
    attributes: any
}

type props = {
  choosenGene: string
}

function ExtraInformation(props: props){
    const [responseData, setResponseData] = React.useState<any>();
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [failedRequest, setFailed] = React.useState<boolean>(false);

    React.useEffect(() => {
        const FetchData = async () => {
          try {
            const response: AxiosResponse<ApiResponse> = await axios.get(
              'https://rest.ensembl.org/lookup/id/' + props.choosenGene + '?content-type=application/json'
            );
            setLoaded(true);
            setFailed(false);
            setResponseData(response.data);
            console.log(responseData);
          } catch (error) {
            setFailed(true);
          }
        }
    
        FetchData();
    }, [props.choosenGene]);

    return(
      <div><p>{responseData['species']}</p></div>
    )
}

export default ExtraInformation;