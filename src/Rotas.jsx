import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListEntregador from './views/entregador/ListEntregador';
import ListProduto from './views/produto/ListProduto';
import FormFornecedor from './views/fornecedor/FormFornecedor'
import ListFornecedor from './views/fornecedor/ListFornecedor'
import FormLogin from './views/login/FormLogin';
import { ProtectedRoute } from './views/util/ProtectedRoute';

function Rotas() {
    return (
        <Routes>
            
            <Route path="/" element={ <FormLogin/> } />

            <Route
                path="/home"
                element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
                }
            />
                
            <Route
                path="/list-cliente"
                element={
                    <ProtectedRoute>
                        <ListCliente />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/form-cliente"
                element={
                <ProtectedRoute>
                    <FormCliente />
                </ProtectedRoute>
                }
            />

            <Route
                path="/list-produto"
                element={
                <ProtectedRoute>
                    <ListProduto />
                </ProtectedRoute>
                }
            />

            <Route
                path="/form-produto"
                element={
                <ProtectedRoute>
                    <FormProduto />
                </ProtectedRoute>
                }
            />

<Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />
                <Route path="form-fornecedor" element={ <FormFornecedor/> } />
                <Route path="list-fornecedor" element={ <ListFornecedor/> } />

        </Routes>
    )
}



/* function Rotas() {
    return (
        <>
            <Routes>
                
            <Route path="/" element={ <FormLogin/> } />

            <Route
                path="/home"
                element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
                }
            />
                <Route path="/home" element={ <Home/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="list-cliente" element={<ListCliente/>}/>
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="list-produto" element={ <ListProduto/> }/>
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />
                <Route path="form-fornecedor" element={ <FormFornecedor/> } />
                <Route path="list-fornecedor" element={ <ListFornecedor/> } />
            </Routes>
        </>
    )
}*/

export default Rotas