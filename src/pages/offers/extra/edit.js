import React, { useEffect, useState } from 'react'
import styles from '../../../components/input.module.scss'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../../axiosConfig'

export default function Edit() {
  const offer = useParams()
  const [data, setData] = useState()
  const [activeButton, setActiveButton] = useState('en')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get(`/offers/${offer.id}/edit`).then((res) => {
          setData(res.data.data)
          console.log(res.data.data.html)
        })
      } catch {}
    }
    fetchData()
  }, [])
  useEffect(() => {
    if (data?.html) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(data.html, 'text/html')

      doc.querySelectorAll('ul').forEach((ul) => {
        const button = document.createElement('button')
        button.textContent = ul.textContent
        button.onclick = () => {
          console.log('Button clicked:', ul.textContent)
        }
        ul.replaceWith(button)
      })
      doc.querySelectorAll('li').forEach((li) => {
        li.classList.add('btn')
        // li.classList.add('btn-success')
      })
      const modifiedHtml = doc.body.innerHTML

      setData((prevData) => ({
        ...prevData,
        html: modifiedHtml,
      }))
    }
  }, [data?.html])
  return (
    <>
      <div className="bg-white rounded-3 p-2 my-3">
        <h3 className="p-2">Edit Extra Offer</h3>
        <div>
          <button
            className={`btn ${activeButton === 'en' ? 'btn-success' : 'btn-secondary'} m-2`}
            onClick={() => setActiveButton('en')}
          >
            EN
          </button>
          <button
            className={`btn ${activeButton === 'ar' ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setActiveButton('ar')}
          >
            AR
          </button>
        </div>
        <div className="d-flex justify-content-around row m-3 gap-2">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className={styles.inpt}
              style={{ backgroundColor: '#ebedef', width: 'fit-content' }}
              value={data?.offer.title[activeButton]}
              onChange={(e) => setData(e.data?.offer.title.ar)}
            />
          </div>
          <div>
            <label htmlFor="img">Image</label>
            <input
              id="img"
              type="file"
              className={styles.inpt}
              style={{ backgroundColor: '#ebedef', outline: 'none' }}
            />
          </div>
          <div className="d-flex justify-content-around">
            <div>
              <label htmlFor="start">Start Date</label>
              <input
                id="start"
                type="date"
                value={
                  data?.offer.start_date
                    ? new Intl.DateTimeFormat('en-CA').format(new Date(data?.offer.start_date))
                    : ''
                }
                className={styles.inpt}
                style={{ backgroundColor: '#ebedef', outline: 'none' }}
              />
            </div>
            <div>
              <label htmlFor="end">End Date</label>
              <input
                id="end"
                type="date"
                value={
                  data?.offer.start_date
                    ? new Intl.DateTimeFormat('en-CA').format(new Date(data?.offer.end_date))
                    : ''
                }
                className={styles.inpt}
                style={{ backgroundColor: '#ebedef', outline: 'none' }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <div className="d-flex justify-content-around align-items-center me-3 my-3">
              <label htmlFor="codeUsed">Number of code uses</label>
              <input
                id="codeUsed"
                type="range"
                value={data?.offer.offer_limit}
                onChange={(e) =>
                  setData({ ...data, offer: { ...data.offer, offer_limit: e.target.value } })
                }
                className={styles.inpt}
                style={{ backgroundColor: '#ebedef', outline: 'none' }}
              />
              <span className="bg-secondary rounded-3 p-1 me-3">{data?.offer.offer_limit}</span>
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <label htmlFor="clientUses">Number of Client uses</label>
              <input
                id="clientUses"
                type="range"
                value={data?.offer.user_times}
                onChange={(e) =>
                  setData({ ...data, offer: { ...data.offer, user_times: e.target.value } })
                }
                className={styles.inpt}
                style={{ backgroundColor: '#ebedef', outline: 'none' }}
              />
              <span className="bg-secondary rounded-3 p-1 me-3">{data?.offer.user_times}</span>
            </div>
          </div>
          <div className="d-flex justify-content-evenly align-items-center">
            <div>
              <label htmlFor="bouns">Bonus</label>
              <input
                id="bouns"
                type="number"
                value={data?.offer.bonus}
                onChange={(e) => setData(e.data?.offer.bonus)}
                className={styles.inpt}
                style={{ backgroundColor: '#ebedef', outline: 'none' }}
              />
            </div>
            <div>
              <label htmlFor="percent">%</label>
              <input
                id="percent"
                type="radio"
                checked={data?.offer.calc_type === 'perc' ? true : false}
                style={{ backgroundColor: '#ebedef', outline: 'none', margin: '0.6rem' }}
              />
              <label htmlFor="money">SAR</label>
              <input
                id="money"
                type="radio"
                checked={data?.offer.calc_type === 'net' ? true : false}
                style={{ backgroundColor: '#ebedef', outline: 'none', margin: '0.6rem' }}
              />
            </div>
          </div>
          <div className="d-flex row gap-2">
            <div className="d-flex justify-content-start gap-5">
              <label className="d-flex ">Bank :</label>
              {data?.banks.map((e) => (
                <div key={e.id} className="d-flex gap-2">
                  <label htmlFor="bouns">{e.title}</label>
                  <input
                    id="bouns"
                    type="checkbox"
                    checked
                    style={{ backgroundColor: '#ebedef', outline: 'none' }}
                  />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-start gap-3">
              <label>Payments :</label>
              {data?.payment_gates.map((e) => (
                <div key={e.id} className="d-flex gap-2">
                  <label htmlFor="bouns">{e.name}</label>
                  <input
                    id="bouns"
                    type="checkbox"
                    checked
                    style={{ backgroundColor: '#ebedef', outline: 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <h6 className="m-3">Apply this offer to</h6>
        <div className="d-flex justify-content-center gap-3">
          <label htmlFor="all">All Products</label>
          <input
            id="all"
            type="radio"
            className={styles.inpt}
            style={{ backgroundColor: '#ebedef', outline: 'none' }}
          />
          <label htmlFor="selected">Selected Products</label>
          <input
            id="selected"
            type="radio"
            className={styles.inpt}
            style={{ backgroundColor: '#ebedef', outline: 'none' }}
          />
        </div>
        <div className="ms-4">
          <div className="d-flex justify-content-start align-items-center gap-3">
            <label>Price :</label>
            <div>
              <label>Min</label>
              <input
                type="number"
                className={styles.inpt}
                style={{ backgroundColor: '#ebedef', width: '3.5rem' }}
              />
              <label>Max</label>
              <input
                type="number"
                className={styles.inpt}
                style={{ backgroundColor: '#ebedef', width: '3.5rem' }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-3">
            <label>Commission :</label>
            <div>
              <label>Min</label>
              <input
                type="number"
                className={styles.inpt}
                style={{ backgroundColor: '#ebedef', width: '3.5rem' }}
              />
              <label>Max</label>
              <input
                type="number"
                className={styles.inpt}
                style={{ backgroundColor: '#ebedef', width: '3.5rem' }}
              />
            </div>
          </div>
          <button className="btn btn-success m-3">Filter</button>
          <div dangerouslySetInnerHTML={{ __html: data?.html }} />
        </div>
      </div>
    </>
  )
}
