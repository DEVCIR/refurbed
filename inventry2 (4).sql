-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2025 at 04:57 PM
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
-- Database: `inventry2`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `heading` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `heading`, `content`, `image`, `created_at`, `updated_at`) VALUES
(4, 'Apple Intelligence arrives in Ireland: here’s your list of compatible Apple devices', 'The wait is over: with the release of iOS 18.4, iPadOS 18.4 and macOS Sequoia 15.4, Apple Intelligence is finally available to Irish customers on iPhone, iPad and Mac. Here are the Apple products that support it.', 'blog_images/Y2Tq2eR84Gif1g7mFR6kx90edJFzjRMOc9VjDIDl.jpg', '2025-05-02 07:20:55', '2025-05-02 07:20:55'),
(5, 'Refurbished Tech vs New: Which One Is Right For You?', 'Buying refurbished isn\'t just good for your wallet — it\'s great for the planet too. Here\'s a detailed comparison between refurbished and new tech to help you decide.', 'blog_images/ptPGiQvdl0YP4FOgYDHrivLAgVnBMc18xPNaf2Yx.jpg', '2025-05-02 07:21:29', '2025-05-02 07:21:29'),
(10, '5 Things to Check Before Buying a Refurbished Device', 'The wait is over: with the release of iOS 18.4, iPadOS 18.4 and macOS Sequoia 15.4, Apple Intelligence is finally available to Irish customers on iPhone, iPad and Mac. Here are the Apple products that support it.', 'blog_images/liSjCWPREn1NhLBaJ9JWWum5pQoMbeO4wAjEbejw.jpg', '2025-05-02 07:43:39', '2025-05-02 07:43:39');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `brand_name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'samsung', 'One Of the Largest Tech Gadgets Company Of the World', 1, NULL, NULL),
(2, 'apple', NULL, 1, '2025-03-27 15:37:51', '2025-03-27 15:58:06'),
(3, 'redmi', NULL, 1, '2025-03-28 16:05:54', '2025-03-28 16:05:54'),
(5, 'infinix', NULL, 1, '2025-03-30 21:24:40', '2025-03-30 21:24:40'),
(6, 'oppo', NULL, 1, '2025-04-07 13:30:02', '2025-04-07 13:30:02'),
(9, 'tcl', NULL, 1, '2025-04-07 14:23:52', '2025-04-07 14:23:52');

-- --------------------------------------------------------

--
-- Table structure for table `campaign_recipients`
--

CREATE TABLE `campaign_recipients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campaign_id` bigint(20) UNSIGNED NOT NULL,
  `subscriber_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email_address` varchar(100) NOT NULL,
  `status` enum('Pending','Sent','Failed','Opened','Clicked') NOT NULL DEFAULT 'Pending',
  `sent_time` timestamp NULL DEFAULT NULL,
  `open_time` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campaign_recipients`
--

INSERT INTO `campaign_recipients` (`id`, `campaign_id`, `subscriber_id`, `email_address`, `status`, `sent_time`, `open_time`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 1, 1, 'wajidahmed425@gmail.com', 'Pending', NULL, NULL, 1, '2025-04-14 06:40:30', '2025-04-14 07:37:11'),
(3, 7, 7, 'bilal123@gmail.com', 'Pending', NULL, NULL, 1, '2025-04-14 07:02:06', '2025-04-14 07:34:39'),
(5, 10, 5, 'areesha345@gmail.com', 'Pending', NULL, NULL, 1, '2025-04-23 04:00:48', '2025-04-23 04:00:48');

-- --------------------------------------------------------

--
-- Table structure for table `credit_notes`
--

CREATE TABLE `credit_notes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `credit_note_number` varchar(30) NOT NULL,
  `rma_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `issue_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('Draft','Issued','Applied','Cancelled') NOT NULL DEFAULT 'Draft',
  `notes` text DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `credit_notes`
--

INSERT INTO `credit_notes` (`id`, `credit_note_number`, `rma_id`, `customer_id`, `issue_date`, `total_amount`, `status`, `notes`, `created_by`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'CN12345', 1, 1, '2024-03-28', 100.50, 'Applied', 'Amount applied to customer account', 1, 1, '2025-03-27 18:04:39', '2025-03-27 18:06:19'),
(13, 'CRE-483', 8, 1, '2025-04-30', 680.99, 'Issued', NULL, 13, 1, '2025-04-30 11:22:00', '2025-04-30 11:22:00');

-- --------------------------------------------------------

--
-- Table structure for table `credit_note_items`
--

CREATE TABLE `credit_note_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `credit_note_id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `credit_note_items`
--

INSERT INTO `credit_note_items` (`id`, `credit_note_id`, `inventory_id`, `description`, `quantity`, `unit_price`, `total_price`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 2, NULL, 1, 55000.00, 54986.00, 1, '2025-04-18 10:16:48', '2025-04-18 10:16:48'),
(7, 13, 1, NULL, 2, 800.99, 680.99, 1, '2025-04-30 11:22:01', '2025-04-30 11:22:01');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `tax_id` varchar(50) DEFAULT NULL,
  `customer_type` enum('Retail','Wholesale') NOT NULL DEFAULT 'Retail',
  `credit_limit` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `address`, `city`, `country`, `postal_code`, `tax_id`, `customer_type`, `credit_limit`, `notes`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Maria\'s Corner', 'Karachi', 'Pakistan', '768064', NULL, 'Retail', NULL, 'First customer', 1, NULL, NULL),
(3, 2, 'abid town', 'karachi', 'pakistan', '123456', NULL, 'Retail', NULL, 'third customer', 1, NULL, NULL),
(11, 12, 'abid town', 'karachi', 'pakistan', '768064', NULL, 'Retail', NULL, NULL, 1, '2025-04-09 12:15:58', '2025-04-23 03:28:57'),
(13, 20, 'bellasis street', 'karachi', 'pakistan', '768064', '1', 'Retail', 1.00, 'new', 1, '2025-04-16 07:23:53', '2025-04-16 07:23:53');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_notes`
--

CREATE TABLE `delivery_notes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `delivery_number` varchar(30) NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `delivery_date` date NOT NULL,
  `shipping_method` varchar(50) DEFAULT NULL,
  `tracking_number` varchar(50) DEFAULT NULL,
  `status` enum('Preparing','Shipped','Delivered') NOT NULL DEFAULT 'Preparing',
  `notes` text DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `delivery_notes`
--

INSERT INTO `delivery_notes` (`id`, `delivery_number`, `order_id`, `customer_id`, `delivery_date`, `shipping_method`, `tracking_number`, `status`, `notes`, `created_by`, `is_active`, `created_at`, `updated_at`) VALUES
(7, 'DEV-626', 18, 1, '2025-04-16', 'cod', '1', 'Preparing', 'for testing purpose', 1, 1, '2025-04-14 05:55:01', '2025-04-16 06:30:02'),
(9, 'DEV-193', 18, 1, '2025-04-14', 'online', '1', 'Preparing', 'imp', 1, 1, '2025-04-14 06:02:31', '2025-04-14 06:02:31'),
(23, 'DEV-185310', 56, 3, '2025-04-29', 'online', 'TRA-552151', 'Preparing', NULL, 13, 1, '2025-04-29 12:55:26', '2025-04-29 12:55:26'),
(24, 'DEV-406147', 57, 3, '2025-04-29', 'online', 'TRA-975368', 'Preparing', NULL, 13, 1, '2025-04-29 12:56:34', '2025-04-29 12:56:34');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_note_items`
--

CREATE TABLE `delivery_note_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `delivery_note_id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `delivery_note_items`
--

INSERT INTO `delivery_note_items` (`id`, `delivery_note_id`, `inventory_id`, `quantity`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 7, 1, 2, NULL, 1, '2025-04-14 05:55:02', '2025-04-14 05:55:02'),
(2, 7, 2, 1, NULL, 1, '2025-04-14 05:55:04', '2025-04-14 05:55:04'),
(4, 9, 2, 1, NULL, 1, '2025-04-14 06:02:32', '2025-04-14 06:02:32'),
(16, 23, 2, 1, NULL, 1, '2025-04-29 12:55:26', '2025-04-29 12:55:26'),
(17, 24, 2, 1, NULL, 1, '2025-04-29 12:56:34', '2025-04-29 12:56:34');

-- --------------------------------------------------------

--
-- Table structure for table `email_campaigns`
--

CREATE TABLE `email_campaigns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `template_id` bigint(20) UNSIGNED DEFAULT NULL,
  `campaign_name` varchar(100) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `scheduled_time` timestamp NULL DEFAULT NULL,
  `status` enum('Draft','Scheduled','Sent','Cancelled') NOT NULL DEFAULT 'Draft',
  `sent_count` int(11) NOT NULL DEFAULT 0,
  `open_count` int(11) NOT NULL DEFAULT 0,
  `click_count` int(11) NOT NULL DEFAULT 0,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_campaigns`
--

INSERT INTO `email_campaigns` (`id`, `template_id`, `campaign_name`, `subject`, `content`, `scheduled_time`, `status`, `sent_count`, `open_count`, `click_count`, `created_by`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, '2024', 'about inventory', 'campaign of 2024', '2025-04-23 03:45:00', 'Draft', 0, 0, 0, 13, 1, '2025-04-11 14:41:02', '2025-04-23 03:47:13'),
(7, 3, '2025', 'about phones', 'campaign of 2025', '2025-04-11 16:00:00', 'Draft', 0, 0, 0, 13, 1, '2025-04-11 16:00:41', '2025-04-23 03:47:03'),
(10, 7, '2026', 'about iphones', 'campaign of 2026', '2025-04-16 07:41:00', 'Draft', 0, 0, 0, 13, 1, '2025-04-16 07:42:07', '2025-04-23 03:46:52');

-- --------------------------------------------------------

--
-- Table structure for table `email_templates`
--

CREATE TABLE `email_templates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `template_name` varchar(50) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_templates`
--

INSERT INTO `email_templates` (`id`, `template_name`, `subject`, `content`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'template 2024', 'about inventory', 'important', 1, '2025-04-11 13:22:54', '2025-04-23 03:43:21'),
(3, 'template 2025', 'about phones', 'important', 1, '2025-04-11 13:47:32', '2025-04-23 03:43:44'),
(7, 'template 2026', 'about iphones', 'mandatory', 1, '2025-04-23 03:44:40', '2025-04-23 03:44:40');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `expense_date` date NOT NULL,
  `description` text DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `reference_no` varchar(50) DEFAULT NULL,
  `recorded_by` bigint(20) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `category_id`, `amount`, `expense_date`, `description`, `payment_method`, `reference_no`, `recorded_by`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 5, 10000.00, '2025-04-16', 'electronic expense', 'credit card', '1', 13, 1, '2025-04-16 07:56:52', '2025-04-23 03:57:46'),
(3, 4, 56789.00, '2025-04-23', 'mandatory product', 'credit card', NULL, 13, 1, '2025-04-23 03:52:47', '2025-04-23 03:52:47');

-- --------------------------------------------------------

--
-- Table structure for table `expense_categories`
--

CREATE TABLE `expense_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expense_categories`
--

INSERT INTO `expense_categories` (`id`, `category_name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(4, 'expense 1', 'iphones', 1, '2025-04-11 17:22:48', '2025-04-23 03:49:53'),
(5, 'expense 2', 'samsung smart phones', 1, '2025-04-11 17:34:23', '2025-04-23 03:51:37'),
(8, 'expense 3', 'android phones', 1, '2025-04-23 03:51:21', '2025-04-23 03:51:21');

-- --------------------------------------------------------

--
-- Table structure for table `generated_reports`
--

CREATE TABLE `generated_reports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `template_id` bigint(20) UNSIGNED DEFAULT NULL,
  `report_name` varchar(100) NOT NULL,
  `generated_by` bigint(20) UNSIGNED NOT NULL,
  `generation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `parameters` text DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `generated_reports`
--

INSERT INTO `generated_reports` (`id`, `template_id`, `report_name`, `generated_by`, `generation_date`, `parameters`, `file_path`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Updated Report', 1, '2025-03-28 18:39:50', NULL, 'reports/56ODeRr2OjDXKBtJbxvi99Okti36H5UYZjA82REU.pdf', 1, '2025-03-28 13:39:50', '2025-04-15 07:31:55'),
(9, 1, 'testing', 2, '2025-04-15 12:27:20', NULL, 'reports/ipR3XMPDYhBZ2J2nNZU4mk0eGPXM9zB4ETzDwWep.pdf', 1, '2025-04-15 07:27:20', '2025-04-15 08:07:25');

-- --------------------------------------------------------

--
-- Table structure for table `grading`
--

CREATE TABLE `grading` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_condition` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`product_condition`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `grading`
--

INSERT INTO `grading` (`id`, `product_id`, `product_condition`, `created_at`, `updated_at`) VALUES
(2, 2, '\"{\\\"battery_health__80__or_above_\\\":\\\"passed\\\"}\"', '2025-05-26 11:32:45', '2025-05-26 12:24:17'),
(3, 15, '\"{\\\"remote_control_working\\\":\\\"passed\\\",\\\"all_ports_functional\\\":\\\"passed\\\",\\\"no_image_retention_burn_in\\\":\\\"passed\\\"}\"', '2025-05-26 11:35:58', '2025-05-26 11:35:58'),
(4, 11, '\"{\\\"screen_condition__no_cracks_scratches_\\\":\\\"passed\\\",\\\"camera_functionality\\\":\\\"passed\\\"}\"', '2025-05-26 13:07:33', '2025-05-26 13:07:43');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `variant_id` bigint(20) UNSIGNED NOT NULL,
  `imei` varchar(20) DEFAULT NULL,
  `serial_no` varchar(50) DEFAULT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `condition` enum('Brand New','14 Days','Grade A','Grade B','Grade C','Grade D','Grade E') NOT NULL,
  `purchase_price` decimal(10,2) NOT NULL,
  `selling_price` decimal(10,2) NOT NULL,
  `discount_type` enum('fixed','percentage') DEFAULT NULL,
  `discount_price` double(10,2) DEFAULT 0.00,
  `wholesale_price` decimal(10,2) DEFAULT NULL,
  `purchase_order_no` varchar(30) DEFAULT NULL,
  `supplier_id` bigint(20) UNSIGNED DEFAULT NULL,
  `stock_status` enum('In Stock','Sold','Returned','Defective') NOT NULL DEFAULT 'In Stock',
  `date_purchased` date DEFAULT NULL,
  `date_sold` date DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `variant_id`, `imei`, `serial_no`, `barcode`, `condition`, `purchase_price`, `selling_price`, `discount_type`, `discount_price`, `wholesale_price`, `purchase_order_no`, `supplier_id`, `stock_status`, `date_purchased`, `date_sold`, `notes`, `location`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, '123456789012345', 'SN12345678', 'BC987654321', 'Grade A', 750.99, 800.99, 'fixed', 60.00, 750.00, 'PO12345', 1, 'In Stock', '2024-03-28', NULL, 'Brand new iPhone 13 in box', 'Warehouse B', 1, '2025-03-27 15:37:52', '2025-03-28 18:25:30'),
(2, 2, '312456798154689', 'SNE6645HHS', 'QW478E', '14 Days', 49000.00, 55000.00, 'percentage', 14.00, 50000.00, '1', 2, 'In Stock', NULL, NULL, NULL, 'Warehouse A', 1, '2025-03-28 16:05:55', '2025-03-28 16:05:55'),
(10, 10, '122356778154689', 'SNI1245HHS', '961061', 'Grade A', 45000.00, 55000.00, 'percentage', 5.00, 50000.00, NULL, 1, 'In Stock', NULL, NULL, NULL, NULL, 1, '2025-05-17 09:06:54', '2025-05-17 09:06:54'),
(11, 11, '112356748154689', 'SNI1245INS', '462113', '14 Days', 28000.00, 40000.00, 'percentage', 4.00, 30000.00, NULL, 1, 'In Stock', NULL, NULL, NULL, NULL, 1, '2025-05-17 09:14:28', '2025-05-17 09:14:28'),
(12, 12, '912356748154688', 'SNI1245SAS', '534615', 'Grade B', 68000.00, 72000.00, 'fixed', 10.00, 70000.00, NULL, 1, 'In Stock', NULL, NULL, NULL, NULL, 1, '2025-05-17 09:19:14', '2025-05-17 09:19:14'),
(13, 13, NULL, 'SNI1245TCS', '933668', 'Grade A', 64000.00, 68000.00, 'percentage', 5.00, 65000.00, NULL, 2, 'In Stock', NULL, NULL, NULL, NULL, 1, '2025-05-17 09:21:50', '2025-05-17 09:21:50'),
(14, 14, NULL, 'SNI1245TLS', '388898', 'Grade A', 560000.00, 620000.00, 'percentage', 4.00, 60000.00, NULL, 2, 'In Stock', NULL, NULL, NULL, NULL, 1, '2025-05-17 09:24:39', '2025-05-17 09:24:39'),
(15, 15, '916356718154688', 'SNI1245ISM', '341429', '14 Days', 78000.00, 82000.00, 'percentage', 3.00, 80000.00, NULL, 1, 'In Stock', NULL, NULL, NULL, NULL, 1, '2025-05-22 07:00:52', '2025-05-22 07:00:52'),
(16, 16, '512326748154680', 'SNI1245XMX', '355347', 'Grade B', 68000.00, 74000.00, 'percentage', 4.00, 70000.00, NULL, 1, 'In Stock', NULL, NULL, NULL, NULL, 1, '2025-05-22 07:15:27', '2025-05-22 07:15:27');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_history`
--

CREATE TABLE `inventory_history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED NOT NULL,
  `field_changed` varchar(50) NOT NULL,
  `old_value` text DEFAULT NULL,
  `new_value` text DEFAULT NULL,
  `changed_by` bigint(20) UNSIGNED NOT NULL,
  `change_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_history`
--

INSERT INTO `inventory_history` (`id`, `inventory_id`, `field_changed`, `old_value`, `new_value`, `changed_by`, `change_date`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'stock', '50', '40', 1, '2025-03-27 21:22:32', 1, '2025-03-27 16:22:32', '2025-03-27 16:24:16');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(30) NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_date` date NOT NULL,
  `due_date` date NOT NULL,
  `status` enum('Draft','Sent','Paid','Overdue','Cancelled') NOT NULL DEFAULT 'Draft',
  `template_used` varchar(50) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_number`, `order_id`, `customer_id`, `invoice_date`, `due_date`, `status`, `template_used`, `notes`, `created_by`, `is_active`, `created_at`, `updated_at`) VALUES
(6, 'INV-2025392', 18, 1, '2025-04-05', '2025-04-10', 'Paid', 'Standard', 'This is a test invoice', 1, 1, '2025-04-05 11:01:02', '2025-04-05 11:01:02'),
(32, 'INV-724928', 56, 3, '2025-04-29', '2025-05-04', 'Draft', NULL, NULL, 13, 1, '2025-04-29 12:55:25', '2025-04-29 12:55:25'),
(33, 'INV-891862', 57, 3, '2025-04-29', '2025-05-04', 'Draft', NULL, NULL, 13, 1, '2025-04-29 12:56:33', '2025-04-29 12:56:33');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `tax_rate` decimal(5,2) NOT NULL DEFAULT 0.00,
  `total_price` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_items`
--

INSERT INTO `invoice_items` (`id`, `invoice_id`, `inventory_id`, `description`, `quantity`, `unit_price`, `tax_rate`, `total_price`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 'Product A', 5, 150.00, 5.00, 750.00, 1, '2025-03-27 17:37:41', '2025-03-27 17:38:14');

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `marketplace_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `listing_reference` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `marketplace_id`, `product_id`, `listing_reference`, `notes`, `is_active`, `created_at`, `updated_at`) VALUES
(15, 1, 2, NULL, NULL, 0, '2025-04-19 04:41:46', '2025-04-23 04:54:49'),
(16, 8, 2, NULL, NULL, 1, '2025-04-19 04:41:46', '2025-04-19 07:13:14'),
(20, 3, 3, NULL, NULL, 1, '2025-04-23 04:54:00', '2025-04-23 04:54:43');

-- --------------------------------------------------------

--
-- Table structure for table `listing_history`
--

CREATE TABLE `listing_history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `listing_id` bigint(20) UNSIGNED NOT NULL,
  `action` varchar(50) NOT NULL,
  `details` text DEFAULT NULL,
  `changed_by` bigint(20) UNSIGNED NOT NULL,
  `change_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `marketplaces`
--

CREATE TABLE `marketplaces` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `api_credentials` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `marketplaces`
--

INSERT INTO `marketplaces` (`id`, `name`, `description`, `api_credentials`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'eBay', 'api', NULL, 1, NULL, '2025-04-14 08:23:37'),
(3, 'offline', 'api', NULL, 1, '2025-04-14 08:10:38', '2025-04-19 04:15:02'),
(6, 'amazon', NULL, NULL, 1, '2025-04-19 04:15:24', '2025-04-19 04:15:24'),
(7, 'website', NULL, NULL, 1, '2025-04-19 04:15:52', '2025-04-19 04:15:52'),
(8, 'onBuy', NULL, NULL, 1, '2025-04-19 04:16:11', '2025-04-19 04:16:11'),
(9, 'backmarket', NULL, NULL, 1, '2025-04-19 04:16:28', '2025-04-19 04:16:28'),
(10, 'etsy', NULL, NULL, 1, '2025-04-19 04:16:46', '2025-04-19 04:16:46'),
(11, 'tikTok Shop', NULL, NULL, 1, '2025-04-19 04:17:04', '2025-04-19 04:17:04');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2023_01_01_000000_create_users_table', 1),
(3, '2023_01_01_000001_create_permissions_table', 1),
(4, '2023_01_01_000002_create_user_permissions_table', 1),
(5, '2023_01_01_000003_create_brands_table', 1),
(6, '2023_01_01_000004_create_products_table', 1),
(7, '2023_01_01_000005_create_product_variants_table', 1),
(8, '2023_01_01_000006_create_suppliers_table', 1),
(9, '2023_01_01_000007_create_inventory_table', 1),
(10, '2023_01_01_000008_create_inventory_history_table', 1),
(11, '2023_01_01_000009_create_purchase_orders_table', 1),
(12, '2023_01_01_000010_create_purchase_order_items_table', 1),
(13, '2023_01_01_000011_create_customers_table', 1),
(14, '2023_01_01_000012_create_orders_table', 1),
(15, '2023_01_01_000013_create_order_items_table', 1),
(16, '2023_01_01_000014_create_invoices_table', 1),
(17, '2023_01_01_000015_create_invoice_items_table', 1),
(18, '2023_01_01_000016_create_rmas_table', 1),
(19, '2023_01_01_000017_create_rma_items_table', 1),
(20, '2023_01_01_000018_create_credit_notes_table', 1),
(21, '2023_01_01_000019_create_credit_note_items_table', 1),
(22, '2023_01_01_000020_create_marketplaces_table', 1),
(23, '2023_01_01_000021_create_listings_table', 1),
(24, '2023_01_01_000022_create_listing_history_table', 1),
(25, '2023_01_01_000023_create_expense_categories_table', 1),
(26, '2023_01_01_000024_create_expenses_table', 1),
(27, '2023_01_01_000025_create_report_templates_table', 1),
(28, '2023_01_01_000026_create_generated_reports_table', 1),
(29, '2023_01_01_000027_create_subscribers_table', 1),
(30, '2023_01_01_000028_create_email_templates_table', 1),
(31, '2023_01_01_000029_create_email_campaigns_table', 1),
(32, '2023_01_01_000030_create_campaign_recipients_table', 1),
(33, '2023_01_01_000031_create_delivery_notes_table', 1),
(34, '2023_01_01_000032_create_delivery_note_items_table', 1),
(35, '2025_04_21_143751_create_newsletters_table', 2),
(36, '2025_04_22_075954_create_vouchers_table', 3),
(37, '2025_04_22_081352_create_vouchers_table', 4),
(38, '2025_04_22_113811_add_voucher_id_to_orders_table', 5),
(39, '2025_04_25_081533_create_newsletter_promotional_table', 6),
(40, '2025_04_28_105652_create_product_categories_table', 7),
(41, '2025_05_02_110852_create_blogs_table', 8),
(42, '2025_05_23_172454_create_grading_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `newsletters`
--

CREATE TABLE `newsletters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `newsletters`
--

INSERT INTO `newsletters` (`id`, `email`, `name`, `subscribed_at`, `created_at`, `updated_at`) VALUES
(3, 'wajidahmed907@gmail.com', 'wajid', '2025-04-21 10:01:18', '2025-04-21 10:01:18', '2025-04-21 10:01:18'),
(4, 'mariumazhar425@gmail.com', 'marium', '2025-04-23 04:58:21', '2025-04-23 04:58:21', '2025-04-23 04:58:21'),
(5, 'wajid.g20504@iqra.edu.pk', 'wajid', '2025-05-05 14:52:56', '2025-05-05 14:52:56', '2025-05-05 14:52:56');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_promotional`
--

CREATE TABLE `newsletter_promotional` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subject_line` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `recipients` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`recipients`)),
  `schedule_date` timestamp NULL DEFAULT NULL,
  `sending_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `newsletter_promotional`
--

INSERT INTO `newsletter_promotional` (`id`, `subject_line`, `content`, `recipients`, `schedule_date`, `sending_date`, `created_at`, `updated_at`) VALUES
(5, 'summer sale', 'check out our amazing summer deals', '\"[\\\"mariumazhar425@gmail.com\\\"]\"', NULL, '2025-04-25 04:49:21', '2025-04-25 04:49:16', '2025-04-25 04:49:22'),
(6, 'winter sale', 'winter sale upto 40% off.', '\"[\\\"mariumazhar425@gmail.com\\\"]\"', NULL, '2025-04-25 04:53:29', '2025-04-25 04:53:25', '2025-04-25 04:53:30'),
(7, 'testing', 'testing', '\"[\\\"mariumazhar425@gmail.com\\\"]\"', '2025-04-25 11:10:00', '2025-04-25 06:11:09', '2025-04-25 06:11:03', '2025-04-25 06:11:10'),
(8, 'autumn sale', 'get ready for exciting products', '\"[\\\"mariumazhar425@gmail.com\\\"]\"', '2025-04-26 03:51:00', '2025-04-25 09:50:57', '2025-04-25 09:50:51', '2025-04-25 09:50:58');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(30) NOT NULL,
  `customer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `voucher_id` bigint(20) UNSIGNED DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Pending','Processing','Shipped','Delivered','Cancelled','Returned') NOT NULL DEFAULT 'Pending',
  `total_amount` decimal(10,2) NOT NULL,
  `discount_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `tax_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `shipping_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `grand_total` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` enum('Unpaid','Partial','Paid') NOT NULL DEFAULT 'Unpaid',
  `shipping_address` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `voucher_id`, `order_date`, `status`, `total_amount`, `discount_amount`, `tax_amount`, `shipping_amount`, `grand_total`, `payment_method`, `payment_status`, `shipping_address`, `notes`, `created_by`, `is_active`, `created_at`, `updated_at`) VALUES
(18, 'ORD-1743868857502', 1, NULL, '2025-04-04 19:00:00', 'Pending', 56467.98, 134.00, 100.00, 100.00, 56667.98, 'Credit Card', 'Unpaid', 'Alex Street', 'Important', 1, 1, '2025-04-05 11:00:58', '2025-04-05 11:00:58'),
(56, 'ORD-511578', 3, NULL, '2025-04-28 19:00:00', 'Pending', 47300.00, 0.00, 100.00, 100.00, 47500.00, 'credit card', 'Unpaid', NULL, NULL, 13, 1, '2025-04-29 12:55:24', '2025-04-29 12:55:24'),
(57, 'ORD-294868', 3, 3, '2025-04-28 19:00:00', 'Pending', 47300.00, 5676.00, 100.00, 100.00, 41824.00, 'credit card', 'Unpaid', NULL, NULL, 13, 1, '2025-04-29 12:56:32', '2025-04-29 12:56:32');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL,
  `discount_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_price` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `inventory_id`, `quantity`, `unit_price`, `discount_amount`, `total_price`, `is_active`, `created_at`, `updated_at`) VALUES
(21, 18, 1, 2, 800.99, 120.00, 680.99, 1, '2025-04-05 11:00:59', '2025-04-05 11:00:59'),
(22, 18, 2, 1, 55000.00, 14.00, 54986.00, 1, '2025-04-05 11:01:01', '2025-04-05 11:01:01'),
(55, 56, 2, 1, 47300.00, 0.00, 47300.00, 1, '2025-04-29 12:55:24', '2025-04-29 12:55:24'),
(56, 57, 2, 1, 41624.00, 5676.00, 41624.00, 1, '2025-04-29 12:56:33', '2025-04-29 12:56:33');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `module_name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `module_name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Supplier Management', 'Supplier Permissions', 1, '2025-03-27 13:44:16', '2025-03-27 13:45:09');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED NOT NULL,
  `model_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `category` bigint(20) DEFAULT NULL,
  `quantity` int(255) DEFAULT 1,
  `feature_imageUrl` varchar(255) DEFAULT NULL,
  `all_imageUrls` longtext DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `brand_id`, `model_name`, `description`, `sku`, `category`, `quantity`, `feature_imageUrl`, `all_imageUrls`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 2, 'iPhone 13 pro', 'New Apple iPhone', 'JKGHIY12353456', 6, 2, 'images/products/RHHTYUB5vk8bAYSmDFV2AnfxauPu3um8TefUtBmz.jpg', '[\"images\\/products\\/XCef5W7qnJdScHTypxYW90MR30k7iUfLGbiInwI0.jpg\",\"images\\/products\\/8JoIFkJecVoAq9HSdV1UbHCmS5tvHQYeDKEhiQw1.jpg\"]', 1, '2025-03-27 15:37:52', '2025-03-29 22:06:47'),
(3, 3, '11 pro', 'New Launched Device', 'QE468GR4561321', 6, 9, 'images/products/EnFerujVpkzc8qLpLwfrFCX183ToDtJxKqycAKZV.jpg', '[\"images\\/products\\/dpMByQKOKD958Kx5X352dPktfWPPP2pCdS33imvp.jpg\"]', 1, '2025-03-28 16:05:54', '2025-03-29 21:58:12'),
(11, 2, 'iphone 12 pro', 'Iphone 12 pro in silver color.', 'IP468ON4561321', 6, 1, 'images/products/6jjGKCxRmaMCPACdkG46gwZAFvQcvFInIfSmNGHQ.jpg', '[\"images\\/products\\/QhSJg6Jl50Se08TL4DTPIf6vpeRrB73dPUg4JlLb.jpg\"]', 1, '2025-05-17 09:06:54', '2025-05-17 09:24:50'),
(12, 5, 'infinix 40 pro', 'infinix 40 pro in gray color', 'IN468ON4561321', 6, 1, 'images/products/lhs8AbnHjB0wGswVkWxt2fHYiJS3oU4VOSmXfwkf.jpg', '[\"images\\/products\\/fQpqWmxVze8bmwAsRNwssLFs49s0eFNh0TFMphki.jpg\"]', 1, '2025-05-17 09:14:28', '2025-05-17 09:24:53'),
(13, 1, 'a06', 'samsung a06 in black color', 'SA468ON4561321', 6, 1, 'images/products/pQimIXOc6PPFe9GRLLKjeFHHZkOQjRzk02qy6f2D.jpg', '[\"images\\/products\\/3zEi7qd5oFeF4vIbAOIncFKKgDCCkkeVM3QkkJI4.jpg\"]', 1, '2025-05-17 09:19:14', '2025-05-17 09:24:54'),
(14, 9, 'tch pro', 'lcd in black color', 'TC468ON4561321', 1, 1, 'images/products/u4ewwsGuPrnJDc407NiBOssaT05pTvNgu3K28G8q.jpg', '[\"images\\/products\\/4fbAJcRFst7RAtffExa43slmf9DROKjSv56csUWi.jpg\"]', 1, '2025-05-17 09:21:49', '2025-05-17 09:24:56'),
(15, 9, 'tch pro max', 'lcd in black color', 'TL468ON4561321', 1, 1, 'images/products/tsJ47KLNwi03QakPQyDa8I3XNhkS1Bxi7weVxLpY.jpg', '[\"images\\/products\\/Vre1qSRnb1N1wDvgJSnETizRw0mjsjnnU4ffB3os.jpg\"]', 1, '2025-05-17 09:24:39', '2025-05-17 09:24:57'),
(16, 1, 'a15', 'samsung a15 in pastel blue color', 'SM468OM4561321', 6, 1, 'images/products/pgUaFpj6aMRJNzEvpYr3pJEQaxnxdUsWLpLxWQrU.jpg', '[\"images\\/products\\/BHJV0ApmXIZ73I1pRPRlCLa4qY6OMqJfOzSgs3I8.jpg\"]', 0, '2025-05-22 07:00:50', '2025-05-22 07:00:51'),
(17, 2, 'iphone xs max', 'iphone xs max in rose gold color', 'XM468MA456132X', 6, 2, 'images/products/lqAcSmRu1IWcMqxGPGpvEor6AqnkMcvgdbK9eRAj.jpg', '[\"images\\/products\\/EBoSa31nx3D91bqsc9LjxVsEtRN1wsdROCvF66SY.jpg\"]', 0, '2025-05-22 07:15:26', '2025-05-22 07:15:26');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'tvs', 13, '2025-04-28 06:05:39', '2025-04-28 06:06:32'),
(2, 'desktops', 13, '2025-04-28 06:07:14', '2025-04-28 06:07:14'),
(3, 'accessories', 13, '2025-04-28 06:37:59', '2025-04-28 06:37:59'),
(4, 'printers', 13, '2025-04-28 11:01:57', '2025-04-28 11:01:57'),
(5, 'cameras', 13, '2025-04-28 11:02:10', '2025-04-28 11:02:10'),
(6, 'phones', 13, '2025-04-28 11:02:22', '2025-04-28 11:02:22'),
(7, 'laptops', 13, '2025-04-28 11:02:38', '2025-04-28 11:02:38'),
(8, 'consoles', 13, '2025-04-28 11:02:54', '2025-04-28 11:02:54');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `storage_gb` int(11) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `network_type` varchar(30) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `storage_gb`, `color`, `network_type`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 2, 128, 'Blue', '5G', 1, '2025-03-27 15:37:52', '2025-03-27 15:37:52'),
(2, 3, 256, 'red', '5G', 1, '2025-03-28 16:05:55', '2025-03-28 16:05:55'),
(10, 11, 256, 'silver', '5G', 1, '2025-05-17 09:06:54', '2025-05-17 09:06:54'),
(11, 12, 256, 'gray', '5G', 1, '2025-05-17 09:14:28', '2025-05-17 09:14:28'),
(12, 13, 256, 'black', '5G', 1, '2025-05-17 09:19:14', '2025-05-17 09:19:14'),
(13, 14, 256, 'black', NULL, 1, '2025-05-17 09:21:50', '2025-05-17 09:21:50'),
(14, 15, 256, 'black', NULL, 1, '2025-05-17 09:24:39', '2025-05-17 09:24:39'),
(15, 16, 256, 'pastel blue', '5G', 1, '2025-05-22 07:00:52', '2025-05-22 07:00:52'),
(16, 17, 256, 'rose gold', '5G', 1, '2025-05-22 07:15:27', '2025-05-22 07:15:27');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `supplier_id` bigint(20) UNSIGNED NOT NULL,
  `po_number` varchar(30) NOT NULL,
  `order_date` date NOT NULL,
  `expected_delivery_date` date DEFAULT NULL,
  `status` enum('Draft','Sent','Received','Cancelled') NOT NULL DEFAULT 'Draft',
  `total_amount` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchase_orders`
--

INSERT INTO `purchase_orders` (`id`, `supplier_id`, `po_number`, `order_date`, `expected_delivery_date`, `status`, `total_amount`, `notes`, `created_by`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'PO-12345', '2025-03-28', '2025-04-05', 'Sent', 5000.00, 'Urgent order', 1, 1, '2025-03-27 16:36:26', '2025-03-27 16:39:01'),
(11, 2, 'PO-35356', '2025-04-11', '2025-04-16', 'Draft', 51000.00, 'Urgent delivery required.', 2, 1, '2025-04-11 10:17:21', '2025-04-11 10:17:21'),
(12, 2, 'PO-54613', '2025-04-11', '2025-04-16', 'Draft', 103100.00, 'Urgent delivery required.', 2, 1, '2025-04-11 10:19:31', '2025-04-11 10:19:31');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order_items`
--

CREATE TABLE `purchase_order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `po_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `variant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `received_quantity` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchase_order_items`
--

INSERT INTO `purchase_order_items` (`id`, `po_id`, `product_id`, `variant_id`, `quantity`, `unit_price`, `total_price`, `received_quantity`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, 25, 50.00, 755.00, 0, 1, '2025-03-27 16:53:32', '2025-03-27 16:57:18'),
(2, 11, 3, 2, 1, 51000.00, 51000.00, 0, 1, '2025-04-11 10:17:22', '2025-04-11 10:17:22'),
(3, 12, 3, 2, 2, 51000.00, 102000.00, 0, 1, '2025-04-11 10:19:32', '2025-04-11 10:19:32'),
(4, 12, 6, 5, 1, 1100.00, 1100.00, 0, 1, '2025-04-11 10:19:33', '2025-04-11 10:19:33');

-- --------------------------------------------------------

--
-- Table structure for table `report_templates`
--

CREATE TABLE `report_templates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `template_name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `template_file_path` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `report_templates`
--

INSERT INTO `report_templates` (`id`, `template_name`, `description`, `template_file_path`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Annual Report', 'This is an annual financial report', 'templates/ErAZB8Dn7DjdxKg3bHhkfwTJMGIXMlLIQmeormF1.pdf', 1, '2025-03-28 13:26:01', '2025-04-15 05:56:48'),
(2, 'Report 2025', 'phone report', 'templates/fNuPwNqUydH2JFcMW9SxopE8VVHSgaOpd1EuEhkm.pdf', 1, '2025-04-15 05:15:35', '2025-04-15 06:03:38');

-- --------------------------------------------------------

--
-- Table structure for table `rmas`
--

CREATE TABLE `rmas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rma_number` varchar(30) NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `request_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Requested','Approved','Rejected','Processed') NOT NULL DEFAULT 'Requested',
  `reason` text NOT NULL,
  `resolution` text DEFAULT NULL,
  `resolved_by` bigint(20) UNSIGNED DEFAULT NULL,
  `resolved_date` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rmas`
--

INSERT INTO `rmas` (`id`, `rma_number`, `customer_id`, `order_id`, `request_date`, `status`, `reason`, `resolution`, `resolved_by`, `resolved_date`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'RMA123', 1, 18, '2025-03-27 22:48:46', 'Approved', 'Defective product', 'Refund issue', 1, '2024-03-28 07:00:00', 1, '2025-03-27 17:48:46', '2025-04-16 05:44:59'),
(8, 'RMA-20250418-058', 1, 18, '2025-04-17 19:00:00', 'Requested', 'The user has not provided any comments', NULL, 13, '2025-04-17 19:00:00', 0, '2025-04-18 05:44:26', '2025-04-18 05:44:26'),
(19, 'RMA-20250430-595', 1, 18, '2025-04-29 19:00:00', 'Requested', 'crack on a screen', NULL, 13, '2025-04-29 19:00:00', 0, '2025-04-30 11:21:37', '2025-04-30 11:21:37'),
(21, 'RMA-20250522-165', 1, 18, '2025-05-22 10:51:45', 'Requested', 'cover is broken', NULL, 13, '2025-05-22 10:51:45', 0, '2025-05-22 10:51:49', '2025-05-22 10:51:49');

-- --------------------------------------------------------

--
-- Table structure for table `rma_items`
--

CREATE TABLE `rma_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rma_id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `reason` text DEFAULT NULL,
  `condition_received` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rma_items`
--

INSERT INTO `rma_items` (`id`, `rma_id`, `inventory_id`, `quantity`, `reason`, `condition_received`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2, 'Defective item', 'Scratched surface', 1, '2025-03-27 17:58:00', '2025-04-18 07:47:39'),
(10, 8, 1, 2, 'bad quality', NULL, 1, '2025-04-18 05:44:28', '2025-04-30 11:21:59'),
(11, 8, 2, 1, 'color is not good', NULL, 0, '2025-04-18 05:44:29', '2025-04-18 07:44:47'),
(23, 19, 2, 1, 'crack on screen', NULL, 0, '2025-04-30 11:21:38', '2025-04-30 11:21:38'),
(25, 21, 1, 2, 'broken cover', NULL, 0, '2025-05-22 10:51:50', '2025-05-22 10:51:50');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `subscription_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `unsubscribe_token` varchar(100) DEFAULT NULL,
  `last_contacted` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`, `first_name`, `last_name`, `subscription_date`, `is_active`, `unsubscribe_token`, `last_contacted`, `created_at`, `updated_at`) VALUES
(1, 'hafsanaseem@gmail.com', 'hafsa', 'naseem', '2025-04-09 19:11:34', 1, 'oT5NlWH0oDk7VvoH7ott5xDS7D5mcyexBko1QFmmczkCcQauH55S0es6dDnJ', NULL, '2025-04-09 14:11:34', '2025-04-23 03:30:32'),
(5, 'areesha345@gmail.com', 'areesha', 'tauseef', '2025-04-09 20:40:28', 1, 'k3jhaf7MegzHvJ0kxNNPGSTaEKS5WeR3YRdXY8GCYmywRLElObcoNGpyatZl', NULL, '2025-04-09 15:40:28', '2025-04-23 03:31:00'),
(7, 'maham_12@gmail.com', 'maham', 'ali', '2025-04-09 21:18:28', 1, 'hnTrzZSHfaECXMx8B0cpdD9URumLPa5sf8RJq6YIUFqPoCB2yGDFBUMBA7EQ', NULL, '2025-04-09 16:18:28', '2025-04-23 03:31:33');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `tax_id` varchar(50) DEFAULT NULL,
  `payment_terms` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `user_id`, `contact_person`, `address`, `tax_id`, `payment_terms`, `notes`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 7, 'haris', 'alex street', NULL, NULL, NULL, 1, NULL, NULL),
(2, 19, 'shayan', 'bellasis street', '2', 'testing', 'testing', 1, '2025-04-10 11:44:41', '2025-04-23 08:52:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `role` enum('admin','manager','staff','wholesale','customer','supplier') NOT NULL DEFAULT 'customer',
  `profile_picture` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `last_name`, `phone_number`, `role`, `profile_picture`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'john', 'john@example.com', '$2y$10$NJLrv0vLZ.SqpeQHumzyku2kDYIqqQJ6kJDiQuprQcBQbnKaJ4lBy', 'john doe', '+9231578913', 'customer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyvUgotEAGPAXLmdckT-uz9l3hPXpt9B0tUQ&s', 1, NULL, '2025-03-27 13:27:14', '2025-04-16 07:20:35'),
(2, 'rizwan', 'rizwan123@gmail.com', 'rizwan', 'khan', '0333367865', 'customer', NULL, 1, NULL, NULL, NULL),
(7, 'marium', 'marium425@gmail.com', '$2y$10$aKYCEn1xfaYmhzDumBTbCOCs3mDh5YBhX9P/z3r2W0yUtvwrPLH1K', NULL, NULL, 'supplier', NULL, 1, NULL, '2025-04-08 14:22:53', '2025-04-08 14:22:53'),
(12, 'bilal', 'bilalhashmi@gmail.com', '$2y$10$uzwwNu6WJiDntNu6g/mKVe7EUbS5kTAPo95FcT/7Rjk7etEI6S2JG', 'hashmi', 'null', 'customer', NULL, 1, NULL, '2025-04-09 12:15:56', '2025-04-23 03:28:56'),
(13, 'wajid', 'wajidahmed123@gmail.com', '$2y$10$RkbqNSHbHsqslEULuW0bRutuRJM8QBmNeGTsGXZDpLOZgI54qz.fm', NULL, NULL, 'admin', NULL, 1, NULL, '2025-04-09 12:16:01', '2025-04-09 12:16:01'),
(19, 'ayesha', 'ayesha123@gmail.com', '$2y$10$pDcP3KOKCs6W00BeCfRv8erMtWNdQfvHCSDSfN3RpgR18q3SEWHCa', NULL, NULL, 'supplier', NULL, 1, NULL, '2025-04-11 06:27:31', '2025-04-11 06:27:31'),
(20, 'ayesha', 'ayesha3@gmail.com', '$2y$10$sHNu7B4ib2xLmCVmeKCEGuzvUcD1IRZRccHu4/6Mqv5FH6z4KqwA.', NULL, '+92315789135', 'customer', 'storage/users/6sQeiyQcDGNZRcFIdgi3gr9eC4nTkZB3LBm0JFr2.png', 1, NULL, '2025-04-16 07:23:52', '2025-04-16 07:23:52');

-- --------------------------------------------------------

--
-- Table structure for table `user_permissions`
--

CREATE TABLE `user_permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_permissions`
--

INSERT INTO `user_permissions` (`id`, `user_id`, `permission_id`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2025-03-27 13:59:49', '2025-03-27 14:03:42');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `voucher_code` varchar(255) NOT NULL,
  `voucher_secret_id` bigint(20) NOT NULL,
  `discount_type` enum('fixed','percentage') NOT NULL,
  `voucher_discount` varchar(255) NOT NULL,
  `voucher_creator` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `voucher_code`, `voucher_secret_id`, `discount_type`, `voucher_discount`, `voucher_creator`, `created_at`, `updated_at`) VALUES
(3, 'SAM-123', 1045, 'percentage', '12', 13, '2025-04-22 03:59:36', '2025-04-22 03:59:36'),
(4, 'OPPO-424', 2644, 'fixed', '250', 13, '2025-04-22 04:00:11', '2025-04-22 04:00:11'),
(5, 'RED-987', 8511, 'fixed', '321', 13, '2025-04-23 04:55:59', '2025-04-23 04:55:59'),
(6, 'BMW-242', 22425, 'percentage', '12', 13, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_brand_name_unique` (`brand_name`);

--
-- Indexes for table `campaign_recipients`
--
ALTER TABLE `campaign_recipients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaign_recipients_campaign_id_foreign` (`campaign_id`),
  ADD KEY `campaign_recipients_subscriber_id_foreign` (`subscriber_id`);

--
-- Indexes for table `credit_notes`
--
ALTER TABLE `credit_notes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `credit_notes_credit_note_number_unique` (`credit_note_number`),
  ADD KEY `credit_notes_rma_id_foreign` (`rma_id`),
  ADD KEY `credit_notes_customer_id_foreign` (`customer_id`),
  ADD KEY `credit_notes_created_by_foreign` (`created_by`);

--
-- Indexes for table `credit_note_items`
--
ALTER TABLE `credit_note_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `credit_note_items_credit_note_id_foreign` (`credit_note_id`),
  ADD KEY `credit_note_items_inventory_id_foreign` (`inventory_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customers_user_id_foreign` (`user_id`);

--
-- Indexes for table `delivery_notes`
--
ALTER TABLE `delivery_notes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `delivery_notes_delivery_number_unique` (`delivery_number`),
  ADD KEY `delivery_notes_order_id_foreign` (`order_id`),
  ADD KEY `delivery_notes_customer_id_foreign` (`customer_id`),
  ADD KEY `delivery_notes_created_by_foreign` (`created_by`);

--
-- Indexes for table `delivery_note_items`
--
ALTER TABLE `delivery_note_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `delivery_note_items_delivery_note_id_foreign` (`delivery_note_id`),
  ADD KEY `delivery_note_items_inventory_id_foreign` (`inventory_id`);

--
-- Indexes for table `email_campaigns`
--
ALTER TABLE `email_campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email_campaigns_template_id_foreign` (`template_id`),
  ADD KEY `email_campaigns_created_by_foreign` (`created_by`);

--
-- Indexes for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_templates_template_name_unique` (`template_name`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_category_id_foreign` (`category_id`),
  ADD KEY `expenses_recorded_by_foreign` (`recorded_by`);

--
-- Indexes for table `expense_categories`
--
ALTER TABLE `expense_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `expense_categories_category_name_unique` (`category_name`);

--
-- Indexes for table `generated_reports`
--
ALTER TABLE `generated_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `generated_reports_template_id_foreign` (`template_id`),
  ADD KEY `generated_reports_generated_by_foreign` (`generated_by`);

--
-- Indexes for table `grading`
--
ALTER TABLE `grading`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grading_product_id_foreign` (`product_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inventory_imei_unique` (`imei`),
  ADD UNIQUE KEY `inventory_serial_no_unique` (`serial_no`),
  ADD UNIQUE KEY `inventory_barcode_unique` (`barcode`),
  ADD KEY `inventory_supplier_id_foreign` (`supplier_id`),
  ADD KEY `inventory_variant_id_foreign` (`variant_id`);

--
-- Indexes for table `inventory_history`
--
ALTER TABLE `inventory_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_history_inventory_id_foreign` (`inventory_id`),
  ADD KEY `inventory_history_changed_by_foreign` (`changed_by`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_invoice_number_unique` (`invoice_number`),
  ADD KEY `invoices_order_id_foreign` (`order_id`),
  ADD KEY `invoices_customer_id_foreign` (`customer_id`),
  ADD KEY `invoices_created_by_foreign` (`created_by`);

--
-- Indexes for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_items_invoice_id_foreign` (`invoice_id`),
  ADD KEY `invoice_items_inventory_id_foreign` (`inventory_id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listings_marketplace_id_foreign` (`marketplace_id`),
  ADD KEY `listings_product_id_foreign` (`product_id`);

--
-- Indexes for table `listing_history`
--
ALTER TABLE `listing_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listing_history_listing_id_foreign` (`listing_id`),
  ADD KEY `listing_history_changed_by_foreign` (`changed_by`);

--
-- Indexes for table `marketplaces`
--
ALTER TABLE `marketplaces`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `marketplaces_name_unique` (`name`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `newsletters_email_unique` (`email`);

--
-- Indexes for table `newsletter_promotional`
--
ALTER TABLE `newsletter_promotional`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`),
  ADD KEY `orders_created_by_foreign` (`created_by`),
  ADD KEY `orders_voucher_id_foreign` (`voucher_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_inventory_id_foreign` (`inventory_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_brand_id_model_name_unique` (`brand_id`,`model_name`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_categories_created_by_foreign` (`created_by`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `purchase_orders_po_number_unique` (`po_number`),
  ADD KEY `purchase_orders_supplier_id_foreign` (`supplier_id`),
  ADD KEY `purchase_orders_created_by_foreign` (`created_by`);

--
-- Indexes for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_order_items_po_id_foreign` (`po_id`),
  ADD KEY `purchase_order_items_product_id_foreign` (`product_id`),
  ADD KEY `purchase_order_items_variant_id_foreign` (`variant_id`);

--
-- Indexes for table `report_templates`
--
ALTER TABLE `report_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `report_templates_template_name_unique` (`template_name`);

--
-- Indexes for table `rmas`
--
ALTER TABLE `rmas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rmas_rma_number_unique` (`rma_number`),
  ADD KEY `rmas_customer_id_foreign` (`customer_id`),
  ADD KEY `rmas_order_id_foreign` (`order_id`),
  ADD KEY `rmas_resolved_by_foreign` (`resolved_by`);

--
-- Indexes for table `rma_items`
--
ALTER TABLE `rma_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rma_items_rma_id_foreign` (`rma_id`),
  ADD KEY `rma_items_inventory_id_foreign` (`inventory_id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscribers_email_unique` (`email`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suppliers_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_permissions_user_id_permission_id_unique` (`user_id`,`permission_id`),
  ADD KEY `user_permissions_permission_id_foreign` (`permission_id`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vouchers_voucher_secret_id_unique` (`voucher_secret_id`),
  ADD KEY `vouchers_voucher_creator_foreign` (`voucher_creator`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `campaign_recipients`
--
ALTER TABLE `campaign_recipients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `credit_notes`
--
ALTER TABLE `credit_notes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `credit_note_items`
--
ALTER TABLE `credit_note_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `delivery_notes`
--
ALTER TABLE `delivery_notes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `delivery_note_items`
--
ALTER TABLE `delivery_note_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `email_campaigns`
--
ALTER TABLE `email_campaigns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `email_templates`
--
ALTER TABLE `email_templates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `expense_categories`
--
ALTER TABLE `expense_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `generated_reports`
--
ALTER TABLE `generated_reports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `grading`
--
ALTER TABLE `grading`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `inventory_history`
--
ALTER TABLE `inventory_history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `listing_history`
--
ALTER TABLE `listing_history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `marketplaces`
--
ALTER TABLE `marketplaces`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `newsletters`
--
ALTER TABLE `newsletters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `newsletter_promotional`
--
ALTER TABLE `newsletter_promotional`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `report_templates`
--
ALTER TABLE `report_templates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rmas`
--
ALTER TABLE `rmas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `rma_items`
--
ALTER TABLE `rma_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user_permissions`
--
ALTER TABLE `user_permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `campaign_recipients`
--
ALTER TABLE `campaign_recipients`
  ADD CONSTRAINT `campaign_recipients_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `email_campaigns` (`id`),
  ADD CONSTRAINT `campaign_recipients_subscriber_id_foreign` FOREIGN KEY (`subscriber_id`) REFERENCES `subscribers` (`id`);

--
-- Constraints for table `credit_notes`
--
ALTER TABLE `credit_notes`
  ADD CONSTRAINT `credit_notes_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `credit_notes_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `credit_notes_rma_id_foreign` FOREIGN KEY (`rma_id`) REFERENCES `rmas` (`id`);

--
-- Constraints for table `credit_note_items`
--
ALTER TABLE `credit_note_items`
  ADD CONSTRAINT `credit_note_items_credit_note_id_foreign` FOREIGN KEY (`credit_note_id`) REFERENCES `credit_notes` (`id`),
  ADD CONSTRAINT `credit_note_items_inventory_id_foreign` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`);

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `delivery_notes`
--
ALTER TABLE `delivery_notes`
  ADD CONSTRAINT `delivery_notes_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `delivery_notes_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `delivery_notes_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `delivery_note_items`
--
ALTER TABLE `delivery_note_items`
  ADD CONSTRAINT `delivery_note_items_delivery_note_id_foreign` FOREIGN KEY (`delivery_note_id`) REFERENCES `delivery_notes` (`id`),
  ADD CONSTRAINT `delivery_note_items_inventory_id_foreign` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`);

--
-- Constraints for table `email_campaigns`
--
ALTER TABLE `email_campaigns`
  ADD CONSTRAINT `email_campaigns_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `email_campaigns_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `email_templates` (`id`);

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `expense_categories` (`id`),
  ADD CONSTRAINT `expenses_recorded_by_foreign` FOREIGN KEY (`recorded_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `generated_reports`
--
ALTER TABLE `generated_reports`
  ADD CONSTRAINT `generated_reports_generated_by_foreign` FOREIGN KEY (`generated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `generated_reports_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `report_templates` (`id`);

--
-- Constraints for table `grading`
--
ALTER TABLE `grading`
  ADD CONSTRAINT `grading_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD CONSTRAINT `vouchers_voucher_creator_foreign` FOREIGN KEY (`voucher_creator`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
