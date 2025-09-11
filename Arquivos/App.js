import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Image} from 'react-native';
import TransactionForm from './TransactionForm'; // Importa o componente do formulário

const Logo=require('./assets/Logocontrolefinanceiro.png')

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = transaction => {
    setTransactions(prevTransactions => [transaction, ...prevTransactions]);
  };

  const renderItem = ({ item }) => {
    const isIncome = item.type === 'income';
    const transactionValue = isIncome ? `+ R$ ${item.value.toFixed(2)}` : `- R$ ${item.value.toFixed(2)}`;
    const valueStyle = isIncome ? styles.incomeValue : styles.expenseValue;

    return (
      <View style={styles.transactionItem}>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <Text style={valueStyle}>{transactionValue}</Text>
      </View>
    );
  };

  const totalBalance = transactions.reduce((sum, transaction) => {
    return sum + (transaction.type === 'income' ? transaction.value : -transaction.value);
  }, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Controle Financeiro</Text>
        <Image source={Logo} style={styles.Logo}></Image>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Saldo Atual</Text>
          <Text style={styles.balanceValue}>R$ {totalBalance.toFixed(2)}</Text>
        </View>

        <TransactionForm onAddTransaction={addTransaction} />

        <Text style={styles.transactionsHeader}>Histórico de Lançamentos</Text>

        {transactions.length === 0 ? (
          <Text style={styles.noDataText}>Nenhum lançamento adicionado ainda.</Text>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            scrollEnabled={false} // Evita o scroll duplo
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Logo:{
    width:100,
    height:100,
    alignSelf:'center',
    marginBottom:20,
    resizeMode:'contain',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  balanceContainer: {
    backgroundColor: '#e8e8e8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 16,
    color: '#555',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2a2a2a',
  },
  transactionsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  descriptionText: {
    fontSize: 16,
    color: '#444',
  },
  incomeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  expenseValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc3545',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
    fontSize: 16,
  },
});

export default App;