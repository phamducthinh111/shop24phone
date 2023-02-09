import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import routerList from '../router'



export default function ContentShop24h() {
  return (
    <>
      <Routes>
        {routerList.map((router, index) => {
          if(router.path) {
            return <Route key={index} exact path={router.path} element= {router.element}></Route>
          }
        })}
        <Route path='*' element={<Home/>}></Route>
      </Routes>
    </>
  )
}
