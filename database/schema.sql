-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 26 oct. 2025 à 19:36
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ti-login`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `project_title` varchar(255) NOT NULL,
  `project_descrition` text NOT NULL,
  `cover_image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `project_images`
--

CREATE TABLE `project_images` (
  `images_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `image_path` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
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
(19, 'Jemima', 'jemima@gmail.com', '$2b$08$Dl0KXGTbNam/OVmynVzlQ.MZqQ9VU0G927ObPOd7VvesTvB/Wy9Uy'),
(20, 'test1', 'test1@gmail.com', '$2b$08$Wh6QbHs5IQXrX..uJsvic.nxCeRcuyTSaeqA6ig/rU.niFA0omgwC'),
(21, 'test2', 'test2@gmail.com', '$2b$08$OJm/v0YUjyL1ssl.shL7nuTq4xlsO6.Ap/UHtTVUlPTVCgS4mJC7W');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`name`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD UNIQUE KEY `project_id_2` (`project_id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`),
  ADD UNIQUE KEY `project_id_3` (`project_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD UNIQUE KEY `project_id_2` (`project_id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `project_images`
--
ALTER TABLE `project_images`
  ADD PRIMARY KEY (`images_id`),
  ADD UNIQUE KEY `project_id` (`project_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `project_images`
--
ALTER TABLE `project_images`
  MODIFY `images_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `project_images`
--
ALTER TABLE `project_images`
  ADD CONSTRAINT `project_images_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
