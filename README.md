# 🏨 Proyecto Web Hotel - Sistema de Reservas (Arquitectura Limpia)

Este repositorio contiene la implementación del *backend* para un sistema de gestión y reservas de hotel. El proyecto fue desarrollado bajo los principios de **Arquitectura Limpia** (Clean Architecture) y **TDD** (Test-Driven Development) como parte de la formación en la Academia ForIT.

---

## 🚀 Tecnologías Utilizadas

* **Lenguaje:** TypeScript
* **Entorno:** Node.js / Express.js
* **Testing:** Jest (para TDD)
* **Seguridad:** BCrypt (para cifrado de contraseñas)
* **Base de Datos (Mock):** Repositorios en Memoria (listos para ser reemplazados por una DB real).

---

## 🏗️ Estructura del Proyecto (Monorepo)

El diseño separa estrictamente la lógica de negocio de la tecnología de soporte (principio de Inversión de Dependencia).
mi-proyecto/ ├── domain/ # CAPA DE DOMINIO (Lógica de Negocio Probada con TDD) │ ├── src/entities/ # Clases de negocio (Habitacion, User, etc.) │ ├── src/use-cases/ # Acciones del sistema (RegistrarUsuario, CrearHabitacion). │ └── src/services/ # Contratos (Interfaces) de Repositorio y Servicios. └── apps/ └── backend/ # CAPA DE INFRAESTRUCTURA (API REST con Express) ├── src/controllers/ # Puntos de entrada HTTP (inyectan Casos de Uso). └── src/infrastructure/ # Implementación de Repositorios (InMemory).


---

## ✅ Funcionalidades Implementadas

Las siguientes funcionalidades clave han sido implementadas y validadas con pruebas unitarias exhaustivas:

| Módulo | Funcionalidad | Método | Endpoint | Regla de Negocio Verificada |
| :--- | :--- | :--- | :--- | :--- |
| **Habitaciones** | Crear Habitación | `POST` | `/api/habitaciones` | **Requiere Token.** No permite números duplicados (400). |
| **Habitaciones** | Listar Habitaciones | `GET` | `/api/habitaciones` | Retorna la lista actual de habitaciones. |
| **Usuarios** | Registrar Usuario | `POST` | `/api/users/register` | Cifra la contraseña con BCrypt y no permite emails duplicados (400). |
| **Usuarios** | Iniciar Sesión | `POST` | `/api/users/login` | Verifica credenciales y devuelve un Token JWT. |
| **Reservas** | Crear Reserva | `POST` | `/api/reservas` | **Requiere Token.** Verifica superposición de fechas. |
| **Reservas** | Listar Reservas | `GET` | `/api/reservas` | **Requiere Token.** Retorna las reservas del sistema. |

---

## 🚧 Próximos Pasos (To-Do / Faltantes) y Consigna

### 🎯 Fase 1: Dominio y Backend (Arquitectura Limpia & TDD)
- [ ] **Caso de Uso de Búsqueda/Reserva:** Implementar la lógica de negocio para filtrar habitaciones por fecha (evitando superposiciones).
- [ ] **Políticas de Acceso y Roles:** Definir en el código quién puede crear habitaciones (Admin) y quién solo reservar (Usuario).
- [ ] **Validación de Datos:** Integrar una librería (como Zod) para validar los datos de entrada en el Backend.
- [ ] **Persistencia de Datos Real:** Migrar los repositorios InMemory a una base de datos real (MongoDB, PostgreSQL, etc.).
- [ ] **CRUD Completo:** Implementar los métodos faltantes (Actualizar y Eliminar) para Habitaciones, Usuarios y Reservas.
- [ ] **Reflexión Escrita:** Redactar el texto que pide la consigna sobre TDD, Arquitectura Limpia y los desafíos que encontraste.

### 💻 Fase 2: Frontend (Vite + React)
- [ ] **Maquetado del Footer:** Crear el componente y sus estilos según tu boceto original.
- [ ] **Visual TDD (Storybook):** Si decides usarlo, crear las historias para los componentes (Header, Sidebar, Cards).
- [ ] **Lógica de Comunicación (API):** Terminar de conectar los componentes con el HttpHabitacionGateway para consumir datos reales.
- [ ] **Gestión de Estados:** Implementar la lógica para mostrar las habitaciones filtradas después de hacer clic en "Buscar".
- [ ] **Flujo de Autenticación:** Crear las pantallas de Login y Registro que se conecten con el backend.

### 🐳 Fase 3: Docker (Infraestructura)
- [ ] **Dockerizar Backend:** Crear el Dockerfile para la API de Express.
- [ ] **Dockerizar Frontend:** Crear el Dockerfile para la app de React/Vite.
- [ ] **Archivo Docker Compose:** Crear el docker-compose.yml que levante el Front, el Back y la Base de Datos con un solo comando.
- [ ] **Investigación Teórica:** Anotar los conceptos de Reverse Proxy (Nginx), certificados HTTPS y manejo de secretos (.env) para hostear el proyecto.

---

## ⚙️ Configuración y Uso

### 1. Instalación e Inicio

Asegúrate de estar en la carpeta **`apps/backend`** para iniciar el servidor de la API:

```bash
# 1. Instalar todas las dependencias (si no lo has hecho)
npm install

# 2. Iniciar el servidor (Requiere ts-node)
npm start