import React, {useMemo} from 'react'
import {Table} from '@mantine/core';
import {MantineReactTable, MRT_ColumnDef} from 'mantine-react-table'
import {Box, Button, Menu, Text, Title} from "@mantine/core"
import {IconUserCircle, IconSend} from '@tabler/icons-react'
import DetailsButton from './DetailsButton';

export default function InformationTable() {

    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
      ];

      const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.position}</td>
          <td>{element.name}</td>
          <td>{element.symbol}</td>
          <td>{element.mass}</td>
          <DetailsButton/>
        </tr>
      ));

      return (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Element position</th>
              <th>Element name</th>
              <th>Symbol</th>
              <th>Atomic mass</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
              {rows}
          </tbody>
        </Table>
      );
}
