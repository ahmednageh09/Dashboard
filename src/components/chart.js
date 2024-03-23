import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axiosConfig'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartPie } from '@coreui/react-chartjs'
import PropTypes from 'prop-types'
Chart.propTypes = {
  path: PropTypes.string,
  chartName: PropTypes.string,
  chartType: PropTypes.string,
  showPie: PropTypes.bool,
}

export default function Chart({ path = '/charts', chartName, showPie = true }) {
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [color, setColor] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosInstance.get(path)
        const values = response.data.data[chartName].datasets[0].values
        const labels = response.data.data[chartName].labels
        const colors = response.data.data[chartName].datasets[0].options.backgroundColor
        const title = response.data.data[chartName].datasets[0].name
        setLabels(labels)
        setData(values)
        setColor(colors)
        setName(title)
      } catch {
        console.log(`Failed to load ${chartName} data`)
      }
    }

    fetchData()
  }, [path, chartName])

  return (
    <>
      {showPie ? (
        <CCard className="mb-3 col-md-5 mh-200">
          <CCardBody>
            <div className="d-flex justify-content-center">
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-3" style={{ whiteSpace: 'nowrap' }}>
                    {name}
                  </h4>
                </CCol>
              </CRow>
            </div>
            <div className="d-flex justify-content-center">
              <CChartPie
                data={{
                  labels: [...labels],
                  datasets: [
                    {
                      data: data,
                      backgroundColor: color,
                    },
                  ],
                }}
              />
            </div>
          </CCardBody>
        </CCard>
      ) : (
        <CCard className="mb-3 col-md-5">
          <CCardBody>
            <div className="d-flex justify-content-center">
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0" style={{ whiteSpace: 'nowrap' }}>
                    {name}
                  </h4>
                </CCol>
              </CRow>
            </div>
            <CChartBar
              data={{
                labels: [...labels],
                datasets: [
                  {
                    data: data,
                    backgroundColor: color,
                  },
                ],
              }}
              // labels="months"
              // options={{
              //   plugins: {
              //     legend: {
              //       labels: {
              //         color: getStyle('--cui-body-color'),
              //       },
              //     },
              //   },
              //   scales: {
              //     x: {
              //       grid: {
              //         color: getStyle('--cui-border-color-translucent'),
              //       },
              //       ticks: {
              //         color: getStyle('--cui-body-color'),
              //       },
              //     },
              //     y: {
              //       grid: {
              //         color: getStyle('--cui-border-color-translucent'),
              //       },
              //       ticks: {
              //         color: getStyle('--cui-body-color'),
              //       },
              //     },
              //   },
              // }}
            />
          </CCardBody>
        </CCard>
      )}
    </>
  )
}
