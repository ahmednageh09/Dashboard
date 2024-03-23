import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axiosConfig'
import CIcon from '@coreui/icons-react'
import {
  cilChevronBottom,
  cilChevronTop,
  cilPlus,
  cilSave,
  cilSettings,
  cilWallpaper,
  cilX,
} from '@coreui/icons'
import { toast } from 'react-toastify'

export default function Categories() {
  const [categoryTitles, setCategoryTitles] = useState({})
  const [childTitles, setChildTitles] = useState({})
  const [categories, setCategories] = useState({})
  const [newCategories, setNewCategories] = useState([])
  const [newChildren, setNewChildren] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosInstance.get('/product/categories')
        let categories = response.data.data.cats
        for (let key in categories) {
          categories[key].showChildren = false
        }
        setCategories(categories)
      } catch {}
    }
    fetchData()
  }, [])

  const handleCategoryTitleChange = (key, e) => {
    setCategoryTitles((prevTitles) => ({
      ...prevTitles,
      [key]: e.target.value,
    }))
  }

  const handleChildTitleChange = (childId, e) => {
    setChildTitles((prevTitles) => ({
      ...prevTitles,
      [childId]: e.target.value,
    }))
  }

  const handleToggle = (key) => {
    setCategories((prevCategories) => {
      const newCategories = { ...prevCategories }
      newCategories[key].showChildren = !newCategories[key].showChildren
      return newCategories
    })
  }

  const removeCat = async (catId) => {
    try {
      await axiosInstance.get(`product/categories/${catId}/delete`)
      console.log(catId)
      setCategories((prevCategories) => {
        const newCategories = { ...prevCategories }
        delete newCategories[catId]
        return newCategories
      })
      toast.success('Category Deleted')
    } catch {
      toast.error('Failed to delete category')
    }
  }

  const handleAddParent = () => {
    const newParent = { title: '', showChildren: false, child: [] }
    setNewCategories([...newCategories, newParent])
  }

  const handleAddChild = (parentKey) => {
    console.log(parentKey)
    const newChild = { id: Date.now(), title: '' }
    const newCategoriesCopy = [...newCategories]
    newCategoriesCopy[parentKey].child.push(newChild)
    setNewChildren([...newChildren, newChild])
  }

  return (
    <>
      <div
        className="d-flex row px-3"
        style={{ borderRadius: '10px', backgroundColor: 'white', width: 'auto' }}
      >
        <div className="d-flex justify-content-evenly row">
          {Object.keys(categories).map(
            (key) =>
              categories[key] && (
                <div
                  key={key}
                  className="row-parent p-2 my-3"
                  style={{
                    width: '90%',
                    borderRadius: '10px',
                    backgroundColor: '#ebedef',
                  }}
                >
                  {/* Main */}
                  <div className="d-flex justify-content-evenly py-2 row-parent-domain">
                    {/* Input of Main */}
                    <div className="col-4 col-lg-6 me-2 d-flex">
                      <input
                        type="text"
                        value={categoryTitles[key] || categories[key].title}
                        onChange={(e) => handleCategoryTitleChange(key, e)}
                        className="form-control shadow-none"
                        style={{
                          borderRadius: '10px 0 0 10px',
                          fontWeight: 'bold',
                          outline: 'none',
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => handleToggle(key)}
                        style={{
                          outline: 'none',
                          border: 'none',
                          padding: '.4rem',
                          borderRadius: '0 10px 10px 0',
                        }}
                      >
                        <CIcon
                          icon={categories[key].showChildren ? cilChevronTop : cilChevronBottom}
                          className="nav-icon"
                        />
                      </button>
                    </div>
                    {/* Buttons of Main */}
                    <div className="d-flex justify-content-between gap-3 my-1">
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{ textWrap: 'nowrap' }}
                        onClick={handleAddParent}
                      >
                        <CIcon icon={cilPlus} className="nav-icon" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeCat(categories[key].id)}
                      >
                        <CIcon icon={cilX} className="nav-icon" />
                      </button>
                      <button type="button" className="btn btn-warning">
                        <CIcon icon={cilSettings} className="nav-icon" />
                      </button>
                      <button type="button" className="btn btn-warning">
                        <span>En</span>
                        <span>Ar</span>
                      </button>
                      <button type="button" className="btn btn-warning">
                        <CIcon icon={cilWallpaper} className="nav-icon" />
                      </button>
                      <button type="button" className="btn btn-success">
                        <CIcon icon={cilSave} className="nav-icon" />
                      </button>
                    </div>
                  </div>
                  {/* Childs */}
                  <div className="row options-parent p-3">
                    {categories[key].showChildren &&
                      categories[key].child &&
                      categories[key].child.map((child, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-evenly m-1 remove-specific-option"
                        >
                          <div className="m-2 col-4 col-lg-5">
                            <input
                              type="text"
                              value={childTitles[child.id] || child.title}
                              onChange={(e) => handleChildTitleChange(child.id, e)}
                              className="form-control shadow-none"
                            />
                          </div>
                          {/* Buttons of Child */}
                          <div className="d-flex justify-content-between gap-3 my-2">
                            <button
                              type="button"
                              className="btn btn-success"
                              style={{ textWrap: 'nowrap' }}
                              onClick={() => handleAddChild(key)}
                            >
                              <CIcon icon={cilPlus} className="nav-icon" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => removeCat(child.id)}
                            >
                              <CIcon icon={cilX} className="nav-icon" />
                            </button>
                            <button type="button" className="btn btn-warning">
                              <CIcon icon={cilSettings} className="nav-icon" />
                            </button>
                            <button type="button" className="btn btn-warning">
                              <span>En</span>
                              <span>Ar</span>
                            </button>
                            <button type="button" className="btn btn-warning">
                              <CIcon icon={cilWallpaper} className="nav-icon" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ),
          )}
        </div>
        <button type="button" className="btn btn-success my-3 ms-5" style={{ width: '4rem' }}>
          Save
        </button>
      </div>
    </>
  )
}
