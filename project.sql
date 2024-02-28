-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2024 at 08:17 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `lang_id` int(11) NOT NULL,
  `lang_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`lang_id`, `lang_name`) VALUES
(1, 'Japanese');

-- --------------------------------------------------------

--
-- Table structure for table `level_table`
--

CREATE TABLE `level_table` (
  `level_id` int(11) NOT NULL,
  `level_number` int(11) NOT NULL,
  `level_lang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `level_table`
--

INSERT INTO `level_table` (`level_id`, `level_number`, `level_lang`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `question_table`
--

CREATE TABLE `question_table` (
  `question_id` int(11) NOT NULL,
  `question_content` text NOT NULL,
  `question_answer` text NOT NULL,
  `question_level` int(11) NOT NULL,
  `question_type` text NOT NULL,
  `question_option` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question_table`
--

INSERT INTO `question_table` (`question_id`, `question_content`, `question_answer`, `question_level`, `question_type`, `question_option`) VALUES
(1, 'これは、新しい', 'あたらしい', 1, 'Options', 'あたらしい あたらし あたらしいい あたらししい');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `userid` int(11) NOT NULL,
  `userdate` date NOT NULL DEFAULT current_timestamp(),
  `user_lang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `email`, `userid`, `userdate`, `user_lang`) VALUES
('atharva', '$2b$10$5vG9EHnbgvreURJESYlS2ORDJD1vc/SeEX7WGP.gA99FiLwLa1uu6', 'atharva@1', 11, '2024-02-27', 1),
('atharva3', '$2b$10$Zk1CvXnVGi1MPe7DwpPob.NrQnsUHEQpPYCs4tvZ6CNHz.YCbnC4G', 'atharva@3', 12, '2024-02-27', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`lang_id`);

--
-- Indexes for table `level_table`
--
ALTER TABLE `level_table`
  ADD PRIMARY KEY (`level_id`),
  ADD KEY `level_lang` (`level_lang`);

--
-- Indexes for table `question_table`
--
ALTER TABLE `question_table`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `question_level` (`question_level`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD KEY `user_lang` (`user_lang`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `lang_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `level_table`
--
ALTER TABLE `level_table`
  MODIFY `level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `question_table`
--
ALTER TABLE `question_table`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `level_table`
--
ALTER TABLE `level_table`
  ADD CONSTRAINT `level_table_ibfk_1` FOREIGN KEY (`level_lang`) REFERENCES `language` (`lang_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `question_table`
--
ALTER TABLE `question_table`
  ADD CONSTRAINT `question_table_ibfk_1` FOREIGN KEY (`question_level`) REFERENCES `level_table` (`level_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
