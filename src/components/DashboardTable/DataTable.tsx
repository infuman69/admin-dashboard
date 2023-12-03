/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  RowData,
  createColumnHelper
} from "@tanstack/react-table";
import {Dispatch , SetStateAction} from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { RowSelected } from "@/types/rowSelected";
import { UserDataType } from "@/types/UserDatatype";
// import { ColumnDef } from "@tanstack/react-table";

// import { UserDataType } from "@/types/UserDatatype";
import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "../ui/button";
import { Edit, TrashIcon } from "lucide-react";
interface DataTableProps<TData, TValue> {
  // columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setRowSelected: (rowSelected: RowSelected) => void;
  setData: Dispatch<SetStateAction<UserDataType[]>>;
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteRow: (rowIndex: number) => void;
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}


// const EditableCell = ({
//   value: initialValue,
//   row: { index },
//   column: { id },
//   updateMyData, // This is a custom function that we supplied to our table instance
//   editableRowIndex // index of the row we requested for editing
// }:EditableCellProps) => {
//   // We need to keep and update the state of the cell normally
//   const [value, setValue] = React.useState(initialValue);

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   // We'll only update the external data when the input is blurred
//   const onBlur = () => {
//     updateMyData(index, id, value);
//   };

//   // If the initialValue is changed externall, sync it up with our state
//   React.useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   return index === editableRowIndex ? (
//     <input value={value} onChange={onChange} onBlur={onBlur} />
//   ) : (
//     <p>{value}</p>
//   );
// };

// const defaultColumn:Partial<ColumnDef<EditableCellProps >> = {
//   Cell: EditableCell
// };
type EditableCellProps = {
  getValue: () => string;
  row: {
    index: number;
  };
  column: {
    id: string;
  };
  table: {
    options: {
      meta?: {
        updateData: (rowIndex: number, columnId: string, value: string) => void;
      };
    };
  };
};


const EditableCell = ({ getValue, row: { index }, column: { id }, table,editableRowIndex } : any) => {
  const initialValue = getValue()
  // console.log(initialValue)
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)
  const onChange = (e :React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  return index === editableRowIndex ? (
    <input value={value} onChange={onChange} onBlur={onBlur} />
  ) : (
    <p>{value}</p>
  );
}

const columns: ColumnDef<UserDataType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell : EditableCell
  },
  {
    header: "Email",
    accessorKey: "email",
    
  },
  {
    header: "Role",
    accessorKey: "role",
    // cell : EditableCell
    
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row , table}) => {
      console.log(table.options.data)
      return (
        <div className="flex items-center space-x-4">
          <Button
            variant="default"
            size="icon"
            className="bg-white border border-gray-300 hover:bg-gray-100"
            onClick={() => console.log()}
          >
            <Edit className="h-4 w-4" color="black"/>
          </Button>
          <Button
            variant="destructive"
            size={"icon"}
            className="bg-white border border-gray-300 hover:bg-gray-100"
            onClick={() => {
              table.options.meta?.deleteRow(row.index);
            }}
          >
            <TrashIcon className="h-4 w-4" color={"red"}/>
          </Button>
        </div>
      );
    },
  },
];

// const defaultColumn: Partial<ColumnDef<UserDataType> > = {
//   cell: EditableCell,
// }

export function DataTable<TData extends UserDataType, TValue>({
  data,
  setRowSelected,
  setData,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    meta: {
      // write code for deleting individual row
      deleteRow: (rowIndex) => {
        
        setData((prevData : UserDataType[]) => {
          const newData = prevData.filter((item, index) => {
            return index !== rowIndex;
          }) as UserDataType[];
          return newData;
        });
      },
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        // skipAutoResetPageIndex()
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      }
    },
  });
  useEffect(() => {
    setRowSelected(rowSelection);
  }, [rowSelection]);
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default DataTable;
