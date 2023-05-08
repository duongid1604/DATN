import React, { useCallback, useEffect, useState } from 'react'
import { Typography } from 'antd'

import { getInCome } from '../api/Orders'
import { Column } from '@ant-design/plots'
import { getMonthName } from '../utils/getTimeRange'
const { Title } = Typography

function InCome(props) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 0 })
  const [loading, setLoading] = useState(false)
  const config = {
    data,
    xField: 'month',
    yField: 'total',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'Month',
      },
      total: {
        alias: 'Total',
      },
    },
  }
  useEffect(() => {
    setLoading(true)
    getInCome().then((res) => {
      setData(
        res.data.map((r) => {
          return { ...r, month: getMonthName(r._id) }
        })
      )
      setLoading(false)
    })
  }, [])

  return (
    <div className="cities">
      <header>
        <Title level={1}>InCome</Title>
      </header>
      <Column {...config} />
    </div>
  )
}

InCome.propTypes = {}

export default InCome
