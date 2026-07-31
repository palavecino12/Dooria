# Dooria – Sistema de Control de Acceso con Reconocimiento Facial

Dooria es una aplicación web orientada a la gestión de accesos en entornos residenciales. Utiliza reconocimiento facial para automatizar el ingreso de usuarios, permitiendo administrar residentes, definir reglas de acceso y validar ingresos en tiempo real mediante una interfaz tipo "intercom".

La aplicación cuenta con dos interfaces principales:

| Ruta        | Descripción                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `/app`      | Interfaz Mobile First utilizada por los residentes y administradores para gestionar usuarios y permisos de acceso.      |
| `/intercom` | Interfaz utilizada por el dispositivo de acceso para capturar video y realizar el reconocimiento facial en tiempo real. |

---

## Interfaces principales

### `/app`

Interfaz web desarrollada bajo un enfoque Mobile First, destinada a los residentes del barrio. Permite:

- Registrar y editar usuarios.
- Administrar el acceso de cada usuario.
- Visualizar la lista de personas registradas.
- Observar en tiempo real el video capturado por el portero.

### `/intercom`

Interfaz web utilizada por el portero inteligente ubicado en el ingreso del barrio. Sus responsabilidades son:

- Capturar video desde la cámara.
- Detectar y reconocer rostros mediante inteligencia artificial.
- Transmitir el video en tiempo real.
- Informar el estado del reconocimiento facial a la aplicación `/app`.

---

## Arquitectura

### Frontend

```
Component → Hook → Service → API
```

Cada capa tiene una única responsabilidad:

- **Component:** renderiza la interfaz.
- **Hook:** contiene la lógica de negocio del frontend.
- **Service:** realiza la comunicación con la API.

React Context se utiliza para compartir el estado global de la aplicación (principalmente la lista de usuarios), reduciendo solicitudes innecesarias al backend y evitando prop drilling para la función de refresh. Tambien se usa para el uso global de toast con el fin de notificar feedback al usuario.

### Backend

```
Routes → Controller → Service → Repository → MongoDB Atlas
```

Cada capa encapsula una responsabilidad específica, facilitando el mantenimiento y la escalabilidad del proyecto.

---

## Detección de rostro

Se utiliza face-api.js como motor de reconocimiento facial en ambas interfaces, con un rol distinto en cada una:

- **`/intercom`:** captura el rostro desde el video en tiempo real, genera su descriptor facial y lo compara contra los usuarios registrados para validar el estado de acceso (permitido, denegado o desconocido).
- **`/app`:** al registrar un usuario, se procesa su imagen para extraer y almacenar el descriptor facial correspondiente, que luego es utilizado por el `/intercom` como referencia para el reconocimiento.

---

## Comunicación en tiempo real

### Socket.IO

Se utiliza para la comunicación entre `/intercom` y `/app`:

- Señalización de WebRTC.
- Envío del estado del reconocimiento facial.
- Gestión de conexiones y desconexiones.

### WebRTC

Se utiliza exclusivamente para la transmisión de video en tiempo real entre el `/intercom` y uno o varios clientes conectados.

---

## Tecnologías

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Context API
- React Portals
- React Hook Form
- Zod
- face-api.js
- Socket.IO Client
- WebRTC

### Backend

- Node.js
- Express
- TypeScript
- Socket.IO
- Zod
- Error Handler personalizado

### Base de datos

- MongoDB Atlas

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/palavecino12/Dooria.git
cd dooria
```

### 2. Instalar dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en cada aplicación utilizando la siguiente configuración:

#### Backend (`backend/.env`)

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/dooria
FRONTEND_URL=http://localhost:5173
```

#### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Ejecutar la aplicación

En una terminal:

```bash
cd backend
npm run dev
```

En otra terminal:

```bash
cd frontend
npm run dev
```

---

## Estado del proyecto

Proyecto en constante evolución, en el que se aplican conocimientos actuales y se incorporan nuevas tecnologías y aprendizajes a medida que avanza su desarrollo.
