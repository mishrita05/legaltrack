-- CreateTable
CREATE TABLE `FIR` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `f_name` VARCHAR(191) NOT NULL,
    `S_name` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `id_proof_type` VARCHAR(191) NOT NULL,
    `ID_number` VARCHAR(191) NOT NULL,
    `incidentDate` DATETIME(3) NOT NULL,
    `incident_time` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `incident_type` VARCHAR(191) NOT NULL,
    `Witnesses` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
