import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button, Tag, Image, message } from 'antd'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { UsergroupDeleteOutlined, MehOutlined } from '@ant-design/icons'
import { getOrders, updateOrder } from '../../api/Orders'

const { Title } = Typography
const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    width: '20%',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: '20%',
  },
  {
    title: 'User',
    dataIndex: 'userId',
    width: '20%',
    render: (text, record) => {
      console.log(record)
      return (
        <Link to={`/home/users/edit/${record.userId._id}`}>
          {record.userId.email}
        </Link>
      )
    },
  },
  {
    title: 'Products',
    dataIndex: 'products',
    width: '20%',
    render: (text, record) => {
      return (
        <Space direction="vertical">
          {record.products.map((r) => (
            <Space direction="horizontal">
              <Link to={`/home/products/edit/${r.productID._id}`}>
                <Image width={200} src={r.productID.img} />
              </Link>
              <Typography>{`Quantity: ${r.quantity}`}</Typography>
            </Space>
          ))}
        </Space>
      )
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '20%',

    render: (text, record) => {
      if (record.status === 'Succeeded') {
        return (
          <Tag icon={<MehOutlined />} color="blue">
            Succeeded
          </Tag>
        )
      } else {
        return (
          <Tag color="red" icon={<UsergroupDeleteOutlined />}>
            Canceled
          </Tag>
        )
      }
    },
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="small">
        <Button
          onClick={() => {
            updateOrder(record._id, { ...record, status: 'Canceled' })
              .then((res) => {
                message.success('Successfully')
                console.log(res)
              })
              .catch((err) => {
                message.error('Failed', err)
              })
          }}
          type="danger"
        >
          Cancel
        </Button>
      </Space>
    ),
  },
]
function Orders(props) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 0 })
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  useEffect(() => {
    setLoading(true)
    getOrders(pagination.current).then((res) => {
      console.log(res)
      setData(res.data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="cities">
      <header>
        <Title level={1}>Order</Title>
      </header>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        // pagination={pagination}
        loading={loading}
        // onChange={handleTableChange}
      />
    </div>
  )
}

Orders.propTypes = {}

export default Orders
