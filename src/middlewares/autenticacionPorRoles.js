
export const validarRoles = (rolesPermitidos) =>{
    return (req,res,next) =>{
        if(!req.user || !rolesPermitidos.includes(req,user.rol_id)){
            return res.status(403).json({message: 'acceso denegado'})
        }
        next();
    }
}


