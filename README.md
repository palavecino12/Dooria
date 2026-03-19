# DoorIA – Sistema de Control de Acceso con Reconocimiento Facial

## Descripción

DoorIA es una aplicación web orientada a la gestión de accesos en entornos residenciales, que utiliza reconocimiento facial para automatizar el ingreso de usuarios.

El sistema permite administrar usuarios, definir reglas de acceso y validar ingresos en tiempo real mediante una interfaz tipo "intercom".

La arquitectura contempla dos flujos:

* Clientes móviles (gestión de usuarios y accesos)
* Interfaz intercom (validación de ingresos en tiempo real)

---

## Funcionalidades

* Gestión de usuarios (CRUD)
* Búsqueda y filtros
* Validación de accesos en tiempo real
* Reconocimiento facial
* API con endpoints diferenciados (intercom / móvil)
* Validación de datos con esquemas tipados

---

## Tecnologías

* **Frontend:** React, TypeScript, Zod
* **Backend:** Node.js, Express, TypeScript
* **Base de datos:** MongoDB
* **IA:** face-api.js

---

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/tuusuario/dooria.git

# Entrar al proyecto
cd dooria

# Instalar dependencias backend
cd backend
npm install

# Instalar dependencias frontend
cd frontend
npm install
```

---

## Ejecución

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

---

## Endpoints principales

### Intercom

* Validación de acceso en tiempo real
* Procesamiento de reconocimiento facial

### Móvil

* Gestión de usuarios
* Registro y control de accesos

---

## Estado del proyecto

Es un proyecto en constante evolución, en el que aplico tanto mis conocimientos actuales como los que voy adquiriendo continuamente.

