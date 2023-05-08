import React, { Children, useContext } from 'react'
import { Layout, Menu } from 'antd'
import Navigation from './Navigation'
import { UserContext } from '../context/AuthContext'
import Login from '../pages/Login'
import { Navigate } from 'react-router-dom'
const { Header, Sider, Content } = Layout

const PrivateRouter = ({ children }) => {
  const [auth, setAuth] = useContext(UserContext)
  console.log(Boolean(auth))

  return <>{auth ? <Navigation content={children} /> : <Navigate to="/" />}</>
}

export default PrivateRouter
