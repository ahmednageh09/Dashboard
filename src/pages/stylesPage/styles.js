import React from 'react'
import ActionButton from '../../components/actionButton/actionButton'
import Table from '../../components/table'
import { useNavigate } from 'react-router-dom'

export default function Styles() {
  const navigate = useNavigate()
  return (
    <>
      <h3>Store Style</h3>
      <ActionButton
        name="Create New Style"
        onClick={() => {
          navigate('/styles/create')
        }}
      />
      <Table path="/styles" />
    </>
  )
}
