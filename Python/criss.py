import math
from collections import Counter
import statistics


def calcular_media(dados):
    """Calcula a média aritmética de uma lista de números."""
    return sum(dados) / len(dados)


def calcular_mediana(dados):
    """Calcula a mediana de uma lista de números."""
    dados_ordenados = sorted(dados)
    n = len(dados_ordenados)

    if n % 2 == 1:
        return dados_ordenados[n // 2]
    else:
        return (dados_ordenados[n // 2 - 1] + dados_ordenados[n // 2]) / 2


def calcular_moda(dados):
    """Calcula a moda de uma lista de números."""
    contador = Counter(dados)
    max_contagem = max(contador.values())
    modas = [k for k, v in contador.items() if v == max_contagem]

    return modas[0] if len(modas) == 1 else modas


def calcular_desvio_padrao(dados):
    """Calcula o desvio padrão de uma lista de números."""
    media = calcular_media(dados)
    variancia = sum((x - media) ** 2 for x in dados) / len(dados)
    return math.sqrt(variancia)


def calcular_distancia(ponto1, ponto2):
    """Calcula a distância entre dois pontos no espaço n-dimensional."""
    if len(ponto1) != len(ponto2):
        raise ValueError("Os pontos devem ter a mesma dimensão")

    soma_quadrados = sum((a - b) ** 2 for a, b in zip(ponto1, ponto2))
    return math.sqrt(soma_quadrados)


def main():
    print("Escolha a operação:")
    print("1. Média")
    print("2. Mediana")
    print("3. Moda")
    print("4. Desvio Padrão")
    print("5. Distância entre 2 pontos")

    escolha = input("Digite o número da operação desejada (1-5): ")

    try:
        if escolha in ['1', '2', '3', '4']:
            # Operações que requerem uma lista de números
            entrada = input("Digite os números separados por vírgula: ")
            dados = [float(x.strip()) for x in entrada.split(',')]

            if escolha == '1':
                resultado = calcular_media(dados)
                print(f"Média: {resultado:.2f}")
            elif escolha == '2':
                resultado = calcular_mediana(dados)
                print(f"Mediana: {resultado:.2f}")
            elif escolha == '3':
                resultado = calcular_moda(dados)
                print(f"Moda: {resultado}")
            elif escolha == '4':
                resultado = calcular_desvio_padrao(dados)
                print(f"Desvio Padrão: {resultado:.2f}")

        elif escolha == '5':
            # Cálculo de distância entre pontos
            ponto1 = [float(x) for x in
                      input("Digite as coordenadas do primeiro ponto separadas por vírgula (ex: 1,2,3): ").split(',')]
            ponto2 = [float(x) for x in
                      input("Digite as coordenadas do segundo ponto separadas por vírgula (ex: 4,5,6): ").split(',')]

            resultado = calcular_distancia(ponto1, ponto2)
            print(f"Distância entre os pontos: {resultado:.2f}")

        else:
            print("Opção inválida. Por favor, escolha um número entre 1 e 5.")

    except ValueError as e:
        print(f"Erro: Entrada inválida. {e}")
    except ZeroDivisionError:
        print("Erro: Lista vazia. Não é possível calcular.")
    except Exception as e:
        print(f"Ocorreu um erro inesperado: {e}")


if __name__ == "__main__":
    main()