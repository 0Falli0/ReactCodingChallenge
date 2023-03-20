import { Box, LoadingOverlay, SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import DataTableMant from '../components/MantDataTable';
import React, { useEffect } from 'react'
import DetailView from '../components/DetailView';
import ExtraInformation from '../components/ExtraInformation';



function GeneOverview(){
    
    const { height,width } = useViewportSize();

    const [detailActive, setDetail] = React.useState<boolean>(false);
    const [cols, setCols] = React.useState<number>(1);
    const [choosenGene, setChoosenGene] = React.useState<string>();
    
    const [loading, setLoading] = React.useState<boolean>(false);

    useEffect(()=>{
        if (detailActive) {
            setCols(2);
        }
        else{
            setCols(1);
        }
    },[detailActive,choosenGene])

    return(
        <Box sx={{width: width, height:height}}>
        <LoadingOverlay visible={loading}/>
        <SimpleGrid
        cols={cols}
        sx={{ height: height }}
        spacing= "lg"
        breakpoints={[{maxWidth:"80rem",cols:cols, spacing:"sm"}]}>

            <DataTableMant setChoosenGene = {setChoosenGene} setDetail={setDetail} setLoading = {setLoading}/>
            {detailActive&&<DetailView choosenGene = {choosenGene} setLoading = {setLoading} close={()=>setDetail(false)}/>}
            <ExtraInformation choosenGene={choosenGene!}/>
        </SimpleGrid>    
        </Box>
        );
}

export default GeneOverview;