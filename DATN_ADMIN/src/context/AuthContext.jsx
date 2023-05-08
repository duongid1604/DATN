import React, { createContext, useState } from 'react'

export const UserContext = createContext()
export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(localStorage.getItem('auth') || null)
  return (
    <UserContext.Provider value={[auth, setAuth]}>
      {children}
    </UserContext.Provider>
  )
}
