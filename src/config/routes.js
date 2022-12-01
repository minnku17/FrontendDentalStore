const routes = {
    //admin
    dashboard: '/admin',
    loginAdmin: '/login-admin',
    new: 'new',
    users: '/admin/users',
    single: 'details/:id',

    //brands
    brands: '/admin/brands',

    //category
    category: '/admin/category',

    //product
    product: '/admin/product',
    editProduct: 'edit-product/:productId',
    create_product: 'create-product',

    //order
    order: '/admin/order',
    order_detail: 'order-detail/:id',

    //customer
    customer_login: '/login-customer',

    home: '/',
    product_detail: '/product-detail/:id',
    check_out: '/check-out',
};
export default routes;
