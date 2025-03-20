import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';
import TodoScreen from './src/screens/TodoScreen';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tarefas"
            component={TodoScreen}
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Histórico')}
                  style={{marginRight: 15}}>
                  <Text>Histórico</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Histórico" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
