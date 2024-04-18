-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2024 at 04:05 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fema`
--

-- --------------------------------------------------------

--
-- Table structure for table `disasters`
--

CREATE TABLE `disasters` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `city` varchar(32) NOT NULL,
  `picture` varchar(128) NOT NULL DEFAULT 'placeholder.jpeg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disasters`
--

INSERT INTO `disasters` (`id`, `type`, `city`, `picture`) VALUES
(1, 'Dust Storm', 'Phoenix', 'PhoenixDustStorm.png'),
(2, 'Monster Vs. Alien', 'San Fransico', 'MonstersVersusAliens.jpeg'),
(92, 'test3', 'test3', 'placeholder.jpeg'),
(93, 'Test3', 'Test3', 'placeholder.jpeg'),
(94, 'test', 'test', 'placeholder.jpeg'),
(95, 'test', 'test', 'placeholder.jpeg'),
(96, 'asd', 'sdasd', 'placeholder.jpeg'),
(97, 'saddsa', 'sadasd', 'placeholder.jpeg'),
(98, 'saddsa', 'sadasd', 'placeholder.jpeg'),
(99, 'adsdsa', 'sasd', 'placeholder.jpeg'),
(100, 'dsa', 'sad', 'placeholder.jpeg'),
(101, 'dsa', 'sad', 'placeholder.jpeg'),
(102, 'sdfdsf', 'dsfsd', 'placeholder.jpeg'),
(103, 'sdfdsf', 'dsfsd', 'placeholder.jpeg'),
(104, 'sdfdsf', 'dsfsd', 'placeholder.jpeg'),
(105, 'sdfdsf', 'dsfsd', 'placeholder.jpeg'),
(106, 'dfsdfs', 'fsddfs', 'placeholder.jpeg'),
(107, 'dsfdsf', 'sdsdf', 'placeholder.jpeg'),
(108, 'ads', 'ads', 'placeholder.jpeg'),
(109, 'sad', 'as', 'placeholder.jpeg'),
(110, 'dasasd', 'asdd', 'placeholder.jpeg'),
(111, 'afds', 'sadffds', 'placeholder.jpeg'),
(112, 'afds', 'sadffds', 'placeholder.jpeg'),
(113, 'Tornado', 'Brooklyn', 'placeholder.jpeg'),
(114, 'fadfds', 'dsfaadfs', 'placeholder.jpeg'),
(115, 'adssad', 'asdasd', 'placeholder.jpeg'),
(116, 'dsfdfs', 'dsf', 'placeholder.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `needs`
--

CREATE TABLE `needs` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT 'Volunteers',
  `disaster_id` int(11) NOT NULL DEFAULT 1,
  `quantity_filled` int(11) NOT NULL DEFAULT 0,
  `quantity_max` int(11) NOT NULL DEFAULT 100,
  `warehouse` varchar(32) NOT NULL DEFAULT 'Phoenix',
  `status` enum('in_warehouse','in_transit','delivered') NOT NULL DEFAULT 'in_warehouse'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `needs`
--

INSERT INTO `needs` (`id`, `name`, `disaster_id`, `quantity_filled`, `quantity_max`, `warehouse`, `status`) VALUES
(1, 'Volunteers', 1, 500, 500, '', 'in_warehouse'),
(2, 'Hats', 1, 1000, 1000, '', 'in_warehouse'),
(3, 'Gloves', 1, 250, 250, '', 'in_warehouse'),
(4, 'Volunteers', 2, 500, 500, '', 'in_warehouse'),
(5, 'Sweaters', 2, 1000, 1000, '', 'delivered'),
(6, 'Bandages', 2, 250, 250, '', 'in_warehouse'),
(7, 'adfs', 112, 0, 213, 'Phoenix', 'in_warehouse'),
(8, 'Volunteers', 113, 0, 500, 'Phoenix', 'in_warehouse'),
(9, 'Cows', 113, 900, 10000000, 'Phoenix', 'in_warehouse'),
(10, 'Trees', 113, 0, 2, 'Phoenix', 'in_warehouse'),
(11, 'adsfdsf', 114, 0, 324324, 'Phoenix', 'in_warehouse'),
(12, 'asddsa', 115, 0, 231, 'Phoenix', 'in_warehouse'),
(13, 'dasads', 115, 0, 23232, 'Phoenix', 'in_warehouse'),
(14, 'sdfdsfdfs', 116, 0, 3232, 'Phoenix', 'in_warehouse');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `type` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `type`) VALUES
(1, 's', 's', 's', 'Organization'),
(2, 'Hayden Baldwin', 'haydenb@andrews.edu', 'hwb123321', 'Doctor'),
(3, 'Hayden Baldwin', 'haydenb@andrews.edu', 'hwb123321', 'Doctor'),
(4, 'Hayden Baldwin', 'haydenb@andrews.edu', 'hwb123321', 'Doctor'),
(5, '', '', '', 'Organization'),
(6, 'Hayden Baldwin', 'haydenb@andrews.edd', '32423234', 'General'),
(7, 'Hi my name is bob', 'derpder', 'assad', 'Organization');

-- --------------------------------------------------------

--
-- Table structure for table `warehouses`
--

CREATE TABLE `warehouses` (
  `id` int(11) NOT NULL,
  `city` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `disasters`
--
ALTER TABLE `disasters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `needs`
--
ALTER TABLE `needs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `disasters`
--
ALTER TABLE `disasters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `needs`
--
ALTER TABLE `needs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
