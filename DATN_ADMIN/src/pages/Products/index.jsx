import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button, message, Popconfirm } from 'antd'
import {
  deleteGroup,
  deleteProduct,
  getCities,
  getProducts,
} from '../../api/Cities'
import { Link } from 'react-router-dom'
import { Typography, Divider, Tag, Image } from 'antd'

import { Navigate, useNavigate } from 'react-router-dom'

const { Title } = Typography

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'desc',
  },
  {
    title: 'Images',
    dataIndex: 'img',
    render: (text, record) => <Image width={200} src={record.img} />,
  },
  {
    title: 'Categories',
    dataIndex: 'categories',
    render: (text, record) => {
      return record.categories.map((m) => <Tag color="green">{m}</Tag>)
    },
  },
  {
    title: 'Size',
    dataIndex: 'size',
  },
  {
    title: 'Ingredient',
    dataIndex: 'ingredient',
    render: (text, record) => {
      return record.ingredient.map((m) => <Tag color="volcano">{m}</Tag>)
    },
  },
  {
    title: 'Recommend',
    dataIndex: 'recommend',
    render: (text, record) => {
      return record.recommend.map((m) => <Tag color="green">{m}</Tag>)
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Quanity',
    dataIndex: 'quantity',
  },
  {
    title: 'Favorite',
    dataIndex: 'favorite',
    render: (text, record) => {
      return record.favorite.map((m) => <Tag color="green">{m}</Tag>)
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="small">
        <Link to={`edit/${record._id}`}>
          <Button type="primary">Edit </Button>
        </Link>
        <Popconfirm
          title="Do you want to delete?"
          onConfirm={() => {
            deleteProduct(record._id)
              .then((res) => {
                message.success('Delete successfully')
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
                console.log(res)
              })
              .catch((err) => {
                message.error('Delete failed', err)
              })
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      </Space>
    ),
  },
]
function Products(props) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 0 })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    getProducts().then((res) => {
      console.log(res)

      setData(res.data)
      setLoading(false)
    })
  }, [])
  return (
    <div className="cities">
      <header>
        <Title level={1}>Product</Title>
        <Link to="create">
          <Button type="primary" size="large">
            Add product
          </Button>
        </Link>
      </header>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={{
          defaultCurrent: 1,
          total: data.length,
          defaultPageSize: 2,
        }}
        loading={loading}
        // onChange={handleTableChange}
      />
    </div>
  )
}

Products.propTypes = {}

export default Products
