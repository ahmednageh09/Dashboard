import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import Table from '../../components/table'
import { axiosInstance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Discounts() {
  const [isFreeActive, setIsFreeActive] = useState(true)
  const [isPrivateActive, setIsPrivateActive] = useState(false)
  const [isPublicActive, setIsPublicActive] = useState(false)
  const [discounts, setDiscounts] = useState({})
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        let path = ''
        if (isFreeActive) {
          path = '/discounts?type=free'
        } else if (isPrivateActive) {
          path = '/discounts?type=private'
        } else if (isPublicActive) {
          path = '/discounts?type=general'
        }

        const response = await axiosInstance.get(path)
        // Map the status to a boolean value
        const activeDiscounts = response.data.data.map((discount) => ({
          ...discount,
          isActive: discount.status !== '',
        }))
        setDiscounts(
          activeDiscounts.reduce((acc, discount) => {
            acc[discount.id] = discount.isActive
            return acc
          }, {}),
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDiscounts()
  }, [refresh, isFreeActive, isPrivateActive, isPublicActive])

  const navigate = useNavigate()

  const handleFreeCode = () => {
    setIsFreeActive(true)
    setIsPrivateActive(false)
    setIsPublicActive(false)
  }

  const handlePrivateCode = () => {
    setIsFreeActive(false)
    setIsPrivateActive(true)
    setIsPublicActive(false)
  }

  const handlePublicCode = () => {
    setIsFreeActive(false)
    setIsPrivateActive(false)
    setIsPublicActive(true)
  }
  const createCode = async (type) => {
    try {
      const fetchData = async () => {
        let response = await axiosInstance.get(`/discounts/create?type=${type}`)
        // setData(response.data.data)
        console.log(response.data.data)
        toast.success('New Code Created')
      }
      fetchData()
    } catch {
      toast.error("There's an Error, Try Again")
    }
  }

  const handleSwitchStatus = async (prodId) => {
    try {
      // Determine the new active status (1 for true,  0 for false)
      const newActiveStatus = !discounts[prodId]

      // Update the local state
      setDiscounts((prevDiscounts) => ({
        ...prevDiscounts,
        [prodId]: newActiveStatus,
      }))

      // Construct the URL with the query parameters
      const url = `/discounts/updateActive?active=${newActiveStatus ? 1 : 0}&id=${prodId}`

      // Send the request to update the active status on the server
      await axiosInstance.get(url)
      toast.success('Status Updated')
    } catch {
      toast.error('Failed to Update Status')
    }
  }

  const handleEdit = async (prodId) => {
    navigate(`/discounts/edit/${prodId}`)
  }
  const handleBenficary = (prodId) => {
    navigate(`/discounts/benficary/${prodId}`)
  }

  const handleDelete = async (prodId, type) => {
    try {
      await axiosInstance.get(`/discount_delete/${prodId}`)
      setRefresh(!refresh)
      toast.success('Discount deleted successfully!')
    } catch (error) {
      console.error('Error deleting discount:', error)
      toast.error('Failed to delete discount. Please try again.')
    }
  }
  const handleEmail = async (id) => {
    await axiosInstance.get(`/discounts/sendMail?id=${id}`)
    toast.success('Email Send Successfully')
  }
  const handleSms = async (id) => {
    await axiosInstance.get(`/discounts/sendSMS?id=${id}`)
    toast.success('SMS Send Successfully')
  }

  return (
    <>
      <div className="m-4">
        <CButton onClick={handleFreeCode} color={isFreeActive ? 'info' : 'secondary'}>
          Free Code
        </CButton>
        <CButton
          onClick={handlePrivateCode}
          className="mx-2"
          color={isPrivateActive ? 'info' : 'secondary'}
        >
          Private Code
        </CButton>
        <CButton onClick={handlePublicCode} color={isPublicActive ? 'info' : 'secondary'}>
          Public Code
        </CButton>
      </div>

      {isFreeActive && (
        <div>
          <CButton className="my-3 ms-5" onClick={() => createCode('free')} color="info">
            Create Free Code
          </CButton>
          <Table
            key={refresh}
            path="/discounts?type=free"
            showFilter={false}
            showDate={false}
            columns={[
              { name: 'Id', selector: (row) => row.id },
              { name: 'Name', selector: (row) => row.name },
              { name: 'Title', selector: (row) => row.title },
              { name: 'Using Times', selector: (row) => row.using_times },
              {
                name: 'Status',
                selector: (row) => (
                  <button
                    type="button"
                    className={`btn ${discounts[row.id] ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => handleSwitchStatus(row.id)}
                  >
                    {discounts[row.id] ? 'Active' : 'Not Active'}
                  </button>
                ),
              },
              { name: 'Bonus Percent', selector: (row) => row.bonus_percent },
              { name: 'Start Date', selector: (row) => row.start_date },
              { name: 'End Date', selector: (row) => row.end_date },
            ]}
            keys={[
              'id',
              'name',
              'title',
              'using_times',
              'status',
              'bonus_percent',
              'start_date',
              'end_date',
            ]}
            showActions={true}
            buttonNames={['Benficary', 'Send Email', 'Send SMS', 'Edit', 'Delete']}
            actions={[
              (row) => handleBenficary(row.id),
              (row) => handleEmail(row.id),
              (row) => handleSms(row.id),
              (row) => handleEdit(row.id),
              (row) => handleDelete(row.id),
            ]}
          />
        </div>
      )}
      {isPrivateActive && (
        <div>
          <CButton className="my-3 ms-5" onClick={() => createCode('private')} color="info">
            Create Private Code
          </CButton>
          <Table
            key={refresh}
            path="/discounts?type=private"
            showFilter={false}
            showDate={false}
            columns={[
              { name: 'Id', selector: (row) => row.id },
              { name: 'Name', selector: (row) => row.name },
              { name: 'Title', selector: (row) => row.title },
              { name: 'Using Times', selector: (row) => row.using_times },
              {
                name: 'Status',
                selector: (row) => (
                  <button
                    type="button"
                    className={`btn ${discounts[row.id] ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => handleSwitchStatus(row.id)}
                  >
                    {discounts[row.id] ? 'Active' : 'Not Active'}
                  </button>
                ),
              },
              { name: 'Bonus Percent', selector: (row) => row.bonus_percent },
              { name: 'Start Date', selector: (row) => row.start_date },
              { name: 'End Date', selector: (row) => row.end_date },
            ]}
            keys={[
              'id',
              'name',
              'title',
              'using_times',
              'status',
              'bonus_percent',
              'start_date',
              'end_date',
            ]}
            showActions={true}
            buttonNames={['Benficary', 'Send Email', 'Send SMS', 'Edit', 'Delete']}
            actions={[
              (row) => handleBenficary(row.id),
              (row) => handleEmail(row.id),
              (row) => handleSms(row.id),
              (row) => handleEdit(row.id),
              (row) => handleDelete(row.id),
            ]}
          />
        </div>
      )}
      {isPublicActive && (
        <div>
          <CButton className="my-3 ms-5" onClick={() => createCode('general')} color="info">
            Create Public Code
          </CButton>
          <Table
            key={refresh}
            path="/discounts?type=general"
            showFilter={false}
            showDate={false}
            columns={[
              { name: 'Id', selector: (row) => row.id },
              { name: 'Name', selector: (row) => row.name },
              { name: 'Title', selector: (row) => row.title },
              { name: 'Using Times', selector: (row) => row.using_times },
              {
                name: 'Status',
                selector: (row) => (
                  <button
                    type="button"
                    className={`btn ${discounts[row.id] ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => handleSwitchStatus(row.id)}
                  >
                    {discounts[row.id] ? 'Active' : 'Not Active'}
                  </button>
                ),
              },
              { name: 'Bonus Percent', selector: (row) => row.bonus_percent },
              { name: 'Start Date', selector: (row) => row.start_date },
              { name: 'End Date', selector: (row) => row.end_date },
            ]}
            keys={[
              'id',
              'name',
              'title',
              'using_times',
              'status',
              'bonus_percent',
              'start_date',
              'end_date',
            ]}
            showActions={true}
            buttonNames={['Benficary', 'Send Email', 'Send SMS', 'Edit', 'Delete']}
            actions={[
              (row) => handleBenficary(row.id),
              (row) => handleEmail(row.id),
              (row) => handleSms(row.id),
              (row) => handleEdit(row.id),
              (row) => handleDelete(row.id),
            ]}
          />
        </div>
      )}
    </>
  )
}
