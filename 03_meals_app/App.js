import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import { Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return <Drawer.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#351401' },
              headerTintColor: 'white',
              sceneContainerStyle: { backgroundColor: '#3f2f25'},
              drawerContentStyle: {backgroundColor: '#351401'},
              drawerInactiveTintColor: 'white',
              drawerActiveTintColor: '#351401',
              drawerActiveBackgroundColor: '#e4baa1'
            }}
          >
          <Drawer.Screen name='Categories' component={CategoriesScreen} 
            options={{
              title: 'All Categories',
              drawerIcon: ({color, size}) => <Ionicons name='list' color={color} size={size}/>
            }}
          />
          <Drawer.Screen name='Favorites' component={FavoritesScreen}
            options={{
              drawerIcon: ({color, size}) => <Ionicons name='star' color={color} size={size}/>
            }}
          />
        </Drawer.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#3f2f25'}
          }}
        >
          <Stack.Screen 
            name='Drawer' 
            component={DrawerNavigator}
            options={{
              // title: 'All Categories',
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name='MealsOverview' 
            component={MealsOverviewScreen} 
            // options={({ route, navigation }) => {
            //   const catId = route.params.categoryId;
            //   return {
            //       title: catId
            //   }
            // }}
          />
          <Stack.Screen 
            name='MealDetail' 
            component={MealDetailScreen} 
            options={{
              title: 'About the Meal',
            //   headerRight: () => {
            //     return <Text>In header</Text>
            //   }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
