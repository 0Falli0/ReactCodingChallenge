import { DataTable } from 'mantine-datatable';
import React from 'react'
import axios, { AxiosResponse } from 'axios';
import Papa from "papaparse"

type Gene = {
  ensembl: string
  gene_symbol: string
  name: string
  biotype: string
  chromosome: string
  start: number
  end: number
}

type Data = {
  data: Gene[]
}

const PAGE_SIZES = [20, 50, 100];

function DataTableMant(props:any) {

  const [values, setValues] = React.useState<Data>()
  const [load, setLoad] = React.useState<boolean>(true)

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(PAGE_SIZES[1]);
  const [records, setRecords] = React.useState(values?.data.slice(0, pageSize));

  const [selectedRecords, setSelectedRecords] = React.useState<Gene[]>([])

  const getCSV = () => {
    Papa.parse("genes_human.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ";",
      complete: (results: Data) => {
        results!.data = results!.data.map(obj=>({...obj,test:"Test"}));
        setValues(results);
        setLoad(false);
      },
    })
  }

  React.useEffect(() => {
    getCSV();
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(values?.data.slice(from, to));
  }, [page,values?.data,pageSize])


  return (
    <DataTable
    withBorder
    withColumnBorders
    striped
    highlightOnHover
    minHeight={150}
    fetching = {load}

    columns={[{ accessor:"ensembl" ,title: "Ensembl" },
      { accessor: 'gene_symbol', title:'Gene Symbol'},
      { accessor: 'name', title:'Name'},
      { accessor: 'biotype', title:'BioType'},
      { accessor: 'chromosome', title:'Chromosome'},
      { accessor: 'start', title:'Start'},
      { accessor: 'end', title:'End'},
      { accessor: 'test', title:'Test'},]}
    records={records}

    onRowClick={(e) => {
      props.setDetail(true);
      props.setChoosenGene(e.ensembl);
    }}
    totalRecords={values?.data.length}
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