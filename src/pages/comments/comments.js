import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axiosConfig'
import Modal from '../../components/modal'
import Table from '../../components/table'
import { toast } from 'react-toastify'

export default function Comments() {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [showEdit, SetShowEdit] = useState(false)
  const [editingComment, setEditingComment] = useState('')
  const [replay, setReplay] = useState('')
  const [commentId, setCommentId] = useState(null)
  const [approvedComments, setApprovedComments] = useState({})

  useEffect(() => {
    axiosInstance
      .get('/comments')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [refresh])

  const handleEdit = (comment, id) => {
    SetShowEdit(true)
    setEditingComment(comment)
    setCommentId(id)
  }

  const handleCloseModal = () => {
    SetShowEdit(false)
  }
  const handleReplay = (comment, id) => {
    SetShowEdit(true)
    setEditingComment(comment)
    setCommentId(id)
  }
  const handleApprove = async (id) => {
    try {
      await axiosInstance.patch(`/comments/${id}/approve`)
      setApprovedComments({
        ...approvedComments,
        [id]: !approvedComments[id],
      })
      setRefresh(!refresh)
      toast.success('Comment updated successfully!')
    } catch (error) {
      console.error('Error approving comment:', error)
    }
  }

  return (
    <>
      <Table
        key={refresh}
        path="/comments"
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'User Name', selector: (row) => row.username },
          { name: 'Comment', selector: (row) => row.comment },
          {
            name: 'Approve',
            selector: (row) => (
              <button
                type="button"
                className={`btn ${approvedComments[row.id] ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => handleApprove(row.id)}
              >
                {approvedComments[row.id] ? 'Approved' : 'Not Approved'}
              </button>
            ),
          },
        ]}
        keys={['id', 'username', 'comment', 'published']}
        showActions={true}
        buttonNames={['Replay', 'Edit', 'Delete']}
        actions={[
          (row) => handleReplay(row.comment, row.id),
          (row) => {
            handleEdit(row.comment, row.id)
          },
          async (row) => {
            await axiosInstance.delete(`/comments/${row.id}`)
            setRefresh(!refresh)
            toast.success('Comment deleted successfully!')
          },
        ]}
      />
      {/* Edit Modal */}
      <Modal
        show={showEdit}
        handleClose={() => handleCloseModal()}
        handleAction={async () => {
          await axiosInstance.patch(`comments/${commentId}?comment=${editingComment}`)
          SetShowEdit(false)
          setRefresh(!refresh)
          toast.success('Comment Updated Successfully!')
        }}
        actionButtonTitle="Update"
      >
        <h3>Edit Comment</h3>
        <div className="my-4">
          <input
            style={{
              outline: 'none',
              border: 'none',
              borderRadius: '10px',
              textAlign: 'center',
              padding: '4px',
            }}
            type="text"
            value={editingComment}
            onChange={(event) => setEditingComment(event.target.value)}
          />
        </div>
      </Modal>
      {/* Replay Modal */}
      <Modal
        show={showEdit}
        handleClose={() => handleCloseModal()}
        handleAction={async () => {
          await axiosInstance.post(`comments/${commentId}/reply`, { replay: replay })
          SetShowEdit(false)
          setRefresh(!refresh)
          toast.success('Repaly done Successfully!')
        }}
        actionButtonTitle="Update"
      >
        <h3>Replay</h3>
        <div className="bg-success my-1 p-1 rounded">{editingComment}</div>
        <div className="my-4">
          <input
            style={{
              outline: 'none',
              border: 'none',
              borderRadius: '10px',
              textAlign: 'center',
              padding: '4px',
            }}
            type="text"
            value={replay}
            onChange={(event) => setReplay(event.target.value)}
          />
        </div>
      </Modal>
    </>
  )
}
