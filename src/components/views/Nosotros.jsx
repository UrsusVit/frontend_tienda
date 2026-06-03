import React from 'react';


import imgNosotros from '../../img/nosotros.jpg';
import imgLogo from '../../img/logo.png';

export const Nosotros = () => {
    return (
        <div>
            <main className="contenedor">
                <h1>Nosotros</h1>

                <div className="nosotros">
                    <div className="nosotros__contenido">
                        <p>Nam nec metus a risus auctor congue nec non felis. Donec eu diam facilisis, semper nisl sed, ultricies ligula.</p>
                        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
                    </div>

                    <img className="nosotros__imagen" src={imgNosotros} alt="imagen nosotros" />
                </div>
            </main>

            <section className="contenedor comprar">
                <h2 className="comprar__titulo">¿Por qué Comprar con nosotros?</h2>

                <div className="bloques">
                    <div className="bloque">
                        <img className="bloque__imagen" src={imgLogo} alt="porque comprar" />
                        <h3 className="bloque__titulo">El Mejor Precio</h3>
                        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin porta pretium felis</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
