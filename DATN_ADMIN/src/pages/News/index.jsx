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
import { getNews } from '../../api/News'

const { Title } = Typography

const columns = [
  {
    title: 'Main Title',
    dataIndex: 'mainTitle',
  },
  {
    title: 'Main Image',
    dataIndex: 'mainImage',
    render: (text, record) => <Image width={200} src={record.mainImage} />,
  },
  {
    title: 'Header Image',
    dataIndex: 'headerImage',
    render: (text, record) => <Image width={200} src={record.headerImage} />,
  },
  {
    title: 'Body Image',
    dataIndex: 'bodyImage',
    render: (text, record) => <Image width={200} src={record.bodyImage} />,
  },
  {
    title: 'Note Image',
    dataIndex: 'noteImage',
    render: (text, record) => <Image width={200} src={record.noteImage} />,
  },
  {
    title: 'Text Header',
    dataIndex: 'textHeader',
  },
  {
    title: 'Text Body01',
    dataIndex: 'textBody01',
  },
  {
    title: 'Text Body02',
    dataIndex: 'textBody02',
  },
  {
    title: 'Text Body03',
    dataIndex: 'textBody03',
  },
  {
    title: 'Text Quote',
    dataIndex: 'textQuote',
  },
  {
    title: 'Actions',
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
function News(props) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 0 })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    getNews().then((res) => {
      console.log(res)

      setData(res.data)
      setLoading(false)
    })
  }, [])
  return (
    <div className="cities">
      <header>
        <Title level={1}>News</Title>
        <Link to="create">
          <Button type="primary" size="large">
            Add News
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
        scroll={{ x: 1200 }}
        // onChange={handleTableChange}
      />
    </div>
  )
}

News.propTypes = {}

export default News
