import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const HistoryScreen = () => {
  const completedTodos = useSelector(state => state.todos.completedItems);

  const renderItem = ({item}) => (
    <View style={styles.todoItem}>
      <Text>{item.text}</Text>
      <Text style={styles.dateText}>
        Concluído em: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTodos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  todoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default HistoryScreen;
