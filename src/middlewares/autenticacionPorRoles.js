
export const validarRoles = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: 'Acceso denegado, no autenticado' });
        }
        
        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
 
        next();     
    };
};



 