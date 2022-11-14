const routes = {
    home: '/home',
    following: '/following',
    profile: '/@:nickname',
    upload: '/upload',
    search: '/search',

    ///Admin routes

    dashboard: '/',
    loginAdmin: '/login-admin',
    new: 'new',
    users: '/users',
    single: 'details/:id',

    //brands
    brands: '/brands',

    //category
    category: '/category',

    //product
    product: '/product',
    editProduct: 'edit-product/:productId',
    create_product: 'create-product',
};
export default routes;
