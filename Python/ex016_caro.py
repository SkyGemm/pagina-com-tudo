def situacao(valor1):
    media = (valor1) / 1
    if media >= 1000:
     return "Caro"
    else:
     return "Barato"
valor1 = float(input("Digite o valor: "))
resultado = situacao(valor1)
print(f"O produto está {resultado}.")
