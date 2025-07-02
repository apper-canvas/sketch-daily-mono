import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const BottomNavigation = () => {
  const navItems = [
    {
      path: '/draw',
      icon: 'Palette',
      label: 'Draw'
    },
    {
      path: '/gallery',
      icon: 'Image',
      label: 'Gallery'
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-3 px-4 transition-colors duration-200 ${
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <ApperIcon
                  name={item.icon}
                  className={`w-6 h-6 mb-1 ${
                    isActive ? 'text-primary-600' : 'text-gray-600'
                  }`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNavigation