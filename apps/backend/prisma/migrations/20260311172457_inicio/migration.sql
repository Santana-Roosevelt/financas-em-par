-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha_hash` VARCHAR(191) NULL,
    `avatar_url` VARCHAR(191) NULL,
    `google_id` VARCHAR(191) NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_google_id_key`(`google_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `casais` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `codigo_convite` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `casais_codigo_convite_key`(`codigo_convite`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `membros_do_casal` (
    `id` VARCHAR(191) NOT NULL,
    `papel` ENUM('DONO', 'PARCEIRO') NOT NULL DEFAULT 'PARCEIRO',
    `entrou` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `casal_id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `membros_do_casal_casal_id_usuario_id_key`(`casal_id`, `usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `icone` VARCHAR(191) NOT NULL DEFAULT '💰',
    `cor` VARCHAR(191) NOT NULL DEFAULT '#6366f1',
    `tipo` ENUM('RECEITA', 'DESPESA') NOT NULL,
    `padrao` BOOLEAN NOT NULL DEFAULT false,
    `casal_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transacoes` (
    `id` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `tipo` ENUM('RECEITA', 'DESPESA') NOT NULL,
    `escopo` ENUM('INDIVIDUAL', 'CONJUNTO') NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `data` DATE NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,
    `casal_id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `categoria_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metas` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `valor_alvo` DECIMAL(10, 2) NOT NULL,
    `valor_atual` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `escopo` ENUM('INDIVIDUAL', 'CONJUNTO') NOT NULL,
    `icone` VARCHAR(191) NOT NULL DEFAULT '🎯',
    `cor` VARCHAR(191) NOT NULL DEFAULT '#10b981',
    `prazo` DATE NULL,
    `status` ENUM('ATIVA', 'CONCLUIDA', 'CANCELADA') NOT NULL DEFAULT 'ATIVA',
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,
    `casal_id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `membros_do_casal` ADD CONSTRAINT `membros_do_casal_casal_id_fkey` FOREIGN KEY (`casal_id`) REFERENCES `casais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membros_do_casal` ADD CONSTRAINT `membros_do_casal_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categorias` ADD CONSTRAINT `categorias_casal_id_fkey` FOREIGN KEY (`casal_id`) REFERENCES `casais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_casal_id_fkey` FOREIGN KEY (`casal_id`) REFERENCES `casais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metas` ADD CONSTRAINT `metas_casal_id_fkey` FOREIGN KEY (`casal_id`) REFERENCES `casais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `metas` ADD CONSTRAINT `metas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
