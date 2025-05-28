import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadRecipes } from '../utils/RecipeStorage';
import RecipeItem from '../components/RecipeItem';
import { SearchFilters } from '../components/SearchFilters';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIngredient, setFilterIngredient] = useState('');
  const [maxCookingTime, setMaxCookingTime] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const saved = await loadRecipes();
      setRecipes(saved);
    });
    return unsubscribe;
  }, [navigation]);

  const filtered = recipes.filter((r) => {
    const titleMatch = r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const ingredientMatch =
      filterIngredient.trim() === '' ||
      (Array.isArray(r.ingredients) &&
        r.ingredients.join(', ').toLowerCase().includes(filterIngredient.toLowerCase()));
    const timeMatch =
      !maxCookingTime ||
      (r.time !== undefined && r.time !== null && Number(r.time) <= Number(maxCookingTime));
    return titleMatch && ingredientMatch && timeMatch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Din Receptsamling</Text>
      <Text style={styles.subHeader}>Spara, organisera och upptäck dina favoritrecept.</Text>
      <Text style={styles.subHeader}>Skapa din personliga kokbok</Text>
      <Text style={styles.subHeader}>med enkla sökfunktioner.</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Lägg till recept')}
      >
        <Text style={styles.addButtonText}>+ Lägg till nytt recept</Text>
      </TouchableOpacity>
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterIngredient={filterIngredient}
        setFilterIngredient={setFilterIngredient}
        maxCookingTime={maxCookingTime}
        setMaxCookingTime={setMaxCookingTime}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.recipeCard,
              hoveredId === item.id && styles.recipeCardHover
            ]}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <RecipeItem recipe={item} onPress={() => navigation.navigate('Detaljer', { recipe: item })} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Inga recept hittades.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#22223b',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 0,
  },
  addButton: {
    backgroundColor: '#4f8cff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#4f8cff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    padding: 8,
    shadowColor: '#22223b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
    transitionDuration: '200ms',
  },
  recipeCardHover: {
    backgroundColor: '#058bf7',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 16,
  },
});
