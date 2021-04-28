class Doctor:
    def __init__(self, nom, ape, fec, sex, usu, cont, esp, tel):
        self.nombre = nom
        self.apellido = ape
        self.fecha = fec
        self.sexo = sex
        self.usuario = usu
        self.contrasena = cont
        self.especialidad = esp
        self.telefono = tel

class Nurse:
    def __init__(self, nom, ape, fec, sex, usu, cont, tel):
        self.nombre = nom
        self.apellido = ape
        self.fecha = fec
        self.sexo = sex
        self.usuario = usu
        self.contrasena = cont
        self.telefono = tel

class Patient:
    def __init__(self, nom, ape, fec, sex, usu, cont, tel):
        self.nombre = nom
        self.apellido = ape
        self.fecha = fec
        self.sexo = sex
        self.usuario = usu
        self.contrasena = cont
        self.telefono = tel


class Medicine:
    def __init__(self, nom, prec, desc, can):
        self.nombre = nom
        self.precio = prec
        self.descripcion = desc
        self.cantidad = can

class AdminWeb:
    def __init__(self):
        self.nombre = "Javier"
        self.apellido = "Golon"
        self.usuario = "admin"
        self.contrasena = "1234"