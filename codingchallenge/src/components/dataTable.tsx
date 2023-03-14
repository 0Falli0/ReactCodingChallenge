import React from 'react';
import Papa from "papaparse"
import { Table } from '@mantine/core';

type Gene = {
  ensembl: string
  gene_symbol: string
  name: string
  biotype: string
  chromosome: string
  start: number
  end: number
}

type Header = {
  ensembl: string
  gene_symbol: string
  name: string
  biotype: string
  chromosome: string
  start: string
  end: string
}

type Data = {
  data: Gene[]
}

function Data_Table() {

  const [values, setValues] = React.useState<Data>()
  const [header, setHeader] = React.useState<Header>()

  const getCSV = () => {
    Papa.parse("genes_human_light.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ";",
      complete: (results: Data) => {
        setValues(results);
        setHeader({ ensembl: "Ensembl",
                    gene_symbol: "Gene Symbol",
                    name: "Name",
                    biotype: "Biotype",
                    chromosome: "Chromosome",
                    start: "Start",
                    end: "End"});
      },
    })
  }

  React.useEffect(() => {
    getCSV()
  }, [])

  const head = (<tr>
    <th>{header?.ensembl}</th>
    <th>{header?.gene_symbol}</th>
    <th>{header?.name}</th>
    <th>{header?.biotype}</th>
    <th>{header?.chromosome}</th>
    <th>{header?.start}</th>
    <th>{header?.end}</th>
  </tr>);

  const rows = values?.data.map((element) => (
    <tr key={element.start}>
      <td>{element.ensembl}</td>
      <td>{element.gene_symbol}</td>
      <td>{element.name}</td>
      <td>{element.biotype}</td>
      <td>{element.chromosome}</td>
      <td>{element.start}</td>
      <td>{element.end}</td>
    </tr>
  ));

  return (
      <Table striped highlightOnHover withBorder>
        <thead>{head}</thead>
        <tbody>{rows}</tbody>
      </Table>
  );
}


export default Data_Table;
