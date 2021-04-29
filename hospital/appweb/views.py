from django.shortcuts import render,HttpResponse
from appweb.clases.objetos import AdminWeb, Doctor, Nurse, Patient, Medicine
import json

# Create your views here.
# Create an admin and list for different type of users
doc1 = Doctor("Juan","Pérez","06/01/2000","M","jn612perez","123456789","Cirujano","49557946")
doc2 = Doctor("Carola","Aguilón","15/05/1999","F","cati15","123456789","Cardiologo","12345678")
doc3 = Doctor("Alicia","Shar","04/11/2001","F","amshar","123456789","Dentista","12345678")
doc4 = Doctor("Pablo","Búc","01/06/2000","M","pablobuc","123456789","Anestesista","12345678")

enf1 = Nurse("Milagros","Begazo","07/07/2000","F","milagrosbegazo","123456789","12345678")
enf2 = Nurse("Mariela","Torres","13/02/2000","F","marielatorres","123456789","12345678")
enf3 = Nurse("Stephania","lopez","12/05/2000","F","tefylopez","123456789","12345678")
enf4 = Nurse("Marlene","Arriaga","26/08/2001","F","marlenearriaga","123456789","12345678")

pac1 = Patient("Fernanda","Monzón","30/06/1998","F","fernandamonzon","123456789","12345678")
pac2 = Patient("Ivan","Rodriguez","26/12/1996","M","ivanrodriguez","123456789","12345678")
pac3 = Patient("Hugo","García","19/02/1999","M","hugogarcia","123456789","12345678")
pac4 = Patient("Jhonson","Avery","30/06/1998","F","jhonsonavery","123456789","12345678")

med1 = Medicine("medicina1","170","primera descripcion","50")
med2 = Medicine("medicina2","200","segunda descripcion","90")
med3 = Medicine("medicina3","90","tercera descripcion","70")
med4 = Medicine("medicina4","180","cuarta descripcion","85")

admin = AdminWeb()
doctors = [doc1,doc2,doc3,doc4]
nurses = [enf1,enf2,enf3,enf4]
patients = [pac1,pac2,pac3,pac4]
medicines = [med1,med2,med3,med4]


def login(request):
    return render(request, "login.html")

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
            patients.append(Patient(nombre,apellido,fecha,genero,username,contrasena,telefono))
            for i in range(len(patients)):
                print(i)
                print(patients[i].usuario)
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
        return render(request,"admin.html")
def ingresar_doc(elementos):
    contador = 0
    for i in range(len(elementos)):
        if comprobar_usuario(elementos[i][4]) == True:
            doctors.append(Doctor(elementos[i][0],elementos[i][1],elementos[i][2],elementos[i][3],
            elementos[i][4],elementos[i][5],elementos[i][6],elementos[i][7]))
            contador += 1
    return contador
def ingresar_enf(elementos):
    contador = 0
    for i in range(len(elementos)):
        if comprobar_usuario(elementos[i][4]) == True:
            nurses.append(Nurse(elementos[i][0],elementos[i][1],elementos[i][2],
            elementos[i][3],elementos[i][4],elementos[i][5],elementos[i][6]))
            contador += 1
    return contador
def ingresar_pac(elementos):
    contador = 0
    for i in range(len(elementos)):
        if comprobar_usuario(elementos[i][4]) == True:
            patients.append(Patient(elementos[i][0],elementos[i][1],elementos[i][2],elementos[i][3],
            elementos[i][4],elementos[i][5],elementos[i][6]))
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

    return render(request, "tablas_administrador.html",
    {'doctores': doctors,'enfermeras': nurses,'pacientes': patients,'medicinas':medicines})
