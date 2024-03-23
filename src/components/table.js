import React, { forwardRef, useEffect, useState } from 'react'
import { axiosInstance } from 'src/axiosConfig'
import DataTable from 'react-data-table-component'
import { CButton } from '@coreui/react'
import './table.scss'
import Styles from '../components/input.module.scss'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilPrint } from '@coreui/icons'

// eslint-disable-next-line react/display-name
const Table = forwardRef(
  (
    {
      showSearch = true,
      showFilter = true,
      showDate = true,
      showPrint = true,
      printAction,
      path = '',
      columns = [],
      keys = [],
      showActions = false,
      buttonNames = [''],
      filter = '',
      actions = [],
    },
    ref,
  ) => {
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [search, setSearch] = useState([])
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(path)
          const newTitle = response.data.message
          setTitle(newTitle)
          const newData = response?.data.data.map((responseData) => {
            const dataObj = keys.reduce((obj, key) => {
              obj[key] = responseData[key]
              return obj
            }, {})
            return dataObj
          })
          setData(newData)
          const filterOptions = new Set(newData.map((row) => row[filter]))
          setOptions(Array.from(filterOptions))
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()

      return
    }, [path, filter, keys])

    const handleSearch = (evt) => {
      const searchTerm = evt.target.value.toLowerCase()
      const newData = data.filter((row) => {
        return Object.values(row).some((field) => String(field).toLowerCase().includes(searchTerm))
      })
      setSearch(newData)
    }

    const handleFilter = (evt) => {
      const selectedValue = evt.target.value
      setSelectedOption(selectedValue)

      const newData = selectedValue
        ? data.filter((row) => row[filter] && row[filter].toLowerCase() === selectedValue)
        : data

      setSearch(newData)
    }

    const handleFromDateChange = (evt) => {
      setFromDate(evt.target.value)

      const newData = data.filter((row) => {
        const rowDate = new Date(row.day)
        const fromDateObj = new Date(fromDate)
        return rowDate >= fromDateObj
      })
      setSearch(newData)
    }

    const handleToDateChange = (evt) => {
      setToDate(evt.target.value)

      const newData = data.filter((row) => {
        const rowDate = new Date(row.day)
        const toDateObj = new Date(toDate)
        return rowDate <= toDateObj
      })
      setSearch(newData)
    }

    const actionButtons = {
      name: 'Actions',
      selector: (row) => row,
      cell: (row) => (
        <div className="d-flex justify-content-between">
          {buttonNames.map((buttonName, index) => (
            <CButton
              className="mx-2 border-0 p-2 rounded-2"
              style={{ whiteSpace: 'nowrap', backgroundColor: '#8296bb' }}
              key={index}
              onClick={() => actions[index](row)}
            >
              {buttonName}
            </CButton>
          ))}
        </div>
      ),
    }

    const allColumns = showActions ? [...columns, actionButtons] : columns

    return (
      <div
        className="p-3 tb"
        style={{ backgroundColor: '#fafafa', borderRadius: '1rem 1rem' }}
        ref={ref}
      >
        <div className="row d-flex flex-wrap justify-content-between">
          <div className="date d-flex flex-wrap justify-content-between align-items-center">
            {showDate && (
              <div className="d-flex justify-content-evenly flex-wrap">
                <div className="me-3">
                  <label htmlFor="from">From</label>
                  <input
                    className={`${Styles.buttonPrint} input`}
                    type="date"
                    id="from"
                    value={fromDate}
                    onChange={handleFromDateChange}
                  />
                </div>
                <div>
                  <label htmlFor="to">To</label>
                  <input
                    className={`${Styles.buttonPrint} input`}
                    type="date"
                    id="to"
                    value={toDate}
                    onChange={handleToDateChange}
                  />
                </div>
              </div>
            )}
            {showSearch && (
              <input
                className={`${Styles.buttonPrint} input search`}
                type="text"
                placeholder="Search"
                onChange={handleSearch}
              />
            )}
            {showFilter && (
              <select className={`${Styles.buttonPrint} select mx-2`} onChange={handleFilter}>
                <option value="">All</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {showPrint && (
              <div onClick={printAction}>
                <CIcon
                  icon={cilPrint}
                  className={`${Styles.buttonPrint} text-info m-2 fw-bolder`}
                />
              </div>
            )}
          </div>
        </div>
        <DataTable
          className={Styles.scrollContainer}
          columns={allColumns}
          data={search.length > 0 ? search : data}
          title={title}
          pagination
          striped
          highlightOnHover
          responsive
          customStyles={{
            header: {
              style: {
                width: 'fit-content',
                margin: 'auto',
                marginBottom: '1rem',
                marginTop: '1rem',
                textAlign: 'center',
                borderRadius: '10rem 10rem',
                boxShadow: '2px 2px 3px 3px #e7e9eb',
              },
            },
            headercells: {
              style: {
                textAlign: 'center',
                color: 'red',
                padding: '30rem',
              },
            },
          }}
        />
      </div>
    )
  },
)
Table.propTypes = {
  showSearch: PropTypes.bool,
  showFilter: PropTypes.bool,
  showDate: PropTypes.bool,
  showActions: PropTypes.bool,
  showPrint: PropTypes.bool,
  printAction: PropTypes.func,
  buttonNames: PropTypes.arrayOf(PropTypes.string),
  path: PropTypes.string,
  columns: PropTypes.array,
  keys: PropTypes.array,
  filter: PropTypes.string,
  setShowModal: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.func),
}
export default Table
