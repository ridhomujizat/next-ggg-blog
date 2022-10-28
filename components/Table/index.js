import React from "react";
import {
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Table,
} from "@chakra-ui/react";

export default function TableComp({ headCell, data }) {
  return (
    <TableContainer background="#646364">
      <Table>
        <Thead>
          <Tr bgColor="blue.900">
            {headCell.map((v) => (
              <Th
                borderColor="white"
                key={v.id}
                textAlign={v.align}
                color="white"
                minW={v.width ?? "unset"}
                fontSize="md"
              >
                {v.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>

          {data?.length === 0 && (
            <Tr>
              <Td
                colSpan={headCell.length}
                borderColor="white"
                color="white"
                fontSize="md"
                textAlign="center"
                height="200px"
              >
                No Data
              </Td>
            </Tr>
          )}
          {data.map((val, i) => (
            <Tr key={i}>
              {headCell.map((v) => (
                <Td
                  borderColor="white"
                  key={v.id}
                  textAlign={v.align}
                  color="white"
                  minW={v.width ?? "unset"}
                  fontSize="md"
                >
                  {v.format ? v.format(val) : val[v.id]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
