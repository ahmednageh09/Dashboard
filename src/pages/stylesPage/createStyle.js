import React from 'react'

export default function CreateStyle() {
  return (
    <>
      <div className="m-3 p-4" style={{ backgroundColor: 'white', borderRadius: 14 }}>
        <h3>Store Style</h3>
        <input
          className="my-3"
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: '#ebedef',
            padding: '4px',
            borderRadius: '8px',
          }}
          type="text"
          id="name"
          placeholder="Style Name"
        />
        {/* processes */}
        <div className="d-flex justify-content-around">
          <div className="d-flex gap-3">
            <label htmlFor="from">From</label>
            <input
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: '#ebedef',
                padding: '4px',
                borderRadius: '8px',
              }}
              type="date"
              id="from"
            />
            <label htmlFor="to">To</label>
            <input
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: '#ebedef',
                padding: '4px',
                borderRadius: '8px',
              }}
              type="date"
              id="to"
            />
          </div>
          <div>
            <label className="me-3" htmlFor="active">
              Active
            </label>
            <input type="checkbox" id="active" />
          </div>
        </div>
        {/* Styles */}
        <div className="my-4 ms-4">
          <div>
            <h5>Header</h5>
            <div className="d-flex justify-content-between align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
            <div className="d-flex justify-content-between align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
            <div className="d-flex justify-content-between align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
            <div className="d-flex justify-content-between align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
            <div className="d-flex justify-content-between align-content-center row gap-3 my-3">
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-between gap-4">
                  <label htmlFor="bgColor">Background Color</label>
                  <input id="bgColor" type="color" />
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
              <div className="d-flex justify-content-around align-items-center gap-2 my-4">
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
                  >
                    <option>Default</option>
                    <option>El mesiri</option>
                    <option>Font Awesome</option>
                  </select>
                </div>
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
