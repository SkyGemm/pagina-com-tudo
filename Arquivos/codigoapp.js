import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Modal, // Importe Modal para a tela do carrinho
  Pressable, // Importe Pressable para botões do modal
} from 'react-native';

// Dados de exemplo dos produtos da lanchonete
const products = [
  {
    id: '1',
    name: 'X-Burger',
    description: 'Pão, hambúrguer, queijo, alface, tomate e maionese.',
    price: 25.00, // Preço como número para cálculos
    icon: '🍔', // Ícone de emoji para X-Burger
  },
  {
    id: '2',
    name: 'Batata Frita',
    description: 'Porção individual de batatas fritas crocantes.',
    price: 15.00,
    icon: '🍟', // Ícone de emoji para Batata Frita
  },
  {
    id: '3',
    name: 'Refrigerante',
    description: 'Lata de 350ml (Coca-Cola, Guaraná, Soda).',
    price: 8.00,
    icon: '🥤', // Ícone de emoji para Refrigerante
  },
  {
    id: '4',
    name: 'Combo Família',
    description: '2 X-Burgers, 2 Batatas Fritas grandes e 2 Refrigerantes.',
    price: 60.00,
    icon: '👨‍👩‍👧‍👦', // Ícone de emoji para Combo Família
  },
  {
    id: '5',
    name: 'Suco Natural',
    description: 'Suco feito na hora (laranja, abacaxi, morango).',
    price: 12.00,
    icon: '🍹', // Ícone de emoji para Suco Natural
  },
  {
    id: '6',
    name: 'Sanduíche Vegetariano',
    description: 'Pão integral, hambúrguer de grão de bico, queijo vegano, alface, tomate e molho especial.',
    price: 28.00,
    icon: '🥗', // Ícone de emoji para Sanduíche Vegetariano
  },
];

const App = () => {
  // Estado para armazenar os itens no carrinho
  const [cartItems, setCartItems] = useState([]);
  // Estado para controlar a visibilidade do modal do carrinho
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Função para adicionar ou atualizar um item no carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Se o item já existe, incrementa a quantidade
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Se o item não existe, adiciona com quantidade 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Função para incrementar a quantidade de um item no carrinho
  const incrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Função para decrementar a quantidade de um item no carrinho
  const decrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove o item se a quantidade for 0
    );
  };

  // Função para remover um item do carrinho
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Calcula o total do carrinho
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Componente para renderizar cada item da lista de produtos
  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => addToCart(item)}>
      {/* Agora usamos um Text para exibir o ícone do emoji */}
      <Text style={styles.productIcon}>{item.icon}</Text>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
          <Text style={styles.addToCartButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Componente para renderizar cada item no modal do carrinho
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Ícone de emoji para os itens do carrinho */}
      <Text style={styles.cartItemIcon}>{item.icon}</Text>
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
        <View style={styles.quantityControl}>
          <Pressable style={styles.quantityButton} onPress={() => decrementQuantity(item.id)}>
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Pressable style={styles.quantityButton} onPress={() => incrementQuantity(item.id)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
            <Text style={styles.removeButtonText}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu da Lanchonete</Text>
        {/* Botão para abrir o carrinho */}
        <TouchableOpacity style={styles.cartButton} onPress={() => setIsCartVisible(true)}>
          <Text style={styles.cartButtonText}>
            Carrinho ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </Text>
          <Text style={styles.cartButtonPrice}>
            Total: R$ {calculateTotal().toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />

      {/* Modal do Carrinho */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCartVisible}
        onRequestClose={() => {
          setIsCartVisible(!isCartVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Seu Carrinho</Text>
            {cartItems.length === 0 ? (
              <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
            ) : (
              <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.cartList}
              />
            )}
            <View style={styles.modalFooter}>
              <Text style={styles.modalTotal}>Total: R$ {calculateTotal().toFixed(2).replace('.', ',')}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsCartVisible(!isCartVisible)}
              >
                <Text style={styles.textStyle}>Fechar</Text>
              </Pressable>
              {cartItems.length > 0 && (
                <Pressable
                  style={[styles.button, styles.buttonCheckout]}
                  onPress={() => {
                    // Lógica para finalizar o pedido aqui
                    alert('Pedido finalizado! Total: R$ ' + calculateTotal().toFixed(2).replace('.', ','));
                    setCartItems([]); // Limpa o carrinho após finalizar
                    setIsCartVisible(false);
                  }}
                >
                  <Text style={styles.textStyle}>Finalizar Pedido</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cartButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
    marginRight: 5,
  },
  cartButtonPrice: {
    fontSize: 14,
    color: '#FF6347',
  },
  productList: {
    padding: 15,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productIcon: { // Novo estilo para o ícone do produto
    fontSize: 50, // Tamanho do emoji
    marginRight: 15,
    width: 80, // Mantém o layout similar ao da imagem
    height: 80, // Mantém o layout similar ao da imagem
    textAlign: 'center', // Centraliza o emoji
    lineHeight: 80, // Alinha verticalmente
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
    alignSelf: 'flex-end',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Estilos do Modal do Carrinho
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escuro transparente
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%', // Largura do modal
    maxHeight: '80%', // Altura máxima do modal
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  cartList: {
    width: '100%',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 1,
  },
  cartItemIcon: { // Novo estilo para o ícone do carrinho
    fontSize: 40, // Tamanho do emoji
    marginRight: 10,
    width: 60, // Mantém o layout similar ao da imagem
    height: 60, // Mantém o layout similar ao da imagem
    textAlign: 'center', // Centraliza o emoji
    lineHeight: 60, // Alinha verticalmente
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20, // Garante que o número não "salte" com a mudança de dígitos
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 'auto', // Empurra para a direita
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalTotal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonCheckout: {
    backgroundColor: '#4CAF50',
    marginLeft: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;
