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
  createProduct,
  getCity,
  getProduct,
  updateCity,
  updateProduct,
} from '../../api/Cities'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { set } from 'date-fns'

const { Title } = Typography
const { Option } = Select

const ProductCreate = () => {
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
    // setSke(true)
    // getProduct(id)
    //   .then((res) => {
    //     setSke(false)
    //     setData(res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }, [])
  function showConfirm(values) {
    Modal.confirm({
      title: 'Xác Nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn thêm? ',
      onOk() {
        formik
          .submitForm()
          .then(() => {
            setLoading(true)
            createProduct(formik.values)
              .then((res) => {
                setLoading(false)
                message.success('Thêm thành công')
                navigate(-1)
                console.log(res)
              })
              .catch((err) => {
                message.error('Thêm thất bại', err)
                // navigate(-1)
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
      title: '',
      desc: '',
      img: '',
      categories: [],
      size: '',

      ingredient: [],
      recommend: [],
      price: '',
      quantity: 0,
      favorite: [],
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
              <Title level={1}>Edit product</Title>
            </header>
            <form
              onSubmit={formik.handleSubmit}
              className="cities__create__form"
            >
              <Title level={4} htmlFor="name">
              Name of Product
              </Title>
              <Input
                id="name"
                name="title"
                placeholder="Name of Product"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="error-message">{formik.errors.title}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Description
              </Title>
              <Input
                id="name"
                name="desc"
                placeholder="Description"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.desc}
              />
              {formik.touched.desc && formik.errors.desc ? (
                <div className="error-message">{formik.errors.desc}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Image
              </Title>
              <Input
                id="name"
                name="img"
                placeholder="Link URI"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.img}
              />
              {formik.touched.img && formik.errors.img ? (
                <div className="error-message">{formik.errors.img}</div>
              ) : null}
              <Title level={4} htmlFor="groupID">
                Categories
              </Title>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Categories"
                size="large"
                id="groupID"
                name="categories"
                onChange={(value) => {
                  formik.setFieldValue('categories', value)
                }}
                onBlur={formik.handleBlur}
                value={formik.values.categories}
                open={false}
              >
                {/* {children} */}
              </Select>
              {formik.touched.categories && formik.errors.categories ? (
                <div className="error-message">{formik.errors.categories}</div>
              ) : null}
              <Title level={4} htmlFor="groupID">
                Size
              </Title>
              <Input
                id="name"
                name="size"
                placeholder="Size"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.size}
              />
              {formik.touched.size && formik.errors.size ? (
                <div className="error-message">{formik.errors.size}</div>
              ) : null}
              <Title level={4} htmlFor="groupID">
                Ingredient
              </Title>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Ingredient"
                size="large"
                id="groupID"
                name="ingredient"
                onChange={(value) => {
                  formik.setFieldValue('ingredient', value)
                }}
                onBlur={formik.handleBlur}
                value={formik.values.ingredient}
                open={false}
              >
                {/* {children} */}
              </Select>
              {formik.touched.ingredient && formik.errors.ingredient ? (
                <div className="error-message">{formik.errors.ingredient}</div>
              ) : null}{' '}
              <Title level={4} htmlFor="groupID">
                Recommend
              </Title>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Recommend"
                size="large"
                id="groupID"
                name="recommend"
                onChange={(value) => {
                  formik.setFieldValue('recommend', value)
                }}
                onBlur={formik.handleBlur}
                value={formik.values.recommend}
                open={false}
              >
                {/* {children} */}
              </Select>
              {formik.touched.recommend && formik.errors.recommend ? (
                <div className="error-message">{formik.errors.recommend}</div>
              ) : null}
              <Title level={4} htmlFor="name">
                Price
              </Title>
              <Input
                id="name"
                name="price"
                placeholder="Price"
                type="text"
                size="large"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="error-message">{formik.errors.price}</div>
              ) : null}
              <Space style={{ marginTop: '30px' }}>
                <Button
                  className="save_btn"
                  type="primary"
                  // htmlType="submit"
                  size="large"
                  onClick={showConfirm}
                >
                  Save
                </Button>
                <Button
                  className="cancel_btn"
                  type="danger"
                  size="large"
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </form>
          </div>
        </Spin>
      )}
    </>
  )
}
export default ProductCreate
