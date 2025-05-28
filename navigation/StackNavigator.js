import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import AddRecipeScreen from '../Screens/AddRecipeScreen';
import RecipeDetailScreen from '../Screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recept-app" component={HomeScreen} />
      <Stack.Screen name="Lägg till recept" component={AddRecipeScreen} />
      <Stack.Screen name="Detaljer" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
}
