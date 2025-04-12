-- Create the database
CREATE DATABASE IF NOT EXISTS ecocampus;
USE ecocampus;

-- Create the User table
CREATE TABLE IF NOT EXISTS User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL,
    UserPassword VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    PhoneNo VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL
);

-- Create the Item table
CREATE TABLE IF NOT EXISTS Item (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL
);

-- Create the Rating table
CREATE TABLE IF NOT EXISTS Rating (
    RatingID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Rating DECIMAL(3, 2) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Create the Order table
CREATE TABLE IF NOT EXISTS `Order` (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    ItemID INT NOT NULL,
    UserID INT NOT NULL,
    OrderDate DATETIME NOT NULL,
    OrderStatus VARCHAR(50) NOT NULL,
    FOREIGN KEY (ItemID) REFERENCES Item(ItemID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Create the Payment table
CREATE TABLE IF NOT EXISTS Payment (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Method VARCHAR(50) NOT NULL,
    Date DATETIME NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID)
);

-- Create the Cart table
CREATE TABLE IF NOT EXISTS Cart (
    CartID INT AUTO_INCREMENT PRIMARY KEY,
    ItemID INT NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (ItemID) REFERENCES Item(ItemID)
);
