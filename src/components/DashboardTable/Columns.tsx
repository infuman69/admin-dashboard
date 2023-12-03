// import { ColumnDef } from "@tanstack/react-table";

// import { UserDataType } from "@/types/UserDatatype";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "../ui/button";
// import { Edit, TrashIcon } from "lucide-react";

// export const columns: ColumnDef<UserDataType>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     header: "Name",
//     accessorKey: "name",
//   },
//   {
//     header: "Email",
//     accessorKey: "email",
//   },
//   {
//     header: "Role",
//     accessorKey: "role",
//   },
//   {
//     id: "Actions",
//     header: "Actions",
//     cell: ({ row , table}) => {
//       console.log(table.options.data)
//       return (
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="default"
//             size="icon"
//             className="bg-white border border-gray-300 hover:bg-gray-100"
//             onClick={() => console.log()}
//           >
//             <Edit className="h-4 w-4" color="black"/>
//           </Button>
//           <Button
//             variant="destructive"
//             size={"icon"}
//             className="bg-white border border-gray-300 hover:bg-gray-100"
//             onClick={() => {
//               table.options.meta?.deleteRow(row.index);
//             }}
//           >
//             <TrashIcon className="h-4 w-4" color={"red"}/>
//           </Button>
//         </div>
//       );
//     },
//   },
// ];
