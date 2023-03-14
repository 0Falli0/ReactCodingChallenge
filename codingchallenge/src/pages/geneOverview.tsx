import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import DataTableMant from '../components/MantDataTable';
import React, { useEffect } from 'react'



function GeneOverview(){
    
    const { height } = useViewportSize();

    const [detailActive, setDetail] = React.useState<boolean>(false);
    const [cols, setCols] = React.useState<number>(1);

    useEffect(()=>{
        if (detailActive) {
            setCols(2);
        }
        else{
            setCols(1);
        }
    },[detailActive])

    return(    <SimpleGrid 
        cols={cols}
        sx={{ height: height }}
        spacing= "lg"
        breakpoints={[{maxWidth:"80rem",cols:cols, spacing:"sm"}]}>
            <DataTableMant setDetail={setDetail}/>
            {detailActive && <div><p>LOL</p></div>}
        </SimpleGrid>);
}

export default GeneOverview;