import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import DashTab from './DashTab'
import MyContext from '../../context/MyContext'

function Dashboard() {
  const context = useContext(MyContext)
  const { getProduct } = context
  return (
    <Layout>
      <div className=" button-container w-full flex justify-around mb-8 pb-12 mt-32 shadow-2xl">
        <button className="button text-2xl px-10 py-7 ">Product <span>({getProduct.length})</span></button>
        <button className="button text-2xl px-10 py-7 ">Users <span>(0)</span></button>
        <button className="button text-2xl px-10 py-7 ">Orders <span>(0)</span></button>
      </div>
      <DashTab/>
    </Layout>
  )
}

export default Dashboard