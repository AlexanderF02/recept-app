import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import AddRecipeScreen from '../Screens/AddRecipeScreen';
import RecipeDetailScreen from '../Screens/RecipeDetailScreen';
import SavedRecipe from '../Screens/SavedRecipe';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lägg till recept"
        component={AddRecipeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detaljer"
        component={RecipeDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SavedRecipe"
        component={SavedRecipe}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
