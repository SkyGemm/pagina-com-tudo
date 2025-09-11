s = str(input("Digite M ou F: \n")).strip().upper()[0]

while s not in "MF":
    s = str(input("CARO ASNO, digita só M ou F: \n")).strip().upper()[0]

print("Sexo do fela é {}.".format(s))
print(f"Sexo do fela é {s}")
