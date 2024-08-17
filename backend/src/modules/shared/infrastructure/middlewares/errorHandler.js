function errorHandler(err, req, res, next) {
    // Para propósitos de depuración (Solo local)
    console.error(err.stack);

    // Determinar el código de estado.
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || 'Ocurrió un error en el servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        statusCode
    });
}

module.exports = errorHandler;
