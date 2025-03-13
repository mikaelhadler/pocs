import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import TodoScreen from './src/screens/TodoScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import {TouchableOpacity, Text} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tarefas"
            component={TodoScreen}
            options={{
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Histórico')}
                  style={{marginRight: 15}}>
                  <Text>Histórico</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="Histórico" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
