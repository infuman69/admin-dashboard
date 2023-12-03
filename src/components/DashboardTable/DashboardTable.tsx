import React from 'react'
import DataTable from './DataTable'
import { useDashboard } from '@/context/DashboardContext'
// import { columns } from './Columns'

const DashboardTable = () => {

  const {data,setRowSelected,setData} = useDashboard();
  
  return (
    <DataTable
      // columns={columns}
      data={data}
      setRowSelected={setRowSelected}
      setData={setData}
    />
  )
}

export default DashboardTable