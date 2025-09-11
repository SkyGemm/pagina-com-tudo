def calcular_media(nota1, nota2, nota3):
    return (nota1 + nota2 + nota3) / 3

nota1 = float(input("Digite a primeira nota: "))
nota2 = float(input("Digite a segunda nota: "))
nota3 = float(input("Digite a terceira nota: "))

media = calcular_media(nota1, nota2, nota3)

print(f"A média das notas é: {media:.2f}")
