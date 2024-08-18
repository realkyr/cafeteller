import React from 'react'

interface ShowProps {
  when: boolean
  children: React.ReactNode
}
const Show = ({ children, when }: ShowProps) => {
  return when ? children : null
}

export default Show
