import React from 'react'

const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'))
const Stock = React.lazy(() => import('../pages/stock/stock'))
const UpdateStock = React.lazy(() => import('../pages/stock/updateStock/updateStock'))
const Orders = React.lazy(() => import('../pages/orders/orders'))
const EditOrder = React.lazy(() => import('../pages/orders/edit'))
const ShowOrder = React.lazy(() => import('../pages/orders/show'))
const Financial = React.lazy(() => import('../pages/financial/financial'))
const FinancialDetails = React.lazy(
  () => import('../pages/financial/financialDetails/financialDetails'),
)
const Products = React.lazy(() => import('../pages/products/products'))
const ProductOrders = React.lazy(() => import('../pages/products/productOrders'))
const LabelsTranslate = React.lazy(() => import('../pages/products/labelsTranslate'))
const Categories = React.lazy(() => import('../pages/products/categories'))
const RequestProduct = React.lazy(() => import('../pages/requestProduct/requestProduct'))
const Notify = React.lazy(() => import('../pages/notifyMe/notifyMe'))
const Countries = React.lazy(() => import('../pages/countries/countries'))
const CountryCities = React.lazy(() => import('../pages/countries/countryCities'))
const Cities = React.lazy(() => import('../pages/cities/cities'))
const CityRegions = React.lazy(() => import('../pages/cities/cityRegions'))
const Regions = React.lazy(() => import('../pages/regions/regions'))
const Offers = React.lazy(() => import('../pages/offers/offers'))
const OffersOneFree = React.lazy(() => import('../pages/offers/oneFree/oneFree'))
const OffersDuration = React.lazy(() => import('../pages/offers/duration/duration'))
const OffersExtra = React.lazy(() => import('../pages/offers/extra/extra'))
const EditOffer = React.lazy(() => import('../pages/offers/extra/edit'))
const OfferMembers = React.lazy(() => import('../pages/offers/extra/members'))
const OffersVoucher = React.lazy(() => import('../pages/offers/voucher/voucher'))
const OffersVoucherFree = React.lazy(() => import('../pages/offers/voucherFree/voucherFree'))
const OffersVoucherUserFree = React.lazy(
  () => import('../pages/offers/voucherUserFree/voucherUserFree'),
)
const OffersCommission = React.lazy(() => import('../pages/offers/commission/commision'))
const OffersSettings = React.lazy(() => import('../pages/offers/settings/settings'))
const Discounts = React.lazy(() => import('../pages/discounts/discounts'))
const EditCode = React.lazy(() => import('../pages/discounts/edit'))
const Benficary = React.lazy(() => import('../pages/discounts/benficary'))
const Customers = React.lazy(() => import('../pages/customers/customers'))
const CustomerOrders = React.lazy(() => import('../pages/customers/customerOrders'))
const EditUser = React.lazy(() => import('../pages/customers/editUser'))
const CreateUser = React.lazy(() => import('../pages/customers/createUser'))
const Comments = React.lazy(() => import('../pages/comments/comments'))
const Contacts = React.lazy(() => import('../pages/contacts/contacts'))
const Reports = React.lazy(() => import('../pages/reports/reports'))
const ProductsPrices = React.lazy(() => import('../pages/reports/productsPrices/productsPrices'))
const AffiliateSystem = React.lazy(() => import('../pages/reports/affiliateSystem/affiliate'))
const CustomersLog = React.lazy(() => import('../pages/reports/customersLog/customersLog'))
const CustomersBalances = React.lazy(
  () => import('../pages/reports/customersBalances/customersBalances'),
)
const CustomersOrders = React.lazy(() => import('../pages/reports/customersOrders/customersOrders'))
const CustomersSearch = React.lazy(() => import('../pages/reports/customersSearch/customersSearch'))
const RewardsPoins = React.lazy(() => import('../pages/reports/rewardsPoins/rewardsPoints'))
const Taxes = React.lazy(() => import('../pages/reports/taxes/taxes'))
const Shipping = React.lazy(() => import('../pages/reports/shipping/shipping'))
const Refund = React.lazy(() => import('../pages/reports/refund/refund'))
const RefundDetails = React.lazy(() => import('../pages/reports/refund/details'))
const Sales = React.lazy(() => import('../pages/reports/sales/sales'))
const DiscountCodes = React.lazy(() => import('../pages/reports/discountCodes/discountCodes'))
const ProductsVisits = React.lazy(() => import('../pages/reports/productsVisits/productsVisits'))
const ProductsPurchased = React.lazy(
  () => import('../pages/reports/productsPurchased/productsPurchased'),
)
const ProductsPurchasedDetails = React.lazy(
  () => import('../pages/reports/productsPurchased/details'),
)
const AbandonedCarts = React.lazy(() => import('../pages/reports/abandonedCarts/abandonedCarts'))
const InactiveCustomers = React.lazy(
  () => import('../pages/reports/inactiveCustomers/inactiveCustomers'),
)
const StockReport = React.lazy(() => import('../pages/reports/stock/stockReport'))
const NewProducts = React.lazy(() => import('../pages/reports/newProducts/newProducts'))
const CommentsReport = React.lazy(() => import('../pages/reports/comments/comments'))
const Payments = React.lazy(() => import('../pages/reports/payments/payments'))
const FavProducts = React.lazy(() => import('../pages/reports/favProducts/favProducts'))
const OffersReport = React.lazy(() => import('../pages/reports/offers/offers'))
const Abandoned = React.lazy(() => import('../pages/abandonedCarts/abandonedCarts'))
const CategoriesLinks = React.lazy(() => import('../pages/links/categories'))
const ProductsLinks = React.lazy(() => import('../pages/links/products'))
const PagesLinks = React.lazy(() => import('../pages/links/pages'))
const CommentsPage = React.lazy(() => import('../pages/comments/comments'))
const TemplatesPage = React.lazy(() => import('../pages/templatesPage/templates'))
const StylesPage = React.lazy(() => import('../pages/stylesPage/styles'))
const createStyle = React.lazy(() => import('../pages/stylesPage/createStyle'))
const MailingTemplates = React.lazy(() => import('../pages/mailingTemplates/mailingTemplates'))
const MailingList = React.lazy(() => import('../pages/mailingList/mailingList'))
const Notifications = React.lazy(() => import('../pages/notificationsPage/notifications'))
const Tickets = React.lazy(() => import('../pages/tickets/activeTickets'))
const OnlineCustomers = React.lazy(() => import('../pages/onlineCustomers/onlineCustomers'))
const Roles = React.lazy(() => import('../pages/security/roles/roles'))
const Permissions = React.lazy(() => import('../pages/security/roles/permissions'))
const Admins = React.lazy(() => import('../pages/security/admins/admins'))
const AddAdmin = React.lazy(() => import('../pages/security/admins/addAdmin'))
const Settings = React.lazy(() => import('../pages/settingsPage/settings'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/stock', name: 'Stock', element: Stock },
  { path: '/stocks/updateStock', name: 'Stock / Update Stock', element: UpdateStock },
  { path: '/orders/all', name: 'Orders', element: Orders },
  { path: '/orders/edit/:id', name: 'Edit', element: EditOrder },
  { path: '/orders/:id/show', name: 'Show', element: ShowOrder },
  { path: '/orders/financial_transactions', name: 'Financial Transactions', element: Financial },
  {
    path: '/orders/financial_transactions/details/:id',
    name: 'Transactions Details',
    element: FinancialDetails,
  },
  { path: '/products', name: 'Products', element: Products },
  { path: '/products/productOrder/:id', name: 'Product Orders', element: ProductOrders },
  { path: '/products/labelsTranslate/:id', name: 'Labels Translate', element: LabelsTranslate },
  { path: '/product/categories', name: 'Categories', element: Categories },
  { path: '/countries', name: 'Countries', element: Countries },
  { path: '/country/cities/:id', name: 'Country Cities', element: CountryCities },
  { path: '/cities', name: 'Cities', element: Cities },
  { path: '/city/regions/:id', name: 'Regions Of City', element: CityRegions },
  { path: '/regions', name: 'Regions', element: Regions },
  { path: '/offers', name: 'Offers', element: Offers },
  { path: '/reports', name: 'Reports', element: Reports },
  { path: '/reports/products_prices', name: 'Products Prices', element: ProductsPrices },
  { path: '/reports/affiliateSystem', name: 'Affiliate System', element: AffiliateSystem },
  { path: '/reports/log', name: 'Customers Log', element: CustomersLog },
  { path: '/reports/customers_balances', name: 'Customers Balances', element: CustomersBalances },
  { path: '/reports/customers_orders', name: 'Customers Orders', element: CustomersOrders },
  { path: '/reports/customers_search', name: 'Customers Search', element: CustomersSearch },
  { path: '/reports/rewards_points', name: 'Rewards Points', element: RewardsPoins },
  { path: '/reports/taxes', name: 'Taxes', element: Taxes },
  { path: '/reports/shipping', name: 'Shipping', element: Shipping },
  { path: '/reports/refund', name: 'Refund', element: Refund },
  { path: '/reports/refund/:id', name: 'Refund Details', element: RefundDetails },
  { path: '/reports/sales', name: 'Sales', element: Sales },
  { path: '/reports/discount', name: 'Discount Codes', element: DiscountCodes },
  { path: '/reports/products_visits', name: 'Products Visits', element: ProductsVisits },
  { path: '/reports/products_purchased', name: 'Products Purchased', element: ProductsPurchased },
  {
    path: '/reports/products_purchased/:id',
    name: 'Purchased Details',
    element: ProductsPurchasedDetails,
  },
  {
    path: '/reports/abandoned_carts',
    name: 'Abandoned Carts',
    element: AbandonedCarts,
  },
  {
    path: '/reports/inactive_customers',
    name: 'Inactive Customers',
    element: InactiveCustomers,
  },
  {
    path: '/reports/stock',
    name: 'Stock',
    element: StockReport,
  },
  {
    path: '/reports/new_products',
    name: 'New Products',
    element: NewProducts,
  },
  {
    path: '/reports/comments',
    name: 'Comments',
    element: CommentsReport,
  },
  {
    path: '/reports/payments',
    name: 'Payments',
    element: Payments,
  },
  {
    path: '/reports/fav_products',
    name: 'Fav Products',
    element: FavProducts,
  },
  {
    path: '/reports/offers',
    name: 'Offers Report',
    element: OffersReport,
  },
  {
    path: '/offers',
    name: 'Offers',
    element: Offers,
  },
  {
    path: '/offers/extra',
    name: 'Extra Offers',
    element: OffersExtra,
  },
  {
    path: '/offers/edit/:id',
    name: 'Edit Offer',
    element: EditOffer,
  },
  {
    path: '/offers/members/:id',
    name: 'Members',
    element: OfferMembers,
  },
  {
    path: '/offers/duration',
    name: 'Duration Offers',
    element: OffersDuration,
  },
  {
    path: '/offers/onefree',
    name: 'One Free Offers',
    element: OffersOneFree,
  },
  {
    path: '/offers/voucher',
    name: 'Voucher Offers',
    element: OffersVoucher,
  },
  {
    path: '/offers/voucher-free',
    name: 'Voucher Free Offers',
    element: OffersVoucherFree,
  },
  {
    path: '/offers/voucher-user-free',
    name: 'Voucher Free User Offers',
    element: OffersVoucherUserFree,
  },
  {
    path: '/offers/commission',
    name: 'Commission',
    element: OffersCommission,
  },
  {
    path: '/offers/settings',
    name: 'Settings',
    element: OffersSettings,
  },
  {
    path: '/discounts',
    name: 'Discounts',
    element: Discounts,
  },
  {
    path: '/discounts/edit/:id',
    name: 'Edit',
    element: EditCode,
  },
  {
    path: '/discounts/benficary/:id',
    name: 'Benficary',
    element: Benficary,
  },
  {
    path: '/customers',
    name: 'Customers',
    element: Customers,
  },
  {
    path: '/customers/orders/:id',
    name: 'Customer Orders',
    element: CustomerOrders,
  },
  {
    path: '/customers/editUser/:id',
    name: 'Edit User',
    element: EditUser,
  },
  {
    path: '/customer/create',
    name: 'Create User',
    element: CreateUser,
  },
  {
    path: '/comments',
    name: 'Comments',
    element: Comments,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    element: Contacts,
  },
  {
    path: '/products/notify',
    name: 'Notify Me',
    element: Notify,
  },
  {
    path: '/products/request',
    name: 'Request Product',
    element: RequestProduct,
  },
  {
    path: '/abandoned_carts',
    name: 'Abandoned Carts',
    element: Abandoned,
  },
  {
    path: '/links/categories',
    name: 'Categories Links',
    element: CategoriesLinks,
  },
  {
    path: '/links/products',
    name: 'Products Links',
    element: ProductsLinks,
  },
  {
    path: '/links/pages',
    name: 'Pages Links',
    element: PagesLinks,
  },
  { path: '/comments', name: 'Comments Page', element: CommentsPage },
  { path: '/templates', name: 'Templates', element: TemplatesPage },
  { path: '/styles', name: 'Styles', element: StylesPage },
  { path: '/styles/create', name: 'Create', element: createStyle },
  { path: '/mailingTemplates', name: 'Mailing Templates', element: MailingTemplates },
  { path: '/mailingList', name: 'Mailing List', element: MailingList },
  { path: '/notifications', name: 'Notifications', element: Notifications },
  { path: '/tickets/active', name: 'Tickets', element: Tickets },
  { path: '/onlineCustomers', name: 'Online Customers', element: OnlineCustomers },
  { path: '/role', name: 'Roles', element: Roles },
  { path: '/role/create', name: 'Create Role', element: Permissions },
  { path: '/admins', name: 'Admins', element: Admins },
  { path: '/admins/create', name: 'Add Admin', element: AddAdmin },
  { path: '/settings', name: 'Settings', element: Settings },
]

export default routes
