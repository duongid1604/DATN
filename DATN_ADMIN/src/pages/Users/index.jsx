import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button, Input, Tag } from 'antd'
import { findUser, getUsers } from '../../api/Users'
import { Link } from 'react-router-dom'
import { Typography, Divider } from 'antd'
import { DebounceInput } from 'react-debounce-input'
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UsergroupDeleteOutlined,
  MehOutlined,
} from '@ant-design/icons'
import Countdown from 'react-countdown'
import { getTimeRangeMilliseconds } from './../../utils/getTimeRange'

const { Title } = Typography
const { Search } = Input
const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '20%',
  },
  {
    title: 'Permission',
    dataIndex: 'admin',
    width: '20%',
    filters: [
      { text: 'Admin', value: true },
      { text: 'User', value: false },
    ],
    render: (text, record) => {
      if (!record.admin) {
        return (
          <Tag icon={<MehOutlined />} color="gold">
            User
          </Tag>
        )
      } else {
        return (
          <Tag color="cyan" icon={<UsergroupDeleteOutlined />}>
            Admin
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
        {!record.admin ? (
          <>
            <Link to={`edit/${record._id}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <Link to={`delete/${record._id}`}>
              <Button type="danger" disabled>
                Delete
              </Button>
            </Link>
          </>
        ) : null}
      </Space>
    ),
  },
]
function Users(props) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 0 })
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  useEffect(() => {
    setLoading(true)
    getUsers(pagination.current).then((res) => {
      console.log(res)
      setData(res.data)
      setLoading(false)
    })
  }, [])
  let handleTableChange = useCallback((pagination, filters, sorter) => {
    setLoading(true)
    console.log(search)
    if (search) {
      findUser(search, pagination.current)
        .then((res) => {
          setLoading(false)
          setData(res.data.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    getUsers(pagination.current)
      .then((res) => {
        setLoading(false)
        setData(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  })
  return (
    <div className="cities">
      <header>
        <Title level={1}>Users</Title>
        {/* <Link to="create">
          <Button type="primary" size="large">
            Thêm Người Dùng
          </Button>
        </Link> */}
        <Search
          placeholder="Search by email"
          allowClear
          // onPressEnter={(e) => {
          //   setLoading(true)
          //   setSearch(e.target.value)
          // }}
          style={{ width: 200 }}
        />
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

Users.propTypes = {}

export default Users
