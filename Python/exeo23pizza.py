import math
print("Vamos calcular nossas vendas!")
quantidade_pizzas_vendidas= int(input("Quantas pizzas já vendidas?"))
valor_venda_pizza= float(input("Qual valor de venda de cada pizza:R$ "))
custo_pizza= float(input("Qual o custo de produção:R$ "))
liquido= valor_venda_pizza - custo_pizza
print(f"O valor do (lucro é de:R$ {liquido:.2f}")
meta_financeira_liquida= float(input("Qual a meta de lucro desejada? "))
if liquido <= 0:
    print("\n Erro: Valor preço errado")
    print("Ajuste os valores novamente")

else:
    lucro_acumulado= quantidade_pizzas_vendidas * liquido
    lucro_faltante= meta_financeira_liquida - lucro_acumulado
    print("\n em resumo teremos: ")