import React from 'react'
import axios, { AxiosResponse } from 'axios';

interface ApiResponse{
    attributes: any
}

function ExtraInformation(){
    const [responseData, setResponseData] = React.useState<ApiResponse>();
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [failedRequest, setFailed] = React.useState<boolean>(false);

    React.useEffect(() => {
        const FetchData = async () => {
          try {
            const response: AxiosResponse<ApiResponse> = await axios.get(
              'https://rest.ensembl.org/lookup/id/ENSG00000157764?content-type=application/json'
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
    });

    console.log(responseData?.attributes)
}

export default ExtraInformation;