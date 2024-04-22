/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-implied-eval */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { CButton } from '@coreui/react'
import { axiosInstance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import Modal from 'src/components/modal'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useNavigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import '../products/products.scss'
import MyQuil from 'src/components/myQuil'

export default function Products() {
  const [products, setProducts] = useState([])
  const [originalProducts, setOriginalProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sub_category, setSub_category] = useState([])
  const [selectedCategories, setSelectedCategories] = useState({})
  const [deliverySwitches, setDeliverySwitches] = useState({})
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showImgModal, setShowImgModal] = useState(false)
  const [showTransModalAr, setShowTransModalAr] = useState(false)
  const [showTransModalEn, setShowTransModalEn] = useState(false)
  const [showLabelsModal, setShowLabelsModal] = useState(false)
  const [showStatisticsModal, setShowStatisticsModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [selectedFiles, setSelectedFiles] = useState([])
  const [currentProductId, setCurrentProductId] = useState(null)
  const [brand, setBrand] = useState([])
  const [catTitles, setCatTitles] = useState([])
  const [showDetails, setShowDetails] = useState(true)
  const [showFeatures, setShowFeatures] = useState(false)
  const [showRequest, setShowRequest] = useState(false)
  const [showSimilar, setShowSimilar] = useState(false)
  const [showMeta, setShowMeta] = useState(false)
  const [showColor, setShowColor] = useState(true)
  const [showSize, setShowSize] = useState(false)
  const [selectedButton, setSelectedButton] = useState('details')
  const [statistics, setStatistics] = useState({})
  const [hiddenProducts, setHiddenProducts] = useState([])
  const [interval, setInterval] = useState('All')
  const [weekSelected, setWeekSelected] = useState('currentWeek')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dateForm, setDateForm] = useState({ day: new Date(), month: new Date(), year: new Date() })
  const [text, setText] = useState({ ar: '', en: '', title: '' })
  const [rows, setRows] = useState([
    { name: 'Label 1', value: 'Value 1', active: false },
    { name: 'Label 2', value: 'Value 2', active: false },
  ])

  const navigate = useNavigate()
  const fetchData = useCallback(async () => {
    try {
      let response = await axiosInstance.get('/products')
      let data = await response.data.data
      setProducts(data.products)
      setOriginalProducts(data.products)
      setSub_category(data.sub_category)
      const brands = data.brands
      setBrand(brands)
      const deliveryStatus = {}
      data.products.forEach((product) => {
        deliveryStatus[product.id] = product.is_free_shipping === '1'
      })
      setDeliverySwitches(deliveryStatus)
    } catch {
      toast.error('Something went wrong, try later!')
    }
  })
  useEffect(() => {
    fetchData()
  }, [])

  const stableProducts = useMemo(() => products, [products])
  const stableSubCategory = useMemo(() => sub_category, [sub_category])

  // Getting the corresponding category to its key
  useEffect(() => {
    const initialSelectedCategories = {}
    products.forEach((product) => {
      const categoryNumber = product.category_ids || []
      const category = sub_category[categoryNumber]
      initialSelectedCategories[product.id] = category || null
    })
    setSelectedCategories(initialSelectedCategories)
  }, [stableProducts, stableSubCategory])

  function handleCostChange(productId, event) {
    const newProducts = [...products]
    const index = newProducts.findIndex((product) => product.id === productId)
    newProducts[index].cost = event.target.value
    setProducts(newProducts)
  }
  const handlePriceChange = (productId, event) => {
    const newProducts = [...products]
    const index = newProducts.findIndex((product) => product.id === productId)
    newProducts[index].price_original = event.target.value
    setProducts(newProducts)
  }
  const handleNameChange = (productId, event) => {
    const newProducts = [...products]
    const index = newProducts.findIndex((product) => product.id === productId)
    newProducts[index].product_name = event.target.value
    setProducts(newProducts)
  }
  const handleStockChange = (productId, event) => {
    const newProducts = [...products]
    const index = newProducts.findIndex((product) => product.id === productId)
    newProducts[index].max_count = event.target.value
    setProducts(newProducts)
  }
  const handleDeliverySwitchChange = (productId, checked) => {
    setDeliverySwitches((prevSwitches) => ({
      ...prevSwitches,
      [productId]: checked,
    }))
  }
  const updateProduct = async (product) => {
    try {
      setSelectedCategories((prevCategories) => ({
        ...prevCategories,
        [product.id]: product.category,
      }))

      const updatedProduct = {
        product_id: product.id,
        product_name: product.product_name,
        cost: product.cost,
        price: product.price_original,
        max_count: product.max_count.toString(),
        types: product.product_type,
        mainPhoto: product.mainPhoto,
        is_free_shipping: deliverySwitches[product.id],
        categories: selectedCategories[product.id].split(',')[0],
      }
      const data = await axiosInstance.post('/updateproduct', updatedProduct)
      fetchData()
      toast.success(data.data.message)
    } catch (error) {
      toast.error('Failed to update product, please try again')
    }
  }
  const performSearch = useCallback(() => {
    if (searchTerm === '') {
      setProducts(originalProducts)
    } else {
      const filteredProducts = originalProducts.filter(
        (product) =>
          (product &&
            (product.product_name
              ? product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
              : false)) ||
          (product.category
            ? product.category.toLowerCase().includes(searchTerm.toLowerCase())
            : false),
      )
      setProducts(filteredProducts)
    }
  }, [originalProducts, searchTerm])

  useEffect(() => {
    performSearch()
  }, [performSearch])

  const createNewProduct = () => {
    return {
      mainPhoto: '',
      product_name: 'new product name',
      is_free_shipping: false,
      category_ids: [],
      cost: '1',
      price: 1,
      price_original: 0,
      max_count: 1,
    }
  }
  const newProduct = async (product) => {
    try {
      const response = await axiosInstance.post('/saveproduct', product)
      const newProduct = response.data.data
      setProducts((prevProducts) => [...prevProducts, newProduct])
      fetchData()
      toast.info('New Product Created')
    } catch {
      console.log('Error saving product')
    }
  }
  const deleteProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/product/delete/${productId}`)
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId))
      toast.success('Product deleted successfully')
    } catch {
      toast.error('Error deleting product')
    }
  }
  const filterByStatus = async (status) => {
    try {
      const data = await axiosInstance.get(`/product_status?code=${status}`)
      setProducts(data.data.data.products)
    } catch {
      console.log('error')
    }
  }
  const fetchByBrand = async (brandId) => {
    try {
      let response = await axiosInstance.get(`/product_brand?id=${brandId}`)
      let data = response.data.data
      setProducts(data.products)
      setSub_category(data.sub_category)
      setSelectedCategories({})
    } catch {
      toast.error('Something went wrong, try later!')
    }
  }
  // fetching Categories for filter button
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let response = await axiosInstance.get('/categories')
        let data = response.data.data
        let cats = []
        for (let [key, value] of Object.entries(data)) {
          let childTitles = []
          if (value.child) {
            childTitles = value.child.map((item) => ({
              title: item.title,
              id: item.id,
              sub_category: item.sub_category,
            }))
          }
          cats.push({
            title: value.title,
            id: value.id,
            children: childTitles,
          })
        }
        setCatTitles(cats)
      } catch (error) {
        toast.error('Something went wrong, try later!')
      }
    }

    fetchCategories()
  }, [])
  const filterByCat = async (catId) => {
    try {
      let response = await axiosInstance.get(`/product_category?category=${catId}`)
      let data = response.data.data
      setProducts(data.products)
      setSub_category(data.sub_category)
      setSelectedCategories({})
    } catch {
      toast.error('Something went wrong, try later!')
    }
  }
  const saveMainImg = (proId, e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('product_id', proId)
    formData.append('file', selectedFile)

    axiosInstance
      .post('/product/imagesubmit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setProducts((prevProducts) => {
          const newProducts = [...prevProducts]
          const index = newProducts.findIndex((product) => product.id === proId)
          newProducts[index].mainPhoto = response.data.data
          return newProducts
        })
        toast.success('Product image saved successfully!')
      })
  }
  const saveImgs = async (proId, e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('product_id', proId)
    selectedFiles.forEach((file) => {
      formData.append('files', file)
    })

    axiosInstance
      .post('/product/imagespost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Added Successfully!')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleFileSelection = (event) => {
    setSelectedFiles([...event.target.files])
  }

  const productLink = 'https://api.soin.serv5group.com/ar/product'
  const getOrders = (prodId) => {
    navigate(`/products/productOrder/${prodId}`)
  }
  const getLabelsTranslate = (prodId) => {
    navigate(`/products/labelsTranslate/${prodId}`)
  }
  const getStatistics = async (prodId) => {
    try {
      const res = await axiosInstance.get(
        `/get_status?id=${prodId}&type=${interval}&day=${dateForm.day}&week=${weekSelected}&month=${dateForm.month}&month_year=${dateForm.year}&year=${dateForm.year}`,
      )
      const data = res.data.data
      setStatistics(data)
    } catch (error) {
      console.error(error)
    }
  }
  const getCurrentWeek = () => {
    const today = new Date()
    const startOfWeek = today.getDate() - today.getDay()
    const endOfWeek = startOfWeek + 6

    return {
      start: new Date(today.setDate(startOfWeek)),
      end: new Date(today.setDate(endOfWeek)),
    }
  }
  const getWeeks = () => {
    const today = new Date()
    const startOfWeek = today.getDate() - today.getDay()
    const endOfWeek = startOfWeek + 6
    const startOfLastWeek = startOfWeek - 7
    const endOfLastWeek = endOfWeek - 7

    return {
      currentWeek: {
        start: new Date(today.setDate(startOfWeek)).toISOString().substring(0, 10),
        end: new Date(today.setDate(endOfWeek)).toISOString().substring(0, 10),
      },
      lastWeek: {
        start: new Date(today.setDate(startOfLastWeek)).toISOString().substring(0, 10),
        end: new Date(today.setDate(endOfLastWeek)).toISOString().substring(0, 10),
      },
    }
  }
  const getCurrentMonth = () => {
    const today = new Date()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    return {
      start: startOfMonth,
      end: endOfMonth,
    }
  }
  const handleIntervalSelection = (selectedInterval, e) => {
    let newDate
    switch (selectedInterval) {
      case 'daily':
        newDate = new Date()
        setDateForm({ ...dateForm, day: newDate })
        break
      case 'weekly':
        newDate = getCurrentWeek().start
        setWeekSelected(newDate)
        break
      case 'monthly':
        newDate = new Date()
        newDate.setMonth(parseInt(e.target.value, 10))
        setDateForm((prevState) => ({ ...prevState, month: newDate }))
        break
      case 'yearly':
        newDate = new Date().getFullYear()
        setDateForm((prevState) => ({ ...prevState, year: newDate }))
        break
      default:
        newDate = ''
    }
    setInterval(selectedInterval)
  }
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const toggleDisplayProd = async (prodId) => {
    const res = await axiosInstance.get(`/hidden?id=${prodId}`)
    setHiddenProducts((prevHiddenProducts) => {
      // Check if the product is already hidden
      if (prevHiddenProducts.includes(prodId)) {
        // Remove the product ID from the hidden list
        return prevHiddenProducts.filter((id) => id !== prodId)
      } else {
        // Add the product ID to the hidden list
        toast.info('Product hidden temporarily!')
        return [...prevHiddenProducts, prodId]
      }
    })
  }
  const getTrans = async (lang) => {
    try {
      const data = await axiosInstance.get(`/product/get/lang/value?lang=${lang}&transRow=616`)
      const res = data.data.data
      if (lang === 1) {
        setText({ ...text, en: res.description, title: res.title })
      } else if (lang === 2) {
        setText({ ...text, ar: res.description, title: res.title })
      }
    } catch {
      console.log('err')
    }
  }
  const handleAddRow = () => {
    setRows([...rows, { name: '', value: '', active: '' }])
  }
  const handleRemoveRow = (index) => {
    setRows(rows.filter((row, i) => i !== index))
  }
  const handleLabelNameChange = (event, index) => {
    setRows(rows.map((row, i) => (i === index ? { ...row, name: event.target.value } : row)))
  }
  const handleValueChange = (event, index) => {
    setRows(rows.map((row, i) => (i === index ? { ...row, value: event.target.value } : row)))
  }
  const handleCheckRow = (event, index) => {
    setRows(rows.map((row, i) => (i === index ? { ...row, active: event.target.Checked } : row)))
  }

  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-around flex-column flex-md-row align-items-center gap-3">
          <div className="d-flex justify-content-between gap-2">
            {/* Filter Button */}
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#" className="withDown">
                  Status
                  <Dropdown.Menu className="down status">
                    <Dropdown.Item onClick={() => filterByStatus('all')}>
                      All Products
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => filterByStatus('sale')}>For Sale</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterByStatus('discount')}>
                      Discount
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => filterByStatus('outofstock')}>
                      Out Of Stock
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>

                <Dropdown.Item href="#" className="withDown">
                  Brands
                  <Dropdown.Menu className="down brands">
                    {brand.map((brandObj, index) => (
                      <Dropdown.Item href="#" key={index} onClick={() => fetchByBrand(brandObj.id)}>
                        {brandObj.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item href="#" className="withDown">
                  Categories
                  <Dropdown.Menu className="down cats">
                    {catTitles.map((category, index) => (
                      <Dropdown.Item key={index} style={{ backgroundColor: 'white' }}>
                        <Dropdown.Item
                          variant="link"
                          id={`dropdown-toggle-${index}`}
                          style={{ fontWeight: 'bolder', backgroundColor: '#ebedef' }}
                          onClick={() => filterByCat(category.id)}
                        >
                          {category.title}
                        </Dropdown.Item>
                        {category.children.map((subCategory, index) => (
                          <Dropdown.Item key={index}>
                            <Dropdown.Item
                              variant="link"
                              onClick={() => filterByCat(subCategory.id)}
                            >
                              {subCategory.title}
                            </Dropdown.Item>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* Services Button */}
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Services
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/product/categories" className="withDown">
                  Categories
                </Dropdown.Item>
                <Dropdown.Item href="#" className="withDown">
                  Instagram Sync
                </Dropdown.Item>
                <Dropdown.Item href="#" className="withDown">
                  Google Sync
                </Dropdown.Item>
                <Dropdown.Item href="#" className="withDown">
                  Category Report
                </Dropdown.Item>
                <Dropdown.Item href="#" className="withDown">
                  Product QR Code
                </Dropdown.Item>
                <Dropdown.Item href="#" className="withDown">
                  Translate Labels
                </Dropdown.Item>
                <Dropdown.Item href="#" className="withDown">
                  Color Group
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex justify-content-between gap-2">
            {/* Search Prodcuts */}
            <div className="d-flex align-items-center">
              <input
                type="search"
                placeholder="Prodcut Name"
                onChange={(event) => setSearchTerm(event.target.value)}
                onBlur={performSearch}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    performSearch()
                  }
                }}
                style={{
                  outline: 'none',
                  border: 'none',
                  paddingLeft: '1rem',
                  borderRadius: '12px 0 0 12px',
                  height: '2rem',
                  width: '10rem',
                }}
              />
              <CButton
                onClick={performSearch}
                style={{
                  borderRadius: '0 20px 20px 0',
                  left: '2px',
                  height: '2rem',
                  lineHeight: '14px',
                }}
              >
                Search
              </CButton>
            </div>
            {/* Add Profucts  */}
            <div>
              <CButton className="text-nowrap" onClick={() => newProduct(createNewProduct())}>
                Add Product
              </CButton>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-around row">
          {/* Displaying Products */}
          {products.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <CSpinner color="primary" />
            </div>
          ) : (
            products.map((product) => (
              <>
                <div
                  key={product.id}
                  className={`card ${hiddenProducts.includes(product.id) ? 'dimmed-product' : ''}`}
                  style={{ width: '19rem', height: 'fit-content', margin: '1.4rem' }}
                >
                  <img
                    src={product.mainPhoto}
                    style={{
                      marginTop: '1rem',
                      borderRadius: '8px',
                      height: '18rem',
                      objectFit: 'contain',
                    }}
                    alt="Product"
                    loading="lazy"
                  />
                  <input
                    type="file"
                    id={`proImg-${product.id}`}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button
                    className="btn btn-info mt-1"
                    style={{ whiteSpace: 'nowrap', width: 'fit-content' }}
                    onClick={() => {
                      setShowImgModal(true)
                      setCurrentProductId(product.id)
                    }}
                  >
                    Add Image
                  </button>
                  {/* Moadal of Adding Images */}
                  <Modal
                    show={showImgModal}
                    handleClose={() => {
                      setShowImgModal(false)
                      setSelectedFile()
                      setSelectedFiles([])
                    }}
                    actionButtonTitle="Add"
                    handleAction={() => {
                      fetchData()
                      setShowImgModal(false)
                      setSelectedFile()
                      toast.success('Added Successfully!')
                    }}
                  >
                    {/* Main  Photo Section */}
                    {selectedFile && (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        style={{ maxWidth: '10rem', maxHeight: '14rem', objectFit: 'contain' }}
                      />
                    )}
                    <form onSubmit={(e) => saveMainImg(currentProductId, e)}>
                      <div className="d-flex justify-content-between gap-2 my-2">
                        <label
                          htmlFor="imgInput"
                          className="btn btn-info"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Select Image
                        </label>
                        <input
                          type="file"
                          id="imgInput"
                          style={{ display: 'none' }}
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        <button
                          className="btn btn-success"
                          type="submit"
                          onClick={(e) => saveMainImg(currentProductId, e)}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                    {/* Other Images */}
                    <form>
                      <div className="d-flex justify-content-between gap-2 my-2 row">
                        <div className="d-flex justify-content-around row">
                          {selectedFiles &&
                            selectedFiles.map((file, index) => (
                              <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt="img"
                                style={{
                                  maxWidth: '10rem',
                                  maxHeight: '14rem',
                                  objectFit: 'contain',
                                  margin: '0.3rem',
                                }}
                              />
                            ))}
                        </div>
                        <div className="d-flex justify-content-center gap-2">
                          <label
                            htmlFor="imgsInput"
                            className="btn btn-info"
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            Select Images
                          </label>
                          <button
                            className="btn btn-success"
                            type="submit"
                            onClick={(e) => saveImgs(currentProductId, e)}
                          >
                            Save
                          </button>
                          <input
                            style={{ display: 'none' }}
                            id="imgsInput"
                            type="file"
                            multiple
                            onChange={handleFileSelection}
                          />
                        </div>
                      </div>
                    </form>
                  </Modal>

                  <div className="card-body">
                    <div className="bg-light p-1 rounded">
                      <input
                        type="text"
                        className="card-title ps-2"
                        style={{
                          outline: 'none',
                          border: 'none',
                          background: 'transparent',
                          width: '100%',
                        }}
                        value={product.product_name}
                        onChange={(e) => {
                          handleNameChange(product.id, e)
                        }}
                      />
                    </div>
                    <Dropdown
                      className="m-2"
                      onSelect={(selectedKey) => {
                        var selectedSplit = selectedKey.split(',')
                        setSelectedCategories((prevCategories) => ({
                          ...prevCategories,
                          [product.id]: selectedSplit[0] + ',' + selectedSplit[1],
                        }))
                      }}
                    >
                      <Dropdown.Toggle
                        variant="secondary"
                        data-bs-toggle="tooltip"
                        title={selectedCategories[product.id] || 'Select Category'}
                        style={{
                          width: '100%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        id="dropdown-basic"
                        activekey={selectedCategories[product.id]}
                      >
                        {typeof selectedCategories[product.id] == 'string'
                          ? selectedCategories[product.id]?.split(',')[1] ||
                            selectedCategories[product.id]
                          : selectedCategories[product.id] || 'Select Category'}
                      </Dropdown.Toggle>
                      {/* Categories Menu */}
                      <Dropdown.Menu className="cats">
                        {Object.entries(sub_category).map(([key, value], index) => (
                          <Dropdown.Item key={index} eventKey={key + ',' + value}>
                            {value}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                    <div className="d-flex justify-content-evenly">
                      <label htmlFor="cost" className="p-1">
                        Cost
                      </label>
                      <Form.Control
                        id="cost"
                        className="me-1"
                        style={{ width: '5.4rem' }}
                        type="number"
                        value={product.cost}
                        onChange={(e) => {
                          handleCostChange(product.id, e)
                        }}
                      />
                      <label htmlFor="price" className="p-1">
                        Price
                      </label>
                      <Form.Control
                        id="price"
                        type="number"
                        style={{ width: '5.5rem' }}
                        value={product.price_original}
                        onChange={(e) => handlePriceChange(product.id, e)}
                      />
                    </div>
                    <div className="bg-light m-2 p-2 w-50 rounded">
                      Stock:{' '}
                      <input
                        style={{
                          width: '50%',
                          outLine: 'none',
                          border: 'none',
                          background: 'transparent',
                          paddingLeft: '0.5rem',
                        }}
                        type="number"
                        value={product.max_count}
                        onChange={(e) => handleStockChange(product.id, e)}
                      />
                    </div>
                    <div className="d-flex justify-content-evenly mt-3">
                      <Form.Check className="form-switch">
                        <Form.Check.Input
                          type="checkbox"
                          id={`delivery-switch-${product.id}`}
                          checked={deliverySwitches[product.id]}
                          onChange={(e) => handleDeliverySwitchChange(product.id, e.target.checked)}
                        />
                        <Form.Check.Label htmlFor={`delivery-switch-${product.id}`}>
                          Free Shipping
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                          Action
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              setShowTransModalAr(true)
                              getTrans(2)
                            }}
                          >
                            Translate (AR)
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setShowTransModalEn(true)
                              getTrans(1)
                            }}
                          >
                            Translate (EN)
                          </Dropdown.Item>
                          <Dropdown.Item className="d-flex justify-content-start">
                            <CopyToClipboard text={`${productLink}/${product.id}`}>
                              <span>Get Product Link</span>
                            </CopyToClipboard>
                          </Dropdown.Item>
                          <Dropdown.Item>Duplicate</Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setShowStatisticsModal(true)
                              getStatistics(product.id)
                            }}
                          >
                            Statistics
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => getOrders(product.id)}>
                            Product orders
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => toggleDisplayProd(product.id)}>
                            {hiddenProducts.includes(product.id)
                              ? 'Show product'
                              : 'Hide temporarily'}
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => setShowLabelsModal(true)}>
                            Labels
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              getLabelsTranslate(product.id)
                            }}
                          >
                            Translate labels
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="text-danger"
                            onClick={() => {
                              deleteProduct(product.id)
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <CButton
                        className="btn btn-info"
                        onClick={() => setShowDetailsModal(true)}
                        disabled={hiddenProducts.includes(product.id)}
                      >
                        Details
                      </CButton>

                      <button
                        className="btn btn-success"
                        onClick={() => {
                          updateProduct(product)
                        }}
                        // disabled={hiddenProducts.includes(product.id)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal for product details */}
                <Modal
                  show={showDetailsModal}
                  handleClose={() => setShowDetailsModal(false)}
                  handleAction={async () => {
                    try {
                      await axiosInstance.post('/updateproduct')
                      toast.success('Send Success!')
                    } catch (error) {
                      toast.error('Failed, Please Try Again!')
                    }
                  }}
                >
                  <div>
                    <div className="d-flex justify-content-center align-items-center">
                      <div>
                        <div className="d-flex justify-content-center">
                          <h5>Edit Prodcut Details</h5>
                        </div>
                        <div className={'d-flex justify-content-center gap-2'}>
                          <button
                            className={`btn btn-${
                              selectedButton === 'details' ? 'primary' : 'secondary'
                            }`}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={() => {
                              setShowDetails(true)
                              setShowFeatures(false)
                              setSelectedButton('details')
                            }}
                          >
                            Details
                          </button>
                          <button
                            className={`btn btn-${
                              selectedButton === 'features' ? 'primary' : 'secondary'
                            }`}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={() => {
                              setShowDetails(false)
                              setShowFeatures(true)
                              setSelectedButton('features')
                            }}
                          >
                            Features
                          </button>
                          <button
                            className={`btn btn-${
                              selectedButton === 'request' ? 'primary' : 'secondary'
                            }`}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={() => {
                              setShowDetails(false)
                              setShowFeatures(false)
                              setShowRequest(true)
                              setSelectedButton('request')
                            }}
                          >
                            Request
                          </button>
                          <button
                            className={`btn btn-${
                              selectedButton === 'similar' ? 'primary' : 'secondary'
                            }`}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={() => {
                              setShowDetails(false)
                              setShowFeatures(false)
                              setShowRequest(false)
                              setShowSimilar(true)
                              setSelectedButton('similar')
                            }}
                          >
                            Similar
                          </button>
                          <button
                            className={`btn btn-${
                              selectedButton === 'metaTags' ? 'primary' : 'secondary'
                            }`}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={() => {
                              setShowDetails(false)
                              setShowFeatures(false)
                              setShowRequest(false)
                              setShowSimilar(false)
                              setShowMeta(true)
                              setSelectedButton('metaTags')
                            }}
                          >
                            Meta Tags
                          </button>
                        </div>
                        {showDetails ? (
                          <div className="d-flex align-items-around row m-3 gap-2">
                            <div className="d-flex justify-content-around my-4">
                              <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                  Select Shipping
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">Charged Shipping</Dropdown.Item>
                                  <Dropdown.Item href="#">Free Shipping</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              <div className="d-flex gap-2 align-items-center">
                                <label htmlFor="subject">Weight : </label>
                                <div className="d-flex">
                                  <input
                                    title="Weight"
                                    className="ps-3"
                                    style={{
                                      border: 'none',
                                      outline: 'none',
                                      borderRadius: '10px 0 0 10px ',
                                    }}
                                    id="subject"
                                    // value={subject}
                                    // onChange={(e) => setSubject(e.target.value)}
                                  />
                                  <Dropdown>
                                    <Dropdown.Toggle
                                      style={{ borderRadius: '0 10px 10px 0' }}
                                      variant="info"
                                      id="dropdown-basic"
                                    >
                                      Unit
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#">Gram</Dropdown.Item>
                                      <Dropdown.Item href="#">Kilogram</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center my-3 gap-3">
                              <div className="d-flex gap-2">
                                <label style={{ whiteSpace: 'nowrap' }} htmlFor="message">
                                  Code :{' '}
                                </label>
                                <input
                                  title="Code"
                                  className="ps-3"
                                  style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                  id="subject"
                                />
                              </div>
                              <div className="d-flex gap-2">
                                <label style={{ whiteSpace: 'nowrap' }} htmlFor="message">
                                  Created At :{' '}
                                </label>
                                <input
                                  title="Created at"
                                  className="ps-3"
                                  style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                  id="subject"
                                />
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center gap-4 my-2">
                              <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                  Product
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">Charged Shipping</Dropdown.Item>
                                  <Dropdown.Item href="#">Free Shipping</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                  Country
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">Charged Shipping</Dropdown.Item>
                                  <Dropdown.Item href="#">Free Shipping</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>

                            <div className="d-flex justify-content-center align-items-center row gap-3">
                              <input
                                title="Price"
                                placeholder="Price"
                                className="ps-3 w-50"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                type="number"
                                id="subject"
                              />
                              <input
                                title="Cost"
                                placeholder="Cost"
                                className="ps-3 w-50"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                type="number"
                                id="subject"
                              />
                            </div>

                            <div className="d-flex justify-content-center align-items-center row gap-3 mt-2 ">
                              <input
                                className="ps-3 w-50"
                                title="Discount"
                                placeholder="Discount"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                id="subject"
                                // value={subject}
                                // onChange={(e) => setSubject(e.target.value)}
                              />
                              <input
                                className="ps-3 w-50"
                                title="Points"
                                placeholder="Points"
                                type="number"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                id="subject"
                                // value={subject}
                                // onChange={(e) => setSubject(e.target.value)}
                              />
                              <input
                                className="ps-3 w-50"
                                title="SKU"
                                placeholder="SKU"
                                type="number"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                id="subject"
                                // value={subject}
                                // onChange={(e) => setSubject(e.target.value)}
                              />
                              <input
                                className="ps-3 w-50"
                                title="Description"
                                placeholder="Description"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                type="text"
                                id="subject"
                                // value={subject}
                                // onChange={(e) => setSubject(e.target.value)}
                              />
                              <textarea
                                className="ps-3 w-50"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                id="subject"
                                // value={subject}
                                // onChange={(e) => setSubject(e.target.value)}
                              />
                            </div>
                          </div>
                        ) : showFeatures ? (
                          <div className="">
                            <div>
                              <div className="d-flex gap-2 m-3">
                                <button
                                  className={`btn btn-${showColor ? 'info' : 'secondary'}`}
                                  onClick={() => {
                                    setShowColor(true)
                                    setShowSize(false)
                                  }}
                                >
                                  Color
                                </button>
                                <button
                                  className={`btn btn-${showSize ? 'info' : 'secondary'}`}
                                  onClick={() => {
                                    setShowColor(false)
                                    setShowSize(true)
                                  }}
                                >
                                  Size
                                </button>
                              </div>
                              {showColor ? (
                                <div className="d-flex justify-content-center gap-2 row my-3 mx-5">
                                  <div className="d-flex gap-2">
                                    <label htmlFor="color">Color :</label>
                                    <input id="color" type="color" />
                                  </div>
                                  <input
                                    style={{
                                      border: 'none',
                                      borderRadius: '10px',
                                      outline: 'none',
                                      padding: '0.3rem',
                                    }}
                                    title="name"
                                    placeholder="name"
                                  />
                                  <input
                                    style={{
                                      border: 'none',
                                      borderRadius: '10px',
                                      outline: 'none',
                                      padding: '0.3rem',
                                    }}
                                    title="additional name"
                                    placeholder="additional name"
                                  />
                                  <input
                                    style={{
                                      border: 'none',
                                      borderRadius: '10px',
                                      outline: 'none',
                                      padding: '0.3rem',
                                    }}
                                    title="available quantites"
                                    placeholder="available quantites"
                                  />
                                </div>
                              ) : (
                                <div className="d-flex justify-content-center gap-2 row my-3 mx-5">
                                  <input
                                    style={{
                                      border: 'none',
                                      borderRadius: '10px',
                                      outline: 'none',
                                      padding: '0.3rem',
                                    }}
                                    title="name"
                                    placeholder="name"
                                  />
                                  <input
                                    style={{
                                      border: 'none',
                                      borderRadius: '10px',
                                      outline: 'none',
                                      padding: '0.3rem',
                                    }}
                                    title="additional name"
                                    placeholder="additional name"
                                  />
                                  <input
                                    style={{
                                      border: 'none',
                                      borderRadius: '10px',
                                      outline: 'none',
                                      padding: '0.3rem',
                                    }}
                                    title="available quantites"
                                    placeholder="available quantites"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ) : showRequest ? (
                          <div className="my-3">
                            <Dropdown>
                              <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Add a field
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Charged Shipping</Dropdown.Item>
                                <Dropdown.Item href="#">Free Shipping</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        ) : showSimilar ? (
                          <div className="my-3">
                            <Dropdown>
                              <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Similar product
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Charged Shipping</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        ) : (
                          <div className="my-3">
                            <div className="d-flex row justify-content-between align-items-center m-2">
                              {' '}
                              <input
                                title="Price"
                                placeholder="Price"
                                className="m-2"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                type="number"
                                id="subject"
                              />
                              <input
                                title="Cost"
                                placeholder="Cost"
                                className="m-2"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                type="number"
                                id="subject"
                              />
                              <input
                                title="Cost"
                                placeholder="Cost"
                                className="m-2"
                                style={{ border: 'none', outline: 'none', borderRadius: '10px' }}
                                type="number"
                                id="subject"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Modal>
                {/* Modal for Translate AR*/}
                <Modal show={showTransModalAr} handleClose={() => setShowTransModalAr(false)}>
                  <div className="d-flex justify-content-around row gap-3 my-3">
                    <div>
                      <label htmlFor="title">Title</label>
                      <input
                        id="title"
                        style={{
                          outline: 'none',
                          border: 'none',
                          borderRadius: '4px',
                          marginLeft: '1rem',
                          textOverflow: 'ellipsis',
                          direction: 'rtl',
                        }}
                        value={text.title}
                        onChange={(e) => setText({ ...text, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="des">Description</label>
                      <MyQuil
                        id="des"
                        className="m-3 p-3"
                        value={text.ar}
                        onChange={(value) => setText({ ...text, ar: value })}
                      />
                    </div>
                  </div>
                </Modal>
                {/* Modal for Translate EN*/}
                <Modal show={showTransModalEn} handleClose={() => setShowTransModalEn(false)}>
                  <div className="d-flex justify-content-around row gap-3">
                    <div>
                      <label htmlFor="title">Title</label>
                      <input
                        id="title"
                        style={{
                          outline: 'none',
                          border: 'none',
                          borderRadius: '4px',
                          marginLeft: '1rem',
                        }}
                        value={text.title}
                      />
                    </div>
                    <div>
                      <label htmlFor="des">Description</label>
                      <MyQuil
                        id="des"
                        className="m-3 p-3"
                        value={text.en}
                        onChange={(value) => setText({ ...text, en: value })}
                      />
                    </div>
                  </div>
                </Modal>
                {/* Modal for Labels */}
                <Modal show={showLabelsModal} handleClose={() => setShowLabelsModal(false)}>
                  <div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex justify-content-between col-10 mx-3">
                        <p>Name</p>
                        <p>Value</p>
                        <p>Active</p>
                      </div>
                      <button className="btn btn-success fw-bolder" onClick={handleAddRow}>
                        +
                      </button>
                    </div>
                    {rows.map((row, index) => (
                      <div
                        className="d-flex justify-content-between align-items-center gap-5 my-2"
                        key={index}
                      >
                        <input
                          style={{
                            outline: 'none',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.3rem',
                          }}
                          type="text"
                          value={row.name}
                          onChange={(e) => handleLabelNameChange(e, index)}
                        />
                        <input
                          style={{
                            outline: 'none',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.3rem',
                          }}
                          type="text"
                          value={row.value}
                          onChange={(e) => handleValueChange(e, index)}
                        />
                        <input
                          style={{
                            outline: 'none',
                            border: 'none',
                            borderRadius: '6px',
                          }}
                          type="checkbox"
                          value={row.active}
                          onChange={(e) => handleCheckRow(e, index)}
                        />
                        <button
                          className="btn btn-danger fw-bolder"
                          onClick={() => {
                            handleRemoveRow(index)
                          }}
                        >
                          -
                        </button>
                      </div>
                    ))}
                  </div>
                </Modal>
                {/* Modal for statistics */}
                <Modal
                  show={showStatisticsModal}
                  handleClose={() => setShowStatisticsModal(false)}
                  handleAction={() => getStatistics(product.id)}
                >
                  <div className="d-flex justify-content-between gap-2">
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {interval}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setInterval('All')}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => setInterval('daily')}>Daily</Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setInterval('weekly')
                            setCurrentDate(getCurrentWeek().start)
                          }}
                        >
                          Weekly
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setInterval('monthly')
                            setCurrentDate(getCurrentMonth().start)
                          }}
                        >
                          Monthly
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setInterval('yearly')}>Yearly</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    {interval === 'daily' && (
                      <input
                        style={{
                          textAlign: 'center',
                          outline: 'none',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '5px',
                        }}
                        type="date"
                        value={dateForm.day.toISOString().substring(0, 10)}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value)
                          setDateForm({ ...dateForm, day: selectedDate })
                        }}
                      />
                    )}
                    {interval === 'weekly' && (
                      <Form.Select
                        value={weekSelected}
                        onChange={(e) => {
                          const selectedOption = e.target.value
                          setWeekSelected(selectedOption)
                        }}
                      >
                        <option value="currentWeek">
                          Current week ({getWeeks().currentWeek.start}, {getWeeks().currentWeek.end}
                          )
                        </option>
                        <option value="lastWeek">
                          Last week ({getWeeks().lastWeek.start}, {getWeeks().lastWeek.end})
                        </option>
                      </Form.Select>
                    )}
                    {interval === 'monthly' && (
                      <select
                        style={{
                          outline: 'none',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.5rem',
                        }}
                        value={dateForm.month ? dateForm.month.getMonth() : ''}
                        onChange={(e) => {
                          handleIntervalSelection('monthly', e)
                        }}
                      >
                        {month.map((month, index) => (
                          <option key={index} value={index}>
                            {month}
                          </option>
                        ))}
                      </select>
                    )}
                    {interval === 'yearly' && (
                      <input
                        style={{
                          width: 'fit-content',
                          textAlign: 'center',
                          outline: 'none',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        type="number"
                        value={dateForm.year ? dateForm.year.getUTCFullYear() : ''}
                        onChange={(e) => {
                          const year = parseInt(e.target.value, 10)
                          setDateForm((prevState) => ({
                            ...prevState,
                            year: year ? new Date(year, 0, 2) : null,
                          }))
                        }}
                      />
                    )}
                  </div>

                  <div className="d-flex justify-content-between gap-4 my-4">
                    <div className="bg-success p-2" style={{ borderRadius: '5px' }}>
                      <h3 className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        Sales
                      </h3>
                      <div className="text-center fw-bold">{Number(statistics.sum).toFixed(2)}</div>
                    </div>
                    <div className="bg-success p-2" style={{ borderRadius: '5px' }}>
                      <h3 className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        Orders
                      </h3>
                      <div className="text-center fw-bold">
                        {Number(statistics.order_num).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-success p-2" style={{ borderRadius: '5px' }}>
                      <h3 className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        Benefit
                      </h3>
                      <div className="text-center fw-bold">
                        {Number(statistics.penfit).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </Modal>
              </>
            ))
          )}
        </div>
      </div>
    </>
  )
}
