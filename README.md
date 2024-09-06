
# Microservicios de Matrices y Estadísticas

## Descripción del Proyecto

Este proyecto consiste en dos microservicios que realizan operaciones con matrices y análisis estadísticos:
1. **Servicio de Matrices**: Maneja la factorización QR utilizando el algoritmo y se comunica con el Servicio de Estadísticas para el procesamiento estadístico.
2. **Servicio de Estadísticas**: Calcula estadísticas como el máximo, mínimo, promedio y suma de las matrices `Q` y `R`, además de verificar si son diagonales.

El proyecto también incluye un frontend en **Vue.js** para interactuar con el servicio de matrices, permitiendo a los usuarios iniciar sesión, enviar matrices y ver estadísticas.

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Documentación de la API](#documentación-de-la-api)
- [Variables de Entorno](#variables-de-entorno)
- [Tecnologías](#tecnologías)
- [Licencia](#licencia)

## Arquitectura

### Backend
El backend consta de dos microservicios:
- **Servicio de Matrices**: Proporciona endpoints para la factorización QR y envía los resultados al Servicio de Estadísticas.
- **Servicio de Estadísticas**: Recibe las matrices `Q` y `R` del Servicio de Matrices y calcula varias estadísticas.

Ambos servicios están dockerizados y se comunican entre sí a través de llamadas HTTP API.

### Frontend
El frontend en **Vue.js** permite a los usuarios:
- Iniciar sesión a través de un formulario.
- Enviar una matriz para la factorización QR.
- Ver las estadísticas resultantes en un gráfico.

## Instalación

### Requisitos Previos
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (si se ejecuta localmente sin Docker)
- [Vue CLI](https://cli.vuejs.org/) (opcional, para desarrollo con Vue.js)

### Clonar el repositorio:

```bash
git clone https://github.com/ErickFDiaz/interseguro-repo.git
cd tu-proyecto
```

### Configuración del Backend

1. **Servicio de Matrices**: 

    Navega a la carpeta `interseguro-matrix` e instala las dependencias:
    ```bash
    cd interseguro-matrix
    npm install
    ```

2. **Servicio de Estadísticas**: 

    Navega a la carpeta `interseguro-stats` e instala las dependencias:
    ```bash
    cd interseguro-stats
    npm install
    ```

### Configuración del Frontend

Navega a la carpeta `interseguro-app` e instala las dependencias:

```bash
cd interseguro-app
npm install
```

## Ejecución del Proyecto

### Usando Docker Compose

1. Asegúrate de que Docker esté instalado y ejecutándose.
2. Ejecuta el siguiente comando desde el directorio raíz del proyecto:

    ```bash
    docker-compose up --build
    ```

Esto construirá y pondrá en marcha los microservicios de backend y la aplicación frontend.

### Sin Docker

1. **Backend**: 

    Inicia los servicios de matrices y estadísticas de forma individual navegando a sus respectivos directorios y ejecutando:

    ```bash
    npm run dev
    ```

2. **Frontend**: 

    Navega a la carpeta `interseguro-app` y ejecuta:

    ```bash
    npm run dev
    ```

Accede al frontend de Vue.js en `http://localhost:8080`.

## Documentación de la API

### Servicio de Matrices

- **POST /api/1.0/matrixes**
    - **Descripción**: Envía una matriz para la factorización QR y devuelve las matrices resultantes `Q` y `R`, junto con las estadísticas.
    - **Cuerpo de la Solicitud**: 
    ```json
    {
      "matrix": [
        [1, 2],
        [3, 4]
      ]
    }
    ```
    - **Respuesta**:
    ```json
    {
      "Q": [...],
      "R": [...],
      "max": 4,
      "min": 1,
      "avg": 2.5,
      "sum": 10,
      "isQDiagonal": false,
      "isRDiagonal": false
    }
    ```

### Servicio de Estadísticas

- **POST /api/1.0/stats**
    - **Descripción**: Recibe las matrices `Q` y `R` y devuelve el máximo, mínimo, promedio y suma de los elementos, junto con verificaciones diagonales.
    - **Cuerpo de la Solicitud**:
    ```json
    {
      "Q": [...],
      "R": [...]
    }
    ```
    - **Respuesta**:
    ```json
    {
      "max": 4,
      "min": 1,
      "avg": 2.5,
      "sum": 10,
      "isQDiagonal": false,
      "isRDiagonal": false
    }
    ```

## Variables de Entorno

Cada microservicio requiere variables de entorno específicas para su correcta operación. Puedes definirlas en archivos `.env` en la raíz de cada servicio.

### Servicio de Matrices (.env)

```env
PORT=6060
DB_URI=mongodb://localhost:27017/matrix-db
STATS_SERVICE_URL=http://localhost:7070/api/1.0
STATS_TOKEN=tu-token-del-servicio-de-stats
```

### Servicio de Estadísticas (.env)

```env
PORT=7070
TOKEN_STATIC=tu-token-estático
```

## Tecnologías

- **Backend**: Node.js, Express.js, MongoDB, Axios
- **Frontend**: Vue.js, Vuetify, Vue Router, Pinia
- **DevOps**: Docker, Docker Compose, Nginx

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

