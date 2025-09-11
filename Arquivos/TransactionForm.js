import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';

const TransactionForm = ({ onAddTransaction }) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense'); // 'expense' ou 'income'

  const handleAddTransaction = () => {
    if (!value || !description) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const numericValue = parseFloat(value.replace(',', '.'));
    if (isNaN(numericValue) || numericValue <= 0) {
      Alert.alert('Erro', 'O valor deve ser um número positivo.');
      return;
    }

    const transaction = {
      id: Math.random().toString(),
      description,
      value: numericValue,
      type,
    };

    onAddTransaction(transaction);
    // Limpa os campos do formulário após a submissão
    setValue('');
    setDescription('');
    setType('expense');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Lançamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição (ex: Aluguel)"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor (ex: 1200.50)"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'expense' && styles.activeExpense]}
          onPress={() => setType('expense')}>
          <Text style={styles.buttonText}>Despesa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'income' && styles.activeIncome]}
          onPress={() => setType('income')}>
          <Text style={styles.buttonText}>Receita</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Adicionar Lançamento"
        onPress={handleAddTransaction}
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  activeExpense: {
    backgroundColor: '#ff6347',
  },
  activeIncome: {
    backgroundColor: '#32cd32',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TransactionForm;