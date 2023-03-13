import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React from 'react'
import { useEffect, useState } from 'react';
import Papa from "papaparse"
import { Box } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

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

function DataTableMant() {

  const [values, setValues] = React.useState<Data>()
  const [load, setLoad] = React.useState<boolean>(true)

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [records, setRecords] = React.useState(values?.data.slice(0, pageSize));
  const [table_width,setWidth] = React.useState('100%')

  const [selectedRecords, setSelectedRecords] = useState<Gene[]>([])

  const getCSV = () => {
    Papa.parse("genes_human.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ";",
      complete: (results: Data) => {
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
  }, [page,values?.data])

  const { height, width } = useViewportSize();

  return (
    <Box sx={{ height: height }}>
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
      { accessor: 'end', title:'End'}]}
    records={records}

    onRowClick={() => {
      console.log("You clicked a row!")
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
    </Box>
  );
}

export default DataTableMant