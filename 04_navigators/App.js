// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Drawer = createDrawerNavigator()
const BottomTab = createBottomTabNavigator()

export default function App() {
  return <NavigationContainer>
      <BottomTab.Navigator screenOptions={{
            // drawerActiveBackgroundColor: '#f0e1ff',
            // drawerActiveTintColor: '#3c0a6b',
            // drawerStyle: '#ccc',
            headerStyle: {backgroundColor: '#3c0a6b'},
            headerTintColor: 'white',
            tabBarActiveTintColor: '#3c0a6b'
      }}>
        <BottomTab.Screen 
          name='Welcome' 
          component={WelcomeScreen} 
          options={{
          //   drawerLabel: 'Welcome Screen',
          //   drawerIcon: ({color, size}) => <Ionicons name='home' color={color} size={size}/>
          tabBarIcon: ({color, size}) => <Ionicons name='home' color={color} size={size}/>
          }}
        />
        <BottomTab.Screen name='User' component={UserScreen} 
          options={{
            // drawerIcon: ({color, size}) => <Ionicons name='person' color={color} size={size}/>
          tabBarIcon: ({color, size}) => <Ionicons name='person' color={color} size={size}/>
          }}
        />
      </BottomTab.Navigator>
  </NavigationContainer>;
}

