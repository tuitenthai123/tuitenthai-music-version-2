import NavbarRoutes from "@/components/Navbar-routes"
import Searchbar from '@/components/Searchbar'
import { MobileSidebar } from "./Mobile-sidebar"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center justify-between bg-white shadow-sm">
      <MobileSidebar />
      <Searchbar label='Tình đầu là, Yêu 5,... ' />
      <NavbarRoutes />
    </div>
  )
}