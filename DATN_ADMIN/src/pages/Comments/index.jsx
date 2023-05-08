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
import { deleteComment, getComments } from '../../api/Comment'

const { Title } = Typography

const columns = [
  {
    title: 'ProductID',
    dataIndex: 'productId',
  },
  {
    title: 'UserId',
    dataIndex: 'userId',
  },
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Content',
    dataIndex: 'desc',
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
          title="Are you sure to delete comment?"
          onConfirm={() => {
            deleteComment(record._id)
              .then((res) => {
                message.success('Deleted Successfully')
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
                console.log(res)
              })
              .catch((err) => {
                message.error('Deleted Failed', err)
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
function Comments(props) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 0 })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    getComments().then((res) => {
      console.log(res)

      setData(res.data)
      setLoading(false)
    })
  }, [])
  return (
    <div className="cities">
      <header>
        <Title level={1}>Comment</Title>
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

Comments.propTypes = {}

export default Comments
