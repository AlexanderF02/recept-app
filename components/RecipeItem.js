import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function RecipeItem({ recipe, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {recipe.imageUrl ? (
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      ) : null}
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        {recipe.category ? (
          <Text style={styles.category}>{recipe.category}</Text>
        ) : null}
        <Text style={styles.ingredients}>
          {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}
        </Text>
        {recipe.time ? (
          <Text style={styles.time}>Koktid: {recipe.time} min</Text>
        ) : null}
        {recipe.instructions ? (
          <Text style={styles.instructions} numberOfLines={2}>
            {recipe.instructions}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
    alignItems: 'center',
    elevation: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#22223b',
    marginBottom: 2,
  },
  category: {
    color: '#ea580c',
    fontSize: 14,
    marginBottom: 2,
  },
  ingredients: {
    color: '#444',
    fontSize: 13,
    marginBottom: 2,
  },
  time: {
    color: '#4f8cff',
    fontSize: 13,
    marginBottom: 2,
  },
  instructions: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
});
