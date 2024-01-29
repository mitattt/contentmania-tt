import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import EditPostScreen from './src/screens/EditPostScreen';
import HomeScreen from './src/screens/HomeScreen';
import NewPostScreen from './src/screens/NewPostScreen';
import PostScreen from './src/screens/PostScreen';
import {store} from './src/store';
import {RootStackParamList} from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const screenOptions: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: '#D0DAE8',
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{...screenOptions, title: 'Recent Posts'}}
          />
          <Stack.Screen
            name="PostScreen"
            component={PostScreen}
            options={{...screenOptions, title: 'Post'}}
          />
          <Stack.Screen
            name="EditPostScreen"
            component={EditPostScreen}
            options={{...screenOptions, title: 'Edit Post'}}
          />
          <Stack.Screen
            name="NewPostScreen"
            component={NewPostScreen}
            options={{...screenOptions, title: 'New Post'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
