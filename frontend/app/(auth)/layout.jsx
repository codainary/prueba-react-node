import PropTypes from 'prop-types';
import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex items-center justify-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-1 to-yellow-2'>
      {children}
    </div>
  )
}

// Definir los prop types para validación
AuthLayout.propTypes = {
    children: PropTypes.node
};

export default AuthLayout
