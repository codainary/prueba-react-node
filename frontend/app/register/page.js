"use client"

import { useState } from 'react';
export default function Register() {
    const [nombre, setNombre] = useState('');
    const [salario, setSalario] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/empleado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, salario, fechaIngreso }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Nombre" 
                required 
            />
            <input 
                type="number" 
                value={salario} 
                onChange={(e) => setSalario(e.target.value)} 
                placeholder="Salario" 
                required 
            />
            <input 
                type="text" 
                value={fechaIngreso} 
                onChange={(e) => setFechaIngreso(e.target.value)} 
                placeholder="Fecha Ingreso" 
                required 
            />
            <button type="submit">Registrar</button>
        </form>
    );
}
