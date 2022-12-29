import { useContext } from "react"

import { AuthContext, AuthProvider } from "./Context/useContext"

import { Routes } from "./routes"

export const App = () => {
  return(
    // <AuthProvider>
    // </AuthProvider>
      <Routes />
  )
} 