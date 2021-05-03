class Doctor:
    def __init__(self, nom, ape, fec, sex, usu, cont, esp, tel, pos):
        self.nombre = nom
        self.apellido = ape
        self.fecha = fec
        self.sexo = sex
        self.usuario = usu
        self.contrasena = cont
        self.especialidad = esp
        self.telefono = tel
        self.posicion = pos
    def to_string(self):
        return "%s*%s*%s*%s*%s*%s*%s*%s*%s" %(self.nombre,self.apellido,self.fecha,self.sexo,self.usuario,self.contrasena,self.especialidad,self.telefono,self.posicion)
        
class Nurse:
    def __init__(self, nom, ape, fec, sex, usu, cont, tel, pos):
        self.nombre = nom
        self.apellido = ape
        self.fecha = fec
        self.sexo = sex
        self.usuario = usu
        self.contrasena = cont
        self.telefono = tel
        self.posicion = pos
    def to_string(self):
        return "%s*%s*%s*%s*%s*%s*%s*%s" %(self.nombre,self.apellido,self.fecha,self.sexo,self.usuario,self.contrasena,self.telefono,self.posicion)

class Patient:
    def __init__(self, nom, ape, fec, sex, usu, cont, tel, pos):
        self.nombre = nom
        self.apellido = ape
        self.fecha = fec
        self.sexo = sex
        self.usuario = usu
        self.contrasena = cont
        self.telefono = tel
        self.posicion = pos
    def to_string(self):
        return "%s*%s*%s*%s*%s*%s*%s*%s" %(self.nombre,self.apellido,self.fecha,self.sexo,self.usuario,self.contrasena,self.telefono,self.posicion)


class Medicine:
    def __init__(self, nom, prec, desc, can):
        self.nombre = nom
        self.precio = prec
        self.descripcion = desc
        self.cantidad = can
    def to_string(self):
        return "%s,%s,%s,%s" %(self.nombre,self.precio,self.descripcion,self.cantidad)

class AdminWeb:
    def __init__(self):
        self.nombre = "Javier"
        self.apellido = "Golon"
        self.usuario = "admin"
        self.contrasena = "1234"

class Receta:
    def __init__(self, pad, vec):
        self.padecimiento = pad
        self.veces = vec