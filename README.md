# Gantt Chart Mini Task

Backend and database are working correctly for the given task. Frontend needs improvement but it works.

![https://quire.io/blog/images/2021-04-07-why-timeline/complicated.gif](https://quire.io/blog/images/2021-04-07-why-timeline/complicated.gif)

## Database
in this case, create a mysql database.

```sql
-- Create Database
CREATE DATABASE gantt_chart;
USE gantt_chart;

-- Tables
CREATE TABLE work_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer VARCHAR(100) NOT NULL,
  quantity INT
);

CREATE TABLE machines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  work_order_id INT,
  machine_id INT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  FOREIGN KEY (work_order_id) REFERENCES work_orders(id),
  FOREIGN KEY (machine_id) REFERENCES machines(id)
);
```

Insert examples data
```sql
-- machines
INSERT INTO machines (name) VALUES
('SARDON'), ('FINAL KALITE NORTROL'), ('SARDON 1'), 
('SARDON 2'), ('TUP ACNA'), ('BALON'), ('Machine KONS');

-- work_orders
INSERT INTO work_orders (order_number, customer, quantity) VALUES
('MFG-5', 'ATLAS', 100),
('RAM-1', 'Müşteri A', 50),
('KURUTINA-2', 'Müşteri B', 75);

-- schedules (for MFG-5)
INSERT INTO schedules (work_order_id, machine_id, start_time, end_time) VALUES
(1, 1, '2024-12-18 09:58:00', '2024-12-18 10:28:13'),
(1, 3, '2024-12-19 00:00:00', '2024-12-19 11:00:00'),
(1, 5, '2024-12-20 00:00:00', '2024-12-21 00:00:00');
```

## Backend
```bash
mkdir backend
cd backend
npm init -y
npm install express mysql2 cors dotenv
npm install -D nodemon
```
```json
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mysql2": "^3.13.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
```

## Frontend
Technologies: REACT + Vite

Gantt Chart Library: wx-react-gantt

```json
"dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "wx-react-gantt": "^1.3.1"
}
```

for start on development.
```bash
npm run dev
```
