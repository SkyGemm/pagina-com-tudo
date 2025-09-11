def calcular_situacao_aluno():
    nota1 = float(input("Digite a nota 1: "))
    nota2 = float(input("Digite a nota 2: "))
    nota3 = float(input("Digite a nota 3: "))

    media = (nota1 + nota2 + nota3) / 3

    if media >= 60:
        return "Aprovado"
    elif 50 <= media < 60:
        return "Recuperação"
    else:
        return "Reprovado"

situacao = calcular_situacao_aluno()
print(f"O aluno está {situacao}.")
