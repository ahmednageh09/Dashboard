import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axiosConfig'

export default function Templates() {
  const [template, setTemplate] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get('/design').then((res) => {
        console.log(res.data.data.setting_template)
        setTemplate(res.data.data.setting_template)
      })
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="m-3 p-4" style={{ backgroundColor: 'white', borderRadius: 14 }}>
        <h3>Store Design</h3>
        <div className="my-4 ms-4">
          <div>
            <h5>Header</h5>
            <div className="d-flex justify-content-between mx-3 align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-5">
                  <label htmlFor="bgColor">Background Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.header_background_color}
                    onChange={(e) => setTemplate(e.template?.header_background_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Font Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.header_font_color}
                    onChange={(e) => setTemplate(e.template?.header_font_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Icon Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.header_icon_color}
                    onChange={(e) => setTemplate(e.template?.header_icon_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h5>Category Card</h5>
            <div className="d-flex justify-content-between mx-3 align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.category_background_color}
                    onChange={(e) => setTemplate(e.template?.category_background_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Font Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.category_font_color}
                    onChange={(e) => setTemplate(e.template?.category_font_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color Hover</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.category_background_color_hover}
                    onChange={(e) => setTemplate(e.template?.category_background_color_hover)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Font Color Hover</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.category_font_color_hover}
                    onChange={(e) => setTemplate(e.template?.category_font_color_hover)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h5>Product Card</h5>
            <div className="d-flex justify-content-between mx-3 align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.product_background_color}
                    onChange={(e) => setTemplate(e.template?.product_background_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Font Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.product_font_color}
                    onChange={(e) => setTemplate(e.template?.product_font_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Icon Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.product_icon_color}
                    onChange={(e) => setTemplate(e.template?.product_icon_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Add To Cart Background Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.product_add_background_color}
                    onChange={(e) => setTemplate(e.template?.product_add_background_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Add To Cart Font Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.product_add_font_color}
                    onChange={(e) => setTemplate(e.template?.product_add_font_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Out Of Stock Background Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.product_out_background_color}
                    onChange={(e) => setTemplate(e.template?.product_out_background_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Out Of Stock Font Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.product_out_font_color}
                    onChange={(e) => setTemplate(e.template?.product_out_font_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h5>Footer</h5>
            <div className="d-flex justify-content-between mx-3 align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.footer_background_color}
                    onChange={(e) => setTemplate(e.template?.footer_background_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Font Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.footer_font_color}
                    onChange={(e) => setTemplate(e.template?.footer_font_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Icon Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.footer_icon_color}
                    onChange={(e) => setTemplate(e.template?.footer_icon_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h5>Basic</h5>
            <div className="d-flex justify-content-between mx-3 align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Font Color</label>
                  <input
                    id="bgColor"
                    type="color"
                    value={template?.store_color}
                    onChange={(e) => setTemplate(e.template?.store_color)}
                  />
                </div>
                <div className="form-check form-switch d-flex gap-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDefault"
                  />
                  <label className="form-check-label" htmlFor="switchDefault">
                    Default
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-2 my-4">
                <div>
                  <label htmlFor="bgColor">Store Font</label>
                  <select
                    className="ms-3"
                    style={{
                      outline: 'none',
                      border: 'none',
                      borderRadius: '8px',
                      backgroundColor: '#ebedef',
                      padding: '4px',
                    }}
                    value={template?.store_font}
                    onChange={(e) => setTemplate(e.template?.store_font)}
                  >
                    <option>Default</option>
                    <option>El mesiri</option>
                    <option>Font Awesome</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bgColor">Store main menu</label>
                  <select
                    className="ms-3"
                    style={{
                      outline: 'none',
                      border: 'none',
                      borderRadius: '8px',
                      backgroundColor: '#ebedef',
                      padding: '4px',
                    }}
                  >
                    <option>Default</option>
                    <option>El mesiri</option>
                    <option>Font Awesome</option>
                  </select>
                </div>
              </div>
              <div className="form-check form-switch d-flex gap-5 ms-5">
                <label className="form-check-label" htmlFor="switchDefault">
                  Show (all button) on the home page
                </label>
                <input
                  className="form-check-input ms-2"
                  type="checkbox"
                  role="switch"
                  id="switchDefault"
                  value={template?.show_all_button}
                  onChange={(e) => setTemplate(e.template?.show_all_button)}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-info me-2">Preview</button>
        <button className="btn btn-success">Save</button>
      </div>
    </>
  )
}
