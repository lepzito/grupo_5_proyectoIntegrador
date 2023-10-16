CREATE DATABASE IF NOT EXISTS structure;

USE structure;

-- Tabla Tipo
CREATE TABLE Tipo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL
);

-- Tabla Seccion
CREATE TABLE Seccion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL
);

-- Tabla Marca
CREATE TABLE Marca (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL
);




-- Tabla Producto
CREATE TABLE Producto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  img VARCHAR(255),
  descripcion TEXT,
  descuento INT,
  tipoId INT,
  seccionId INT,
  marcaId INT,
  FOREIGN KEY (tipoId) REFERENCES Tipo(id),
  FOREIGN KEY (seccionId) REFERENCES Seccion(id),
  FOREIGN KEY (marcaId) REFERENCES Marca(id)
);
CREATE TABLE Especificaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productoId INT,
  nombre VARCHAR(255) NOT NULL,
  valor VARCHAR(255) NOT NULL,
  FOREIGN KEY (productoId) REFERENCES Producto(id)
);