Read this in other language: [Bahasa Indonesia](README-ID.md)

Frontend repository: [Frontend](https://github.com/petrabayu/dss-camera-frontend)

# Decision Support System for Digital Camera Selection (Backend)

## **Description**

A web-based Decision Support System application designed to assist users in selecting the most suitable digital camera based on multiple criteria such as image quality, performance, price, video quality, and ease of use. The application leverages the Analytical Hierarchy Process (AHP) method for criteria weighting and Technique for Order Preference by Similarity to Ideal Solution (TOPSIS) method for final ranking.

## **Dataset**

The dataset used can be downloaded here: [Digital Camera Specifications Dataset](https://www.kaggle.com/datasets/petrabayupangestu/camaera-digital-specification)

## **Feature**

- CRUD Digital Cameras,
- Pairwise Comparison using AHP method,
- Ranking best camera by preference using TOPSIS method.

## **Tech Stack**

- **Frontend:** React Vite, Tailwind, Axios, ChartJs,
- **Backend:** NodeJS, ExpressJS,
- **Database:** MySQL.

## **API Endpoint**

### **Camera Endpoint**

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/api/cameras/`         | Create new camera data   |
| GET    | `/api/cameras/`         | Get all camera data      |
| GET    | `/api/cameras/:id`      | Get camera data by id    |
| POST   | `/api/cameras/selected` | Get selected camera data |
| PUT    | `/api/cameras/:id`      | Edit camera data by id   |
| DELETE | `/api/cameras/:id`      | Delete camera data by id |

### **AHP Weights Endpoint**

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| POST   | `/api/ahp-weights/`       | Create new AHP weights |
| GET    | `/api/ahp-weights/latest` | Get latest AHP weights |
| GET    | `/api/ahp-weights/:id`    | Get AHP weights by id  |

### **TOPSIS Calculation Endpoint**

| Method | Endpoint                     | Description                               |
| ------ | ---------------------------- | ----------------------------------------- |
| POST   | `/api/topsis-scores/`        | Create new TOPSIS scores                  |
| GET    | `/api/topsis-scores/ranking` | Get latest ranking based on TOPSIS scores |
| POST   | `/api/topsis-calculation/`   | Perform TOPSIS calculation                |

## **Installation**

1. Clone and run the backend by following instruction below:

```bash
git clone https://github.com/petrabayu/dss-camera-backend.git

cd dss-camera-backend

npm install

npm start
```

2. Server will run on `http://localhost:3000/` by default.

   > **NOTE:** If you prefer using a different port, feel free to update the backend port and adjust the corresponding API endpoint on the frontend as well.

3. Setup `.env` and fill in the required environment variables.

```env
PORT = 3000
DB_HOST = 'your_host'
DB_USER = 'your_db_root'
DB_PASSWORD = 'your_db_password'
DB_SCHEMA = 'your_db_schema'
```

4. Continued by clone and run the frontend program: [DSS-Frontend](https://github.com/petrabayu/dss-camera-frontend),

## **Contact**

**Created by petrabayu - [LinkedIn](https://www.linkedin.com/in/petrabayu/) - petrabayu19@gmail.com**
