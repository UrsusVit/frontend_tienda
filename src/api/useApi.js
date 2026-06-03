import axios from 'axios';
import { useState } from 'react';

const BASE_URL = 'http://localhost:3000/api';

export const useApi = () => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const ejecutarPeticion = async (config) => {
        setCargando(true);
        setError(null); 

        try {            
            const respuesta = await axios({
                ...config,
                baseURL: BASE_URL 
            });
            return respuesta.data;
        } catch (err) {
            const mensajeError = err.response?.data?.error || 'Ocurrió un error de conexión con el servidor.';
            setError(mensajeError);
            throw err; 
        } finally {
            setCargando(false);
        }
    };

    return {
        cargando,
        error,
        setError,
        ejecutarPeticion
    };
};