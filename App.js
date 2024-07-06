import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import YesNo from './screens/YesNoPage';
import Question from './screens/QuestionPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="YesNo" component={YesNo} />
        <Stack.Screen name="Question" component={Question} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
