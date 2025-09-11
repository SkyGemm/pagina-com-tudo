import pygame
import sys
import random

# Inicialização
pygame.init()

# Configuração da tela
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("PONG Simplificado")

# Cores
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Objetos do jogo
player = pygame.Rect(50, HEIGHT // 2 - 50, 10, 100)
opponent = pygame.Rect(WIDTH - 60, HEIGHT // 2 - 50, 10, 100)
ball = pygame.Rect(WIDTH // 2 - 10, HEIGHT // 2 - 10, 20, 20)

# Velocidades iniciais
player_speed = 0
opponent_speed = 0

initial_speed = 5
current_speed_x = initial_speed * random.choice((1, -1))
current_speed_y = initial_speed * random.choice((1, -1))
speed_increment = 1.1  # fator de aumento na velocidade a cada bate na raquete

# Placar
player_score = 0
opponent_score = 0
font = pygame.font.Font(None, 36)

clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

        # Controles
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_DOWN:
                opponent_speed = 7
            if event.key == pygame.K_UP:
                opponent_speed = -7
            if event.key == pygame.K_s:
                player_speed = 7
            if event.key == pygame.K_w:
                player_speed = -7

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_DOWN or event.key == pygame.K_UP:
                opponent_speed = 0
            if event.key == pygame.K_s or event.key == pygame.K_w:
                player_speed = 0

    # Movimento
    player.y += player_speed
    opponent.y += opponent_speed

    # Limites
    if player.top <= 0:
        player.top = 0
    if player.bottom >= HEIGHT:
        player.bottom = HEIGHT
    if opponent.top <= 0:
        opponent.top = 0
    if opponent.bottom >= HEIGHT:
        opponent.bottom = HEIGHT

    # Movimento da bola
    ball.x += current_speed_x
    ball.y += current_speed_y

    # Colisões com teto e chão
    if ball.top <= 0 or ball.bottom >= HEIGHT:
        current_speed_y *= -1

    # Colisão com raquetes
    if ball.colliderect(player):
        current_speed_x = abs(current_speed_x) * speed_increment  # aumenta e garante velocidade positiva pra direita
        # Inverte direção X para direita
        current_speed_x = -current_speed_x if current_speed_x < 0 else current_speed_x
        current_speed_x *= -1

    if ball.colliderect(opponent):
        current_speed_x = -abs(current_speed_x) * speed_increment  # aumenta e garante velocidade negativa pra esquerda
        # Inverte direção X para esquerda
        current_speed_x = current_speed_x if current_speed_x < 0 else -current_speed_x

    # Pontuação
    if ball.left <= 0:
        opponent_score += 1
        ball.center = (WIDTH // 2, HEIGHT // 2)
        current_speed_x = initial_speed * random.choice((1, -1))  # reset velocidade
        current_speed_y = initial_speed * random.choice((1, -1))

    if ball.right >= WIDTH:
        player_score += 1
        ball.center = (WIDTH // 2, HEIGHT // 2)
        current_speed_x = initial_speed * random.choice((1, -1))  # reset velocidade
        current_speed_y = initial_speed * random.choice((1, -1))

    # Desenho
    screen.fill(BLACK)
    pygame.draw.rect(screen, WHITE, player)
    pygame.draw.rect(screen, WHITE, opponent)
    pygame.draw.ellipse(screen, WHITE, ball)
    pygame.draw.aaline(screen, WHITE, (WIDTH // 2, 0), (WIDTH // 2, HEIGHT))

    # Placar
    player_text = font.render(f"{player_score}", True, WHITE)
    opponent_text = font.render(f"{opponent_score}", True, WHITE)
    screen.blit(player_text, (WIDTH // 4, 20))
    screen.blit(opponent_text, (3 * WIDTH // 4, 20))

    pygame.display.flip()
    clock.tick(60)
