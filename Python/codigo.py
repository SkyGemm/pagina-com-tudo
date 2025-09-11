# EX 021 - Imprime números pares de 1 a 50
print("Números pares de 1 a 50:")
for num in range(2, 51, 2):
    print(num, end=' ')
print("\n")  # Pula linha para separar os exercícios

# EX 022 - Soma números pares digitados pelo usuário
soma = 0
print("Digite 6 números para somar os pares:")
for i in range(6):
    while True:
        try:
            num = int(input(f"Número {i+1}: "))
            break
        except ValueError:
            print("Por favor, digite um número válido!")
    if num % 2 == 0:
        soma += num
print(f"Soma dos números pares: {soma}\n")

# EX 023 - Soma ímpares múltiplos de 3 entre 1 e 500
soma_multiplos = 0
for num in range(1, 501, 2):  # Já começa pelos ímpares
    if num % 3 == 0:
        soma_multiplos += num
print(f"Soma dos ímpares múltiplos de 3 (1-500): {soma_multiplos}")