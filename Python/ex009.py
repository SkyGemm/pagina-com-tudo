import random
import string


def letra_aleatoria():
    return random.choice(string.ascii_uppercase)


texto = letra_aleatoria()
print(texto)
