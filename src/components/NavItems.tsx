'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  const navRef = useRef<HTMLDivElement | null>(null)

  const isAnyOpen = activeIndex !== null

  useOnClickOutside(navRef, () => setActiveIndex(null))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  return (
    <div className='flex gap-4 h-full' ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null)
          } else {
            setActiveIndex(index)
          }
        }

        const isOpen = index === activeIndex

        return (
          <NavItem
            key={category.value}
            isOpen={isOpen}
            category={category}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
          />
        )
      })}
    </div>
  )
}

export default NavItems
