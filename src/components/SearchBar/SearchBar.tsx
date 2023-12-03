import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from 'lucide-react'


const SearchBar = () => {
  return (
    <form className='flex gap-6'>
      <Input type="text" placeholder="Search" />
      <Button variant={"default"} size="icon" className='w-12'>
        <SearchIcon  className='h-4 w-4'/>
      </Button>
    </form>
  )
}

export default SearchBar