from django.shortcuts import render,HttpResponse
from appweb.clases.objetos import AdminWeb, Doctor, Nurse, Patient, Medicine, Receta
import json

# Create your views here.

admin = AdminWeb()
doctors = []
nurses = []
patients = []
medicines = []
recetas = []


def login(request):
    if request.method == "POST":
        datos = json.loads(request.body)
        li = searchup(datos["usuario"],datos["contrasena"])
        return HttpResponse(str(li[0]+"-"+str(li[1])))
    else:
        return render(request, "login.html")

def searchup(usuario,contrasena):
    tipo = "noexiste"
    continuar = True
    cdo = 0
    cen = 0
    cpa = 0
    indice = -1
    while continuar == True and cdo < len(doctors):
        if usuario == doctors[cdo].usuario and contrasena == doctors[cdo].contrasena:
            indice = cdo
            tipo = "doc"
            continuar = False
        cdo += 1
    while continuar == True and cen < len(nurses):
        if usuario == nurses[cen].usuario and contrasena == nurses[cen].contrasena:
            indice = cen
            tipo = "enf"
            continuar = False
        cen += 1
    while continuar == True and cpa < len(patients):
        if usuario == patients[cpa].usuario and contrasena == patients[cpa].contrasena:
            indice = cpa
            tipo = "pac"
            continuar = False
        cpa += 1    
    return [tipo,indice]


def registro(request):
    if request.method == "POST":
        continuar = True
        datos = json.loads(request.body)
        if(len(datos.items()) == 1):
            username = datos["usuario"]
            contd = 0
            conte = 0
            contp = 0
            while contd < len(doctors) and continuar != False:
                if doctors[contd].usuario == username:
                    continuar = False
                    break
                contd += 1
            while conte < len(nurses) and continuar != False:
                if nurses[conte].usuario == username:
                    continuar = False
                    break
                conte += 1
            while contp < len(patients) and continuar != False:
                if patients[contp].usuario == username:
                    continuar = False
                    break
                contp += 1
            if(continuar == True):
                print("ook")
                return HttpResponse("ok")
            else:
                print("ooknt")
                return HttpResponse("oknt")
        if(len(datos.items())==7):
            nombre = datos["nombre"]
            apellido = datos["apellido"]
            fecha = datos["fecha"]
            genero = datos["genero"]
            telefono = datos["telefono"]
            username = datos["usuario"]
            contrasena = datos["contraseña"]
            patients.append(Patient(nombre,apellido,fecha,genero,username,contrasena,telefono,len(patients)))
            return render(request, "registro.html")
    else:
        return render(request, "registro.html")

def administracion(request):
    if request.method == "POST":
        datos = json.loads(request.body)
        cont = 0
        elementos = datos["usuarios"]
        if datos["tipo"] == "doc":
            cont = ingresar_doc(elementos)
        elif datos["tipo"] == "enf":
            cont = ingresar_enf(elementos)
        elif datos["tipo"] == "pac":
            cont = ingresar_pac(elementos)
        elif datos["tipo"] == "med":
            cont = ingresar_med(elementos)
        return HttpResponse(cont)
    else:
        return render(request,"admin.html",{"admin":admin})
def ingresar_doc(elementos):
    contador = 0
    for i in range(len(elementos)):
        if comprobar_usuario(elementos[i][4]) == True:
            doctors.append(Doctor(elementos[i][0],elementos[i][1],elementos[i][2],elementos[i][3],
            elementos[i][4],elementos[i][5],elementos[i][6],elementos[i][7],len(doctors)))
            contador += 1
    return contador
def ingresar_enf(elementos):
    contador = 0
    for i in range(len(elementos)):
        if comprobar_usuario(elementos[i][4]) == True:
            nurses.append(Nurse(elementos[i][0],elementos[i][1],elementos[i][2],
            elementos[i][3],elementos[i][4],elementos[i][5],elementos[i][6],len(nurses)))
            contador += 1
    return contador
def ingresar_pac(elementos):
    contador = 0
    for i in range(len(elementos)):
        if comprobar_usuario(elementos[i][4]) == True:
            patients.append(Patient(elementos[i][0],elementos[i][1],elementos[i][2],elementos[i][3],
            elementos[i][4],elementos[i][5],elementos[i][6],len(patients)))
            contador += 1
    return contador
def ingresar_med(elementos):
    print(elementos)  
    contador = 0
    for i in range(len(elementos)):
        if comprobar_medicina(elementos[i][0]) == True:
            medicines.append(Medicine(elementos[i][0],elementos[i][1],elementos[i][2],elementos[i][3]))
        contador += 1
    return contador
def comprobar_usuario(usr):
    contd = 0
    conte = 0
    contp = 0
    continuar = True
    while contd < len(doctors) and continuar != False:
        if doctors[contd].usuario == usr:
            continuar = False
            break
        contd += 1
    while conte < len(nurses) and continuar != False:
        if nurses[conte].usuario == usr:
            continuar = False
            break
        conte += 1
    while contp < len(patients) and continuar != False:
        if patients[contp].usuario == usr:
            continuar = False
            break
        contp += 1
    return continuar
def comprobar_medicina(nam):
    continuar = True
    for i in range(len(medicines)):
        if medicines[i].nombre == nam:
            continuar = False
            break
    return continuar

def admin_tabs(request):
    if request.method == "POST":
        datos = json.loads(request.body)
        eliminar(datos["tipo"],datos["elemento"])
        return HttpResponse("eliminado")
    else:
        for i in range(len(recetas)-1,0,-1):
            for j in range(i):
                if recetas[j].veces>recetas[j+1].veces:
                    temp = recetas[j]
                    recetas[j] = recetas[j+1]
                    recetas[j+1] = temp
        lispad = []
        if len(recetas) == 1:
            lispad.append(recetas[0])
        elif len(recetas) == 2:
            lispad.append(recetas[1])
            lispad.append(recetas[0])
        elif len(recetas) == 3:
            lispad.append(recetas[2])
            lispad.append(recetas[1])
            lispad.append(recetas[0])
        elif len(recetas) == 4:
            lispad.append(recetas[3])
            lispad.append(recetas[2])
            lispad.append(recetas[1])
            lispad.append(recetas[0]) 
        elif len(recetas) == 5:
            lispad.append(recetas[4])
            lispad.append(recetas[3])
            lispad.append(recetas[2])
            lispad.append(recetas[1])
            lispad.append(recetas[0])
        elif len(recetas)>5:
            lispad.append(recetas[len(recetas)-1])
            lispad.append(recetas[len(recetas)-2])
            lispad.append(recetas[len(recetas)-3])
            lispad.append(recetas[len(recetas)-4])
            lispad.append(recetas[len(recetas)-5])  
        return render(request, "tablas_administrador.html",
        {'doctores': doctors,'enfermeras': nurses,'pacientes': patients,'medicinas':medicines,'recetas':lispad})
def eliminar(tipo,elemento):
    if tipo == "doc":
        for i in range (len(doctors)):
            if doctors[i].usuario == elemento:
                del doctors[i]  
                break
    if tipo == "enf":
        for i in range (len(nurses)):
            if nurses[i].usuario == elemento:
                del nurses[i] 
                break
    if tipo == "pac":
        for i in range (len(patients)):
            if patients[i].usuario == elemento:
                del patients[i] 
                break
    if tipo == "med":
        for i in range (len(medicines)):
            if medicines[i].nombre == elemento:
                del medicines[i]
                break
def modify_doc(request):
    if request.method == "POST":
        dat = json.loads(request.body)
        if len(dat.items()) == 1:
            for i in range(len(doctors)):
                if doctors[i].usuario == dat["doctor"]:
                    print(doctors[i].to_string())
                    return HttpResponse(doctors[i].to_string())

        if len(dat.items()) == 9:
            pos = int(dat["indice"])
            doctors[pos].nombre=dat["nombre"]
            doctors[pos].apellido=dat["apellido"]
            doctors[pos].fecha=dat["fecha"]
            doctors[pos].sexo=dat["sexo"]
            doctors[pos].telefono=dat["telefono"]
            doctors[pos].especialidad=dat["especialidad"]
            doctors[pos].usuario=dat["usuario"]
            doctors[pos].contrasena=dat["contrasena"]
            return HttpResponse("a")
    else:
        return render(request, "modificardoc.html")
def modify_ep(request):
    if request.method == "POST":
        datos = json.loads(request.body)
        print(datos)
        if len(datos.items()) == 2:
            if datos["tipo"] == "enf":
                for i in range(len(nurses)):
                    if nurses[i].usuario == datos["usuario"]:
                        return HttpResponse(nurses[i].to_string())
            if datos["tipo"] == "pac":
                for i in range(len(patients)):
                    if patients[i].usuario == datos["usuario"]:
                        return HttpResponse(patients[i].to_string())
        if len(datos.items()) == 9:
            if datos["tipo"] == "enf":
                print(datos)
                pos = int(datos["indice"])
                nurses[pos].nombre=datos["nombre"]
                nurses[pos].apellido=datos["apellido"]
                nurses[pos].fecha=datos["fecha"]
                nurses[pos].sexo=datos["sexo"]
                nurses[pos].telefono=datos["telefono"]
                nurses[pos].usuario=datos["usuario"]
                nurses[pos].contrasena=datos["contrasena"]
                return HttpResponse("a")
            if datos["tipo"] == "pac":
                print(datos)
                pos = int(datos["indice"])
                patients[pos].nombre=datos["nombre"]
                patients[pos].apellido=datos["apellido"]
                patients[pos].fecha=datos["fecha"]
                patients[pos].sexo=datos["sexo"]
                patients[pos].telefono=datos["telefono"]
                patients[pos].usuario=datos["usuario"]
                patients[pos].contrasena=datos["contrasena"]
                return HttpResponse("a")
    else:
        return render(request, "modificar.html")
def modify_med(request):
    if request.method == "POST":
        datos = json.loads(request.body)
        if len(datos.items()) == 1:
            for i in range(len(medicines)):
                if datos["nombre"] == medicines[i].nombre:
                    return HttpResponse([medicines[i].nombre+","+medicines[i].precio+","+medicines[i].descripcion
                    +","+medicines[i].cantidad+","+ str(i)])
        if len(datos.items()) == 2:
            exis = False
            for i in range(len(medicines)):
                if datos["nombre"] == medicines[i].nombre:
                    exis = True
                    break
            if exis == True:
                return HttpResponse("existe")
            else:
                return HttpResponse("existent")
        if len(datos.items()) == 5:
            pos = int(datos["indice"])
            medicines[pos].nombre = datos["nombre"]
            medicines[pos].precio = datos["precio"]
            medicines[pos].descripcion = datos["descripcion"]
            medicines[pos].cantidad = datos["cantidad"]
            return HttpResponse("")
    else:    
        return render(request,"modificarmed.html")

def verdoc(request):
    if request.method == "POST":
        dato = json.loads(request.body)
        if len(dato.items()) == 1:
            usuario = dato["doctor"]
            for i in range(len(doctors)):
                if usuario == doctors[i].usuario:
                    return HttpResponse([doctors[i].nombre+","+doctors[i].apellido+","+doctors[i].fecha+","+
                    doctors[i].sexo+","+doctors[i].telefono+","+doctors[i].especialidad+","+doctors[i].usuario+","+
                    doctors[i].contrasena])
    else:
        return render(request, "verdoc.html")
def verep(request):
    if request.method == "POST":
        dato = json.loads(request.body)
        if dato["tipo"] == "enf":
            for i in range(len(nurses)):
                if dato["usuario"] == nurses[i].usuario:
                    return HttpResponse([nurses[i].nombre+","+nurses[i].apellido+","+nurses[i].fecha+","+
                    nurses[i].sexo+","+nurses[i].telefono+","+nurses[i].usuario+","+nurses[i].contrasena])
        if dato["tipo"] == "pac":
            for i in range(len(patients)):
                if dato["usuario"] == patients[i].usuario:
                    return HttpResponse([patients[i].nombre+","+patients[i].apellido+","+patients[i].fecha+","+
                    patients[i].sexo+","+patients[i].telefono+","+patients[i].usuario+","+patients[i].contrasena])
    else:
        return render(request, "verpersona.html")
def vermed(request):
    if request.method == "POST":
        dato = json.loads(request.body)
        for i in range(len(medicines)):
            if dato["nombre"] == medicines[i].nombre:
                return HttpResponse(medicines[i].to_string())
    else:
        return render(request, "vermed.html")

def home_doctor(request):
    if request.method == "POST":
        existencia = False
        dato = json.loads(request.body)
        for i in range(len(recetas)):
            if dato["padecimiento"] == recetas[i].padecimiento:
                recetas[i].veces += 1
                existencia = True
                break
        if existencia == False:
            recetas.append(Receta(dato["padecimiento"],1))
        for i in range(len(recetas)):
                print(recetas[i].padecimiento)
                print(recetas[i].veces)
        return HttpResponse("exito")
    else:
        return render(request, "doctor.html")

def home_nurse(request):
    if request.method == "POST":
        print("hola enfermera")
    else:
        return render(request, "enfermera.html")
def factura_nurse(request):
    return render(request, "enfermera_factura.html",{"doctores": doctors})
def home_patient(request):
    if request.method == "POST":
        print("Hola paciente")
    else:
        return render(request, "paciente.html")