import Header from '@/components/molecules/Header'
import BottomNavigation from '@/components/molecules/BottomNavigation'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 lg:pb-6">
        {children}
      </main>
      
      <BottomNavigation />
    </div>
  )
}

export default Layout