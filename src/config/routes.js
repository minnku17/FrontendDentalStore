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

    product: 'product',
    productId: ':productId',
};
export default routes;