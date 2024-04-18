-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2024 at 10:38 PM
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
-- Database: `twenty-questions`
--

-- --------------------------------------------------------

--
-- Table structure for table `dnas`
--

CREATE TABLE `dnas` (
  `animal` varchar(32) NOT NULL,
  `is_insect` tinyint(1) NOT NULL DEFAULT 0,
  `lives_in_water` tinyint(1) NOT NULL DEFAULT 0,
  `is_bigger_than_a_human` tinyint(1) NOT NULL DEFAULT 0,
  `has_fur_feathers_or_scales` tinyint(1) NOT NULL DEFAULT 0,
  `has_horn_tusk_or_long_neck` tinyint(1) NOT NULL DEFAULT 0,
  `is_carnivore` tinyint(1) NOT NULL DEFAULT 0,
  `has_stripes_or_spots` tinyint(1) NOT NULL DEFAULT 0,
  `is_nocturnal` tinyint(1) NOT NULL DEFAULT 0,
  `is_social` tinyint(1) NOT NULL DEFAULT 0,
  `is_mammal` tinyint(1) NOT NULL DEFAULT 0,
  `has_long_lifespan` tinyint(1) NOT NULL DEFAULT 0,
  `is_loud` tinyint(1) NOT NULL DEFAULT 0,
  `is_fast` tinyint(1) NOT NULL DEFAULT 0,
  `is_endangered` tinyint(1) NOT NULL DEFAULT 0,
  `is_pet` tinyint(1) NOT NULL DEFAULT 0,
  `is_featured_in_madagascar_movie` tinyint(1) NOT NULL DEFAULT 0,
  `is_friendly_to_humans` tinyint(1) NOT NULL DEFAULT 0,
  `is_smaller_than_a_microwave` tinyint(1) NOT NULL DEFAULT 0,
  `is_native_to_united_states` tinyint(1) NOT NULL DEFAULT 0,
  `is_brown` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question` varchar(32) NOT NULL,
  `text` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question`, `text`) VALUES
('has_fur_feathers_or_scales', 'Does your animal have fur, feathers, or scales?'),
('has_horn_tusk_or_long_neck', 'Does your animal have a horn, tusk, long neck, or something similar?'),
('has_long_lifespan', 'Does your animal have a long lifespan?'),
('has_stripes_or_spots', 'Does your animal have stripes or spots?'),
('is_bigger_than_a_human', 'Is your animal bigger than a human?'),
('is_brown', 'Is your animal brown?'),
('is_carnivore', 'Is your animal a carnivore? (Does it ONLY eat meat?)'),
('is_endangered', 'Is your animal endangered?'),
('is_fast', 'Is your animal a fast runner, swimmer, or flier?'),
('is_featured_in_madagascar_movie', 'Is your animal featured in the movie Madagascar?'),
('is_friendly_to_humans', 'Is your animal friendly to humans?'),
('is_insect', 'Is your animal an insect?'),
('is_loud', 'Is your animal known for making loud noises?'),
('is_mammal', 'Is your animal a mammal?'),
('is_native_to_united_states', 'Is your animal native to the United States?'),
('is_nocturnal', 'Is your animal nocturnal?'),
('is_pet', 'Is your animal a common household pet?'),
('is_smaller_than_a_microwave', 'Is your animal smaller than a microwave?'),
('is_social', 'Is your animal social, or anti-social?'),
('lives_in_water', 'Does your animal live in water?');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dnas`
--
ALTER TABLE `dnas`
  ADD PRIMARY KEY (`animal`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
