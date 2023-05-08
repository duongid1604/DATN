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
import { createNew, getNew } from '../../api/News'
import TextArea from 'antd/lib/input/TextArea'

const { Title } = Typography
const { Option } = Select

const NewCreate = () => {
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
  // useEffect(() => {
  //   setSke(true)
  //   getNew(id)
  //     .then((res) => {
  //       setSke(false)
  //       setData(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  function showConfirm(values) {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want to edit? ',
      onOk() {
        formik
          .submitForm()
          .then(() => {
            setLoading(true)
            createNew(id, formik.values)
              .then((res) => {
                setLoading(false)
                message.success('Added Successfully')
                navigate(-1)
                console.log(res)
              })
              .catch((err) => {
                message.error('Add Failed', err)
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
      mainTitle: data.mainTitle,
      mainImage: data.mainImage,
      headerImage: data.headerImage,
      bodyImage: data.bodyImage,
      noteImage: data.noteImage,
      textHeader: data.textHeader,
      textBody01: data.textBody01,
      textBody02: data.textBody02,
      textBody03: data.textBody03,
      textQuote: data.textQuote,
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
              <Title level={1}>Edit News</Title>
            </header>
            <form
              onSubmit={formik.handleSubmit}
              className="cities__create__form"
            >
              <Title level={4} htmlFor="name">
                News Title
              </Title>
              <Input
                id="name"
                name="mainTitle"
                placeholder="Main Title"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mainTitle}
              />
              {formik.touched.mainTitle && formik.errors.mainTitle ? (
                <div className="error-message">{formik.errors.mainTitle}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Main Image
              </Title>
              <Input
                id="name"
                name="mainImage"
                placeholder="Main Image"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mainImage}
              />
              {formik.touched.mainImage && formik.errors.mainImage ? (
                <div className="error-message">{formik.errors.mainImage}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Header Image
              </Title>
              <Input
                id="name"
                name="headerImage"
                placeholder="Header Image"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.headerImage}
              />
              {formik.touched.headerImage && formik.errors.headerImage ? (
                <div className="error-message">{formik.errors.headerImage}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Body Image
              </Title>
              <Input
                id="name"
                name="bodyImage"
                placeholder="Body Image"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bodyImage}
              />
              {formik.touched.bodyImage && formik.errors.bodyImage ? (
                <div className="error-message">{formik.errors.bodyImage}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Note Image
              </Title>
              <Input
                id="name"
                name="noteImage"
                placeholder="Note Image"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.noteImage}
              />
              {formik.touched.noteImage && formik.errors.noteImage ? (
                <div className="error-message">{formik.errors.noteImage}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Text Header
              </Title>
              <TextArea
                id="name"
                name="textHeader"
                placeholder="Text Header"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.textHeader}
              />
              {formik.touched.textHeader && formik.errors.textHeader ? (
                <div className="error-message">{formik.errors.textHeader}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Text Body01
              </Title>
              <TextArea
                id="name"
                name="textBody01"
                placeholder="Text Body01"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.textBody01}
              />
              {formik.touched.textBody01 && formik.errors.textBody01 ? (
                <div className="error-message">{formik.errors.textBody01}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Text Body02
              </Title>
              <TextArea
                id="name"
                name="textBody02"
                placeholder="Text Body02"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.textBody02}
              />
              {formik.touched.textBody02 && formik.errors.textBody02 ? (
                <div className="error-message">{formik.errors.textBody02}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Text Body03
              </Title>
              <TextArea
                id="name"
                name="textBody03"
                placeholder="Text Body03"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.textBody03}
              />
              {formik.touched.textBody03 && formik.errors.textBody03 ? (
                <div className="error-message">{formik.errors.textBody03}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Text Quote
              </Title>
              <TextArea
                id="name"
                name="textQuote"
                placeholder="Text Quote"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.textQuote}
              />
              {formik.touched.textQuote && formik.errors.textQuote ? (
                <div className="error-message">{formik.errors.textQuote}</div>
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
export default NewCreate
