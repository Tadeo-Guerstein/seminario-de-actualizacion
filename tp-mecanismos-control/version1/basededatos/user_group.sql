-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2024 a las 23:48:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `user_group`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetActions` ()   BEGIN
    SELECT * from action ORDER BY action.id ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetActionsGroup` ()   BEGIN
    SELECT action.id, action.name, group_type.name AS groupName from action
          INNER JOIN group_action ON group_action.id_action = action.id
          INNER JOIN group_type ON group_type.id = group_action.id_group;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetGroups` ()   BEGIN
    SELECT * from group_type;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetGroupUsers` ()   BEGIN
    SELECT group_type.id, group_type.name, user.name AS username from group_type
          INNER JOIN group_user ON group_user.id_group = group_type.id
          INNER JOIN user ON user.id = group_user.id_user;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUsers` ()   BEGIN
   SELECT * from user ORDER BY user.id ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUsersGroup` ()   BEGIN
    SELECT user.id, user.name, group_type.name AS groupName from user
          INNER JOIN group_user ON group_user.id_user = user.id
          INNER JOIN group_type ON group_type.id = group_user.id_group;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SetActionGroups` (IN `idAction` INT, IN `idGroup` INT)   BEGIN
    INSERT INTO group_action (id_action, id_group) VALUES (idAction, idGroup);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SetActions` (IN `nombre` VARCHAR(100), OUT `lastId` INT)   BEGIN
    INSERT INTO action (name) VALUES (nombre);
    SET lastId = LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SetGroups` (IN `nombre` VARCHAR(100))   BEGIN
    INSERT INTO group_type (name) VALUES (nombre);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SetUser` (IN `userName` VARCHAR(100), OUT `lastId` INT)   BEGIN
    INSERT INTO user (name) VALUES (userName);
    SET lastId = LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SetUserGroups` (IN `idUser` INT, IN `idGroup` INT)   BEGIN
    INSERT INTO group_user (id_user, id_group) VALUES (idUser, idGroup);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `action`
--

CREATE TABLE `action` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `action`
--

INSERT INTO `action` (`id`, `name`) VALUES
(7, 'Acción'),
(5, 'actualizar usuarios'),
(1, 'agregar usuarios'),
(2, 'Eliminar usuarios'),
(10, 'jkhjfkjfhk'),
(8, 'Nueva accion'),
(9, 'Otra nueva acción'),
(3, 'preceptores'),
(6, 'Remover usuarios'),
(4, 'test');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `group_action`
--

CREATE TABLE `group_action` (
  `id` int(11) NOT NULL,
  `id_action` int(11) NOT NULL,
  `id_group` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `group_action`
--

INSERT INTO `group_action` (`id`, `id_action`, `id_group`) VALUES
(1, 1, 1),
(2, 2, 5),
(3, 2, 7),
(4, 4, 8),
(5, 6, 1),
(6, 6, 4),
(7, 6, 5),
(8, 6, 6),
(9, 8, 9),
(10, 9, 1),
(11, 9, 4),
(12, 10, 9),
(13, 10, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `group_type`
--

CREATE TABLE `group_type` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `group_type`
--

INSERT INTO `group_type` (`id`, `name`) VALUES
(8, 'dfaggsdf'),
(9, 'directivos'),
(4, 'egresados'),
(2, 'estudiantes'),
(6, 'grupo random'),
(7, 'otro grupo random'),
(1, 'preceptores'),
(5, 'profesores');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `group_user`
--

CREATE TABLE `group_user` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_group` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `group_user`
--

INSERT INTO `group_user` (`id`, `id_user`, `id_group`) VALUES
(1, 1, 2),
(2, 4, 5),
(3, 5, 2),
(4, 7, 7),
(5, 8, 1),
(6, 10, 2),
(7, 11, 2),
(8, 12, 5),
(9, 13, 8),
(10, 16, 1),
(11, 16, 4),
(12, 17, 1),
(13, 17, 2),
(18, 30, 1),
(19, 31, 2),
(20, 32, 1),
(21, 32, 2),
(22, 32, 4),
(23, 33, 1),
(24, 33, 2),
(25, 33, 4),
(26, 33, 5),
(27, 34, 1),
(28, 34, 2),
(29, 34, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`) VALUES
(9, 'asd'),
(10, 'asdasdsdgfdg'),
(11, 'dfgdfgertry'),
(12, 'ertgyhrthjdftyjk'),
(31, 'estudiante'),
(16, 'gdfdfgdgsrfsfgh'),
(21, 'hfjhdghj'),
(6, 'Katia'),
(13, 'Kevin'),
(17, 'kjdfgjkdfsjksgdfjkl'),
(20, 'Martina'),
(4, 'Matias'),
(18, 'Meli'),
(5, 'Nahuel'),
(15, 'newTesting'),
(27, 'Otro tadeo'),
(28, 'Otro test'),
(19, 'Pablito'),
(34, 'pepe'),
(32, 'p´weropweropwe'),
(26, 'Silvia'),
(22, 'tADE'),
(1, 'Tadeo'),
(23, 'tADEUS'),
(8, 'Test'),
(29, 'test mil'),
(30, 'test mill uno'),
(33, 'Test millon'),
(14, 'testing'),
(7, 'Yesica ');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `group_action`
--
ALTER TABLE `group_action`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_action` (`id_action`),
  ADD KEY `id_group` (`id_group`);

--
-- Indices de la tabla `group_type`
--
ALTER TABLE `group_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `group_user`
--
ALTER TABLE `group_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_group` (`id_group`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `action`
--
ALTER TABLE `action`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `group_action`
--
ALTER TABLE `group_action`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `group_type`
--
ALTER TABLE `group_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `group_user`
--
ALTER TABLE `group_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `group_action`
--
ALTER TABLE `group_action`
  ADD CONSTRAINT `group_action_ibfk_1` FOREIGN KEY (`id_action`) REFERENCES `action` (`id`),
  ADD CONSTRAINT `group_action_ibfk_2` FOREIGN KEY (`id_group`) REFERENCES `group_type` (`id`);

--
-- Filtros para la tabla `group_user`
--
ALTER TABLE `group_user`
  ADD CONSTRAINT `group_user_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `group_user_ibfk_2` FOREIGN KEY (`id_group`) REFERENCES `group_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
