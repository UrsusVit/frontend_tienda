import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import imgLogo from '../img/logo.png';
import carrito from '../img/Carrito.png'
import { Home } from '../components/views/Home';
import { Nosotros } from '../components/views/Nosotros';
import { DetalleProducto } from '../components/views/HomeComponents/DetalleProducto';
import { AgregarProducto } from '../components/views/ProductosComponentes/AgregarProducto';
import { CarritoCompra } from '../components/views/CarritoCompra';

export const MisRutas = () => {
    return (
        <BrowserRouter>
            <header className="header">
                <Link to="/">
                    <img className="header__logo" src={imgLogo} alt="Logotipo" />
                </Link>
            </header>


            <nav className="navegacion">
                <Link className="navegacion__enlace" to="/">Tienda</Link>
                <Link className="navegacion__enlace" to="/administrar">Administrar</Link>
                <Link className="navegacion__enlace" to="/nosotros">Nosotros</Link>
                <Link className="navegacion__enlace" to="/carrito">
                    <img className='img__carrito' src={carrito} alt="Carrito" />
                </Link>
            </nav>


            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/nosotros' element={<Nosotros />} />
                <Route path='/administrar' element={<AgregarProducto />} />
                <Route path='/producto/:id' element={<DetalleProducto />} />
                <Route path='/carrito' element={<CarritoCompra />} />
            </Routes>

            <footer class="footer">
                <p class="footer__texto">Front End Store - Todos los derechos Reservados © 2026.</p>
            </footer>

        </BrowserRouter>
    );
}