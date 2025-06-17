import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import AddRecipeScreen from '../Screens/AddRecipeScreen';
import RecipeDetailScreen from '../Screens/RecipeDetailScreen';
import SavedRecipe from '../Screens/SavedRecipe';

// Skapar en stack-navigator
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      {/* Skärm för att lägga till nytt recept */}
      <Stack.Screen
        name="Lägg till recept"
        component={AddRecipeScreen}
        options={{ headerShown: false }}
      />
      {/* Skärm för att visa detaljer om ett recept */}
      <Stack.Screen
        name="Detaljer"
        component={RecipeDetailScreen}
        options={{ headerShown: false }}
      />
      {/* Skärm för att visa och filtrera sparade recept */}
      <Stack.Screen
        name="SavedRecipe"
        component={SavedRecipe}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
