import { DataTable } from 'mantine-datatable';
import React from 'react'
import axios, { AxiosResponse } from 'axios';
import Papa from "papaparse"


interface ApiResponse {
  data: any
}

type Gene = {
  ensembl: string
  gene_symbol: string
  name: string
  biotype: string
  chromosome: string
  start: number
  end: number
  species: string
}

type Genedata = Gene[];

type PapaParseData = {
  data: Gene[]
};

const PAGE_SIZES = [20, 50, 100];

function DataTableMant(props: any) {

  const [values, setValues] = React.useState<Genedata>()
  const [load, setLoad] = React.useState<boolean>(true)

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZES[1]);
  const [records, setRecords] = React.useState(values?.slice(0, pageSize));

  const [selectedRecords, setSelectedRecords] = React.useState<Gene[]>([])



  React.useEffect(() => {
    ////attempt to load additional data column
    // const FetchData = async (key: string) => {
    //   try {
    //     const response: AxiosResponse<any> = await axios.get(
    //       // 'https://rest.ensembl.org/lookup/id/' + key + '?content-type=application/json'
    //       'https://rest.ensembl.org/lookup/id/ENSG00000250577?content-type=application/json'
    //     );
    //     console.log("found:")
    //     console.log(records?.find((obj:any)=>(obj.ensembl === key)));
    //     setRecords(records!.find((obj:any)=>(obj.ensembl === key))!.species = response.data['species'])
    //     console.log(records);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    const getCSV = () => {
      Papa.parse('genes_human.csv', {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ";",
        complete: (results: PapaParseData) => {
          setValues(results?.data); 
          setLoad(false);
        },
      })
    }

    getCSV();
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(values?.slice(from, to));
  }, [page, values, pageSize])


  return (
    <DataTable
      withBorder
      withColumnBorders
      striped
      highlightOnHover
      minHeight={150}
      fetching={load}

      columns={[{ accessor: "ensembl", title: "Ensembl" },
      { accessor: 'gene_symbol', title: 'Gene Symbol' },
      { accessor: 'name', title: 'Name' },
      { accessor: 'biotype', title: 'BioType' },
      { accessor: 'chromosome', title: 'Chromosome' },
      { accessor: 'start', title: 'Start' },
      { accessor: 'end', title: 'End' }]}
      records={records}

      onRowClick={(e) => {
        props.setDetail(true);
        props.setChoosenGene(e.ensembl);
      }}
      totalRecords={values?.length}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      recordsPerPage={pageSize}
      onRecordsPerPageChange={setPageSize}

      idAccessor='ensembl'
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
    />

  );
}

export default DataTableMant;