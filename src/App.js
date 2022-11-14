import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import config from '~/config';
import Home from './admin/pages/home/Home';
import LoginAdmin from './auth/adminLogin';
import List from './admin/pages/list/List';
import Single from './admin/pages/single/Single';
import New from './admin/pages/new/New';
import { ToastContainer } from 'react-toastify';
import { userInputs } from './formSource';
import LayoutAdmin from './layouts/LayoutAdmin';
import Brands from './admin/pages/brand/Brands';
import Category from './admin/pages/category/Category';
import Product from './admin/pages/product/Product';
import NewProduct from './admin/pages/newProduct/NewProduct';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path={config.routes.loginAdmin} element={<LoginAdmin />} />
                    <Route path={config.routes.dashboard}>
                        <Route
                            index
                            element={
                                <LayoutAdmin>
                                    <Home />
                                </LayoutAdmin>
                            }
                        />
                        <Route path={config.routes.users}>
                            <Route
                                index
                                element={
                                    <LayoutAdmin>
                                        <List />
                                    </LayoutAdmin>
                                }
                            />
                            <Route
                                path={config.routes.single}
                                element={
                                    <LayoutAdmin>
                                        <Single />
                                    </LayoutAdmin>
                                }
                            />
                            <Route
                                path={config.routes.new}
                                element={<New inputs={userInputs} title="Add New User" />}
                            />
                        </Route>
                        <Route path={config.routes.brands}>
                            <Route
                                index
                                element={
                                    <LayoutAdmin>
                                        <Brands />
                                    </LayoutAdmin>
                                }
                            />
                        </Route>
                        <Route path={config.routes.category}>
                            <Route
                                index
                                element={
                                    <LayoutAdmin>
                                        <Category />
                                    </LayoutAdmin>
                                }
                            />
                        </Route>
                        <Route path={config.routes.product}>
                            <Route
                                index
                                element={
                                    <LayoutAdmin>
                                        <Product />
                                    </LayoutAdmin>
                                }
                            />
                            <Route
                                path={config.routes.create_product}
                                element={
                                    <LayoutAdmin>
                                        <NewProduct />
                                    </LayoutAdmin>
                                }
                            />
                            <Route
                                path={config.routes.editProduct}
                                element={
                                    <LayoutAdmin>
                                        <NewProduct />
                                    </LayoutAdmin>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </Router>
    );
}
export default App;
