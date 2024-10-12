# WellBite.ai

**WellBite.ai** is a cutting-edge web-based platform designed to provide personalized dietary recommendations based on medical advice and restrictions. Leveraging advanced AI technology and a secure, scalable infrastructure, WellBite.ai helps patients maintain their health by analyzing their food intake and aligning it with their doctor's prescribed dietary restrictions. It offers seamless interaction between patients, doctors, and AI models through an intuitive, user-friendly interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### For Patients:
- **AI-powered food analysis**: Patients can upload pictures of their meals, and the AI model will analyze the ingredients, portion sizes, and nutritional information.
- **Dietary recommendations**: Based on the doctor's orders, the system will advise the patient on whether the meal complies with their dietary restrictions.
- **Interactive dashboard**: A personalized dashboard where patients can view their meal history, recommendations, and health progress.

### For Doctors:
- **Manage patient dietary restrictions**: Doctors can log in to the platform and set specific dietary restrictions for each patient.
- **Monitor patient compliance**: Doctors can track their patients' dietary choices over time to ensure adherence to prescribed diets.

### Key Features:
- **Secure and private**: Data is encrypted, ensuring patient information is securely handled and stored.
- **Scalable infrastructure**: Built using MongoDB, Flask, and Cloudflare for reliability and performance.
- **Real-time feedback**: Instant dietary advice after uploading a food image.

## Tech Stack

| Component             | Technology                      | Responsible Person             |
|-----------------------|----------------------------------|--------------------------------|
| **Frontend**           | React.js                        | Tojo Tsimalay                 |
| **Backend**            | Python, Flask                   | Stevenson Michel, Moise Dete-Kpinssounon |
| **Database**           | MongoDB                         | Amir Aref                     |
| **AI Model**           | Custom model using TensorFlow   | Tojo Tsimalay                 |
| **Hosting Platform**   | Cloudflare                      | Defang                        |

### Why We Chose This Stack:
- **React.js**: Provides a responsive and dynamic front-end, allowing users to easily upload photos and interact with the app.
- **Flask**: Lightweight and powerful, Flask seamlessly integrates with the AI model and handles requests efficiently.
- **MongoDB**: NoSQL database ideal for storing flexible, unstructured data such as food images, dietary information, and user records.
- **Cloudflare**: Ensures top-notch security and fast content delivery, making the app scalable and secure.
- **TensorFlow AI Model**: Accurately analyzes food content from images and cross-references it with dietary restrictions for personalized recommendations.

## Installation

To set up the WellBite.ai project on your local machine:

### Prerequisites:
- **Node.js** and **npm** (for front-end)
- **Python 3.x** (for back-end)
- **MongoDB** (local or cloud instance)
- **Flask** and related Python libraries
- **React.js** and related JavaScript libraries

### 1. Clone the Repository:
```bash
git clone https://github.com/your-repo/wellbite-ai.git
cd wellbite-ai
```

### 2. Backend Setup (Flask and AI):
- Navigate to the backend folder:
  ```bash
  cd backend
  ```
- Install the Python dependencies:
  ```bash
  pip install -r requirements.txt
  ```
- Configure MongoDB connection in the `config.py` file:
  ```python
  MONGO_URI = 'your-mongodb-connection-string'
  ```
- Start the Flask server:
  ```bash
  python app.py
  ```

### 3. Frontend Setup (React.js):
- Navigate to the frontend folder:
  ```bash
  cd frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm start
  ```

### 4. MongoDB Setup:
- If you don't have MongoDB installed, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud-based storage or install MongoDB locally.

## Usage

### For Patients:
1. **Sign up** for an account and log in.
2. **Upload a photo** of your meal using the intuitive image upload interface.
3. The AI model will analyze the meal and provide **dietary advice** based on your doctor's recommendations.
4. View your **dietary history** and compliance on your personal dashboard.

### For Doctors:
1. **Log in** to your doctor account.
2. Access your patient list and set **dietary restrictions** based on their medical needs.
3. Monitor patient compliance and make adjustments to their dietary plan when necessary.

## Contributing

We welcome contributions to WellBite.ai! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Submit a pull request.

Please make sure to follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**WellBite.ai** strives to make healthcare more personalized and proactive, empowering users to make better dietary choices through technology. By providing a seamless platform where patients and doctors can collaborate, we aim to enhance health outcomes and improve overall well-being.

Let’s build a healthier future together with **WellBite.ai**!
