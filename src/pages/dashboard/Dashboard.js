import React from 'react'
import { CCol } from '@coreui/react'
import Table from '../../components/table'
import Card from '../../components/card'
import Chart from '../../components/chart'

export default function Dashboard() {
  return (
    <>
      <div className="row d-flex justify-content-evenly h-50">
        <Card indices={['total', 'products']} path={'/charts'} />
      </div>

      <div className="row d-flex justify-content-evenly mb-4">
        {/* Charts */}
        <div className="row d-flex justify-content-evenly mb-4">
          <Chart chartName="store_statistics_chart" />
          <Chart chartName="orders_chart" />
          <Chart chartName="abandoned_carts_chart" showPie={false} />
          <Chart chartName="profit_chart" showPie={false} />
          <Chart chartName="shipping_fee_chart" showPie={false} />
          <Chart chartName="store_visits_chart" showPie={false} />
          <Chart chartName="tax_amount_chart" showPie={false} />
        </div>

        {/* Tables */}
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/salesSearch"
            showFilter={false}
            showPrint={false}
            columns={[
              { name: 'ID', selector: (row) => row.id },
              { name: 'Day', selector: (row) => row.day },
              { name: 'Products Count', selector: (row) => row.products_count },
              { name: 'Total', selector: (row) => row.total },
            ]}
            keys={['id', 'day', 'products_count', 'total']}
          />
        </CCol>
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/lastOrders"
            showFilter={false}
            showPrint={false}
            columns={[
              { name: 'ID', selector: (row) => row.id },
              { name: 'Order.No', selector: (row) => row.ordernumber },
              { name: 'Products Count', selector: (row) => row.products_count },
              { name: 'Total', selector: (row) => row.total },
              { name: 'Status', selector: (row) => row.status },
            ]}
            keys={['id', 'ordernumber', 'products_count', 'total', 'status']}
          />
        </CCol>
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/wordsSearch"
            showDate={false}
            showFilter={false}
            showPrint={false}
            columns={[
              { name: 'ID', selector: (row) => row.id },
              { name: 'Word Search', selector: (row) => row.word },
              { name: 'No.times Searched', selector: (row) => row.words_total },
              { name: 'Date', selector: (row) => row.day },
            ]}
            keys={['id', 'word', 'words_total', 'day']}
          />
        </CCol>
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/wordsSearch?type=last_words_search"
            showDate={false}
            showFilter={false}
            showPrint={false}
            columns={[
              { name: 'ID', selector: (row) => row.id },
              { name: 'Word Search', selector: (row) => row.word },
              { name: 'No.times Searched', selector: (row) => row.words_total },
              { name: 'Date', selector: (row) => row.day },
            ]}
            keys={['id', 'word', 'words_total', 'day']}
          />
        </CCol>
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/soldProducts"
            showFilter={false}
            showPrint={false}
            columns={[
              { name: 'ID', selector: (row) => row.id },
              { name: 'Product ID', selector: (row) => row.product_id },
              { name: 'No.Products', selector: (row) => row.count },
              { name: 'Price', selector: (row) => row.price },
              { name: 'Date', selector: (row) => row.day },
            ]}
            keys={['id', 'product_id', 'count', 'price', 'day']}
          />
        </CCol>
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/bestSellingProducts"
            showFilter={false}
            showPrint={false}
            columns={[
              { name: 'ID', selector: (row) => row.id },
              { name: 'Product Name', selector: (row) => row.product_name },
              { name: 'Product Count', selector: (row) => row.products_count },
              { name: 'Total Pieces', selector: (row) => row.total_pieces },
              { name: 'Date', selector: (row) => row.day },
            ]}
            keys={['id', 'product_name', 'products_count', 'total_pieces', 'day']}
          />
        </CCol>
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/ordersFilterByStatus"
            keys={['id', 'order_status', 'total', 'day']}
            showDate={false}
            showPrint={false}
            columns={[
              { name: 'ID', selector: (row) => row.id },
              { name: 'Orders Total', selector: (row) => row.order_status },
              { name: 'Total', selector: (row) => row.total },
              { name: 'Date', selector: (row) => row.day },
            ]}
            filter="order_status"
          />
        </CCol>
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/ordersFilterByStatus"
            keys={['id', 'ordernumber', 'products_count', 'total', 'status', 'day']}
            showDate={false}
            showPrint={false}
            columns={[
              { name: 'ID', selector: (row) => row.id },
              { name: 'Order.No', selector: (row) => row.ordernumber },
              { name: 'Products Count', selector: (row) => row.products_count },
              { name: 'Total', selector: (row) => row.total },
              { name: 'Status', selector: (row) => row.status },
              { name: 'Date', selector: (row) => row.day },
            ]}
            filter="status"
          />
        </CCol>
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/mostViewedProducts"
            keys={['id', 'product_name', 'product_visits', 'day']}
            showFilter={false}
            showPrint={false}
            columns={[
              { name: 'ID', selector: (row) => row.id },
              { name: 'Product Name', selector: (row) => row.product_name },
              { name: 'Views', selector: (row) => row.product_visits },
              { name: 'Date', selector: (row) => row.day },
            ]}
          />
        </CCol>
        <CCol md={5} style={{ height: '100%', overflow: 'auto', marginBottom: '2rem' }}>
          <Table
            path="/avg/sales"
            keys={['name', 'total', 'orders_count', 'average']}
            showDate={false}
            showPrint={false}
            showFilter={false}
            columns={[
              { name: 'Name', selector: (row) => row.name },
              { name: 'Toatal Purchases Amount', selector: (row) => row.total },
              { name: 'Sales Count', selector: (row) => row.orders_count },
              { name: 'average Purchases Amount', selector: (row) => row.average },
            ]}
          />
        </CCol>
      </div>
    </>
  )
}
