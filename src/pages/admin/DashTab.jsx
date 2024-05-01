import React, { useContext } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MdDeleteOutline } from "react-icons/md";
import 'react-tabs/style/react-tabs.css'; // Import the default style for react-tabs
import { Link, NavLink } from 'react-router-dom';
import MyContext from '../../context/MyContext';

function DashTab() {

  const context = useContext(MyContext)
  const { getProduct, editHandel, deleteProduct, order, user } = context
  console.log(getProduct)
  console.log(order)

  // Dummy data for each tab
  const productsData = [
    { image: 'https://th.bing.com/th?id=OPAC.XazWvXOjewJmdQ474C474&w=592&h=550&o=5&pid=21.1', productId: 'ABC123', name: 'Product 1', price: '$100', description: 'Lorem ipsum', date: '2022-01-01', category: 'Category A' },
    { image: 'https://m.media-amazon.com/images/I/41F05xwUPyL._SY300_SX300_QL70_FMwebp_.jpg', productId: 'DEF456', name: 'Product 2', price: '$150', description: 'Dolor sit amet', date: '2022-01-02', category: 'Category B' },
    // Add more product data as needed
  ];

  const usersData = [
    { id: 1, userId: 'user123', name: 'User 1', email: 'user1@example.com', date: '2022-01-01' },
    { id: 2, userId: 'user456', name: 'User 2', email: 'user2@example.com', date: '2022-01-02' },
    // Add more user data as needed
  ];

  const ordersData = [
    { id: 1, orderId: 'order123', name: 'Order 1', price: '$200', address: '123 Main St', date: '2022-01-01', status: 'Pending' },
    { id: 2, orderId: 'order456', name: 'Order 2', price: '$300', address: '456 Elm St', date: '2022-01-02', status: 'Delivered' },
    // Add more order data as needed
  ];

  return (
    <div className="max-w-7xl mx-auto ">
      <Tabs className="flex flex-col mb-12">
        <TabList className="flex justify-around mb-4">
          <Tab className="px-4 py-2 bg-transparent shadow-md text-xl shadow-white text-cyan-600 rounded-md cursor-pointer hover:text-white hover:shadow-cyan-600 hover:scale-105 transition-all duration-200">Products</Tab>
          <Tab className="px-4 py-2 bg-transparent shadow-md text-xl shadow-white text-cyan-600 rounded-md cursor-pointer hover:text-white hover:shadow-cyan-600 hover:scale-105 transition-all duration-200">Users</Tab>
          <Tab className="px-4 py-2 bg-transparent shadow-md text-xl shadow-white text-cyan-600 rounded-md cursor-pointer hover:text-white hover:shadow-cyan-600 hover:scale-105 transition-all duration-200">Orders</Tab>
        </TabList>

        <TabPanel>
          <h2 className='text-3xl'> All Products ↴</h2>
          <div className='w-full flex justify-end'>
            <NavLink to='/addproduct'>
              <button className="bg-transparent border-solid border-2 font-bold  border-cyan-700 text-white px-4 py-2 rounded-md hover:border-dashed transition-all duration-100 hover:scale-105 hover:bg-white hover:text-cyan-600 " >Add Product</button>
            </NavLink>
          </div>
          <table className="border border-gray-300 mt-4 w-full">
            <thead className="border-2 rounded text-xl text-cyan-400">
              <tr>
                <th className="px-4 border-e py-2 font-bold  text-center">Image</th>
                <th className="px-4 border-e py-2 font-bold text-center">Product ID</th>
                <th className="px-4 border-e py-2 font-bold text-center">Name</th>
                <th className="px-4 border-e py-2 font-bold text-center">Price</th>
                <th className="px-4 border-e py-2 font-bold text-center">Description</th>
                <th className="px-4 border-e py-2 font-bold text-center">Date</th>
                <th className="px-4 border-e py-2 font-bold text-center">Category</th>
                <th className="px-4 border-e py-2 font-bold text-center">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {getProduct.map((product, index) => (
                <tr key={index} className='border-b'>
                  <td className="border-e px-4 py-2  text-center">
                    <img src={product.imageUrl} style={{
                      width: '100%',
                      height:"50px"
                    }} />
                  </td>
                  <td className="px-4 border-e py-2 text-center tracking-tight">{product.id}</td>
                  <td className="px-4 border-e py-2 text-center">{product.title}</td>
                  <td className="px-4 border-e py-2 text-center">{product.price}</td>
                  <td className="px-4 border-e py-2 text-center  tracking-tight">{product.description}</td>
                  <td className="px-4 border-e py-2 text-center">{product.date}</td>
                  <td className="px-4 border-e py-2 text-center">{product.category}</td>
                  <td className="mt-5 border-e px-12 flex  text-2xl justify-around items-center">
                    <NavLink to='/updateproduct'>
                      <FaRegEdit onClick={() => editHandel(product)}  className='cursor-pointer' />
                    </NavLink>
                    <MdDeleteOutline onClick={() => deleteProduct(product)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          <h2 className='text-3xl'> All Users ↴</h2>
          <table className="border border-gray-300 mt-4 w-full">
            <thead className="border-2 text-xl text-cyan-400">
              <tr>
                <th className="px-4 border-e py-2 font-bold text-center">S.No</th>
                <th className="px-4 border-e py-2 font-bold text-center">User ID</th>
                <th className="px-4 border-e py-2 font-bold text-center">Name</th>
                <th className="px-4 border-e py-2 font-bold text-center">Email</th>
                <th className="px-4 border-e py-2 font-bold text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => (
                <tr key={index} className='border-b'>
                  <td className="px-4 border-e py-2 text-center">{index+1}</td>
                  <td className="px-4 border-e py-2 text-center">{user.uid}</td>
                  <td className="px-4 border-e py-2 text-center">{user.name}</td>
                  <td className="px-4 border-e py-2 text-center">{user.email}</td>
                  <td className="px-4 border-e py-2 text-center">{user.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          <h2 className='text-3xl'> All Orders ↴</h2>

          <table className="border border-gray-300 mt-4 w-full">
            <thead className="border-2 text-xl text-cyan-400">
              <tr>
                <th className="px-4 border-e py-2 font-bold text-center">S.No</th>
                <th className="px-4 border-e py-2 font-bold text-center">Order ID</th>
                <th className="px-4 border-e py-2 font-bold text-center">Name</th>
                <th className="px-4 border-e py-2 font-bold text-center">Price</th>
                <th className="px-4 border-e py-2 font-bold text-center">Address</th>
                <th className="px-4 border-e py-2 font-bold text-center">Date</th>
                <th className="px-4  border-e py-2 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {order.map((order, index) => (
                <tr key={index} className='border-b'>
                  <td className="px-4 border-e py-2 text-center">{index + 1}</td>
                  <td className="px-4 border-e py-2 text-center">{order.paymentId}</td>
                  <td className="px-4 border-e py-2 text-center">{order.cartItems[0].title}</td>
                  <td className="px-4 border-e py-2 text-center">{order.cartItems[0].price}</td>
                  <td className="px-4 border-e py-2 text-center">{order.addressInfo.address}</td>
                  <td className="px-4 border-e py-2 text-center">{order.date}</td>
                  <td className="px-4 border-e py-2 text-center">Order placed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

      </Tabs>
    </div>
  );
}

export default DashTab;
