import React, { useContext, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, Space, Select, InputNumber } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button } from 'antd'

import { login } from '../../api/Login'
import { UserContext } from '../../context/AuthContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Typography, Divider, message, Spin, Modal, Skeleton } from 'antd'
import {
  createCity,
  getCity,
  getProduct,
  updateCity,
  updateProduct,
} from '../../api/Cities'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { set } from 'date-fns'
import { getComment, updateComment } from '../../api/Comment'
import TextArea from 'antd/lib/input/TextArea'

const { Title } = Typography
const { Option } = Select

const CommentEdit = () => {
  let { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [ske, setSke] = useState(false)
  // const renderOptions = (e) => {
  //   e.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
  // }
  // function handleChangePrivate(value) {
  //   formik.setFieldValue('privateGroupID', value)
  // }
  // function handleChangePublic(value) {
  //   formik.setFieldValue('publicGroupID', value)
  // }
  useEffect(() => {
    setSke(true)
    getComment(id)
      .then((res) => {
        setSke(false)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  function showConfirm(values) {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to edit? ',
      onOk() {
        formik
          .submitForm()
          .then(() => {
            setLoading(true)
            updateComment(id, formik.values)
              .then((res) => {
                setLoading(false)
                message.success('Edited Successfully')
                navigate(-1)
                console.log(res)
              })
              .catch((err) => {
                message.error('Edited Fail', err)
                navigate(-1)
                setLoading(false)
              })
          })
          .catch((e) => {
            console.log(e)
            setLoading(false)
          })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      userId: data.userId,
      productId: data.productId,
      username: data.username,
      desc: data.desc,
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      title: Yup.string()
        .required('Bạn chưa tên Sản phẩm')
        .min(6, 'Tên sản phẩm không được nhỏ hơn 6 kí tự')

        .max(100, 'Tên sản phẩm không được quá 100 kí tự'),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, { validate }) => {
      // showConfirm(values, validate)
    },
  })
  return (
    <>
      {ske ? (
        <Skeleton />
      ) : (
        <Spin tip="Loading..." spinning={loading}>
          <div className="cities__create">
            <header>
              <Title level={1}>Edit Comment</Title>
            </header>
            <form
              onSubmit={formik.handleSubmit}
              className="cities__create__form"
            >
              <Title level={4} htmlFor="name">
                User ID
              </Title>
              <Input
                id="name"
                name="title"
                placeholder="User ID"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userId}
              />
              {formik.touched.userId && formik.errors.userId ? (
                <div className="error-message">{formik.errors.userId}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Product ID
              </Title>
              <Input
                id="name"
                name="desc"
                placeholder="Product ID"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productId}
              />
              {formik.touched.productId && formik.errors.productId ? (
                <div className="error-message">{formik.errors.productId}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Username
              </Title>
              <Input
                id="name"
                name="desc"
                placeholder="username"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error-message">{formik.errors.username}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Content
              </Title>
              <TextArea
                id="name"
                name="desc"
                placeholder="Content"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.desc}
              />
              {formik.touched.desc && formik.errors.desc ? (
                <div className="error-message">{formik.errors.desc}</div>
              ) : null}
              <Space style={{ marginTop: '30px' }}>
                <Button
                  className="save_btn"
                  type="primary"
                  // htmlType="submit"
                  size="large"
                  onClick={showConfirm}
                >
                  Lưu
                </Button>
                <Button
                  className="cancel_btn"
                  type="danger"
                  size="large"
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  Hủy
                </Button>
              </Space>
            </form>
          </div>
        </Spin>
      )}
    </>
  )
}
export default CommentEdit
