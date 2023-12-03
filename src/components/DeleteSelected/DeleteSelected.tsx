import { Button } from '../ui/button'
import { TrashIcon } from 'lucide-react'
import { useDashboard } from '@/context/DashboardContext'

const DeleteSelected = () => {
  const {rowSelected,data,setData} = useDashboard();
  console.log(rowSelected); 
  const deletedSelected = () => {
    const keys = Object.keys(rowSelected);
    const newData = data.filter((item,index) => {
      return keys.indexOf(index.toString()) === -1;
    })

    setData(newData);
  }
  return (
    <Button variant={'destructive'} size={"icon"} disabled={Object.keys(rowSelected).length > 0 ? false : true} onClick={deletedSelected} >
        <TrashIcon className='h-4 w-4'/>
    </Button>
  )
}

export default DeleteSelected