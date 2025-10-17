# 🚀 DevTree Backend

Backend del proyecto **DevTree**, desarrollado con **Node.js**, **Express**, **TypeScript** y **MongoDB**.  
Esta API gestiona usuarios, enlaces y datos del sistema de manera **segura**, **modular** y **escalable**.

---

## 🧩 Tecnologías principales

| Tecnología | Descripción |
|-------------|-------------|
| [Node.js](https://nodejs.org/) | Entorno de ejecución de JavaScript |
| [Express](https://expressjs.com/) | Framework para crear APIs REST |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático para JavaScript |
| [MongoDB](https://www.mongodb.com/) | Base de datos NoSQL para almacenamiento flexible |
| [dotenv](https://github.com/motdotla/dotenv) | Manejo de variables de entorno |
| [Mongoose](https://mongoosejs.com/) | ODM para modelar datos en MongoDB |
| [Nodemon](https://github.com/remy/nodemon) | Recarga automática durante el desarrollo |
| [pnpm](https://pnpm.io/) | Gestor de paquetes rápido y eficiente |

---

## 🧠 Estructura del proyecto

backend-devtree/
├── src/
│ ├── config/ # Configuraciones generales (Cloudinary, CORS, DB, etc.)
│ ├── handlers/ # Controladores principales
│ ├── middleware/ # Middlewares de autenticación y validación
│ ├── models/ # Modelos de Mongoose
│ ├── router/ # Rutas del backend
│ ├── utils/ # Funciones auxiliares (JWT, manejo de env, etc.)
│ ├── server.ts # Punto de entrada del servidor
│ └── index.ts # Archivo principal de inicialización
│
├── .env.template # Ejemplo de variables de entorno
├── nodemon.json # Configuración de desarrollo
├── package.json # Configuración del proyecto
├── pnpm-lock.yaml # Bloqueo de dependencias
├── tsconfig.json # Configuración de TypeScript
└── README.md



## ⚙️ Instalación y configuración

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuusuario/backend-devtree.git
   cd backend-devtree

2. Instala las dependencias
    ```bash
    pnpm install

3. Ejecuta el servidor en modo desarrollo
    ```bash
    pnpm run dev

## 🎨 Características principales
✅ Autenticación con JWT
✅ Registro y login de usuarios
✅ Subida de imágenes a Cloudinary
✅ Drag & Drop con Dnd Kit para organizar enlaces
✅ Interfaz moderna con Tailwind CSS v4
✅ Validación de formularios con React Hook Form + Zod
✅ Consumo del backend con Axios
✅ Compatible con dispositivos móviles