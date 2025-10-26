-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2025 at 03:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ti-login`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Jackie', 'aaa@gmail.com', '$2b$08$lqlJufLNyoKucquUDnOG..H74uTvpz0kesBT7oZx7YW56NUCoi2FK'),
(2, 'Jackie', 'djeumenipatchepiaarthursamuel@gmail.com', '$2b$08$kxmlRnQ7tDTPK4UShhyNUuUTEDzFQD8ARhHgKHKf/hmivjEC.QJM6'),
(3, 'Res', 'Arthur@aa', '$2b$08$4EULyfaQ.6jBwsq57Hj9EODkdPMR1IUYnsLcZWN48S1Ur8ed99LmS'),
(4, 'Res', 'dams@gmail.com', '$2b$08$ske6W6F5GL8WSmGq3On2GOgEyZ054/c6D0zNAi4M1zBH.mudttEue'),
(5, 'Salec', 'jp@gmail.com', '$2b$08$2P6KMk4b0PtGuzfrAVXrkO8PGD.g3BZMGl5tQ7dY34Zb8BhA/kCL6'),
(6, 'Doe', 'az@gmail.com', '$2b$08$7.6f4A3W1TFV54G.hIkpo.94Wv9e27aozd5OVAn.wFoNkpFlUl9oe'),
(7, 'Dams Hellen ', 'damshellen@gmail.com', '$2b$08$edUtYjwEq8J7AQFkVdzxQe6ZCzw9X1zc0.P/PN5QBEl1QJWRHJi4m'),
(8, 'Yano Ivan', 'ivan@gmail.com', '$2b$08$q6lqcUPSRXafPGXoAZu/PuPG/gC.RY8bTXZdBgyC9rVQ/jKpoIl.K'),
(9, 'Mvy Bogne', 'mvy@gmail.com', '$2b$08$jvtWj2VLfdD1LRoNh6cxB.ba9QtZUc4N6whlElUZrsg3zs89d4Q0u'),
(10, 'Sherylle ', 'sherylle@gmail.com', '$2b$08$ABiOzKakhegccYZYTEM1HOHEGZUhjEVTCpgze8HAjsUTxZ21SZVK6'),
(11, 'Cindy ', 'cindy@gmail.com', '$2b$08$7iDtSPMtkORiquiz38iF9uLqpPP53I3YODFCih/0CaoyUgsXlslmy'),
(12, 'Noutsa Elsa ', 'Noutsa@gmail.com', '$2b$08$6Uh0en8OIT74uAiwwjnTQO7xARmdOxpOIThNrNs1YIm7ze1MzlpaO'),
(13, 'Dona Nice', 'nice@gmail.com', '$2b$08$6p30pApdoPeWYlXWJpNujeM4zrsURjEtRPEV4ndIVnX7n8l.mUGG.'),
(14, 'zregtzrb', 'qzevbrg@gmail.com', '$2b$08$Z04vRjAwKaPE.noAdmcIp.X2REozgihb/2OY2Qtdz7DSFHEVyLo7G'),
(15, 'Naie ', 'naie@gmail.com', '$2b$08$4NWadBiJiw.MJRLccDYcRe.D10K2bZbWUfIMQhFdG1jBkXmKPlSm.'),
(16, 'Faith', 'Faith@gmail.com', '$2b$08$S3uYVzOEi5j88ke1nY0ZtO2U3NgnD.0mgvNZvwGMzJNkPaQrH2XI.'),
(17, 'Destiny', 'des@gmail.com', '$2b$08$s8CPWb0rOfrU915SzMcpfefbMNtNWNYw8oCNqedBsuGXQbTtgbHUe'),
(18, 'Alex', 'alex@gmail.com', '$2b$08$WShBaycOWrmYw0SSRv7YDuZjz.7ZsB0NKN7arf2n/fhJS80MK58Z.'),
(19, 'Jemima', 'jemima@gmail.com', '$2b$08$Dl0KXGTbNam/OVmynVzlQ.MZqQ9VU0G927ObPOd7VvesTvB/Wy9Uy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
