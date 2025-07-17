import React from 'react'

function Button({
    children,
    textColor = 'text-white',
    backgroundColor = 'bg-blue-600',
    className,
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${backgroundColor} ${textColor}`} {...props}>{children}</button>
  )
}

export default Button
