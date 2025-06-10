import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadRecipes } from '../utils/RecipeStorage';
import RecipeItem from '../components/RecipeItem';
import { SearchFilters } from '../components/SearchFilters';
import { Feather } from '@expo/vector-icons';

export default function SavedRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIngredient, setFilterIngredient] = useState('');
  const [maxCookingTime, setMaxCookingTime] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecipes = async () => {
      const saved = await loadRecipes();
      setRecipes(saved);
    };
    fetchRecipes();
    const unsubscribe = navigation.addListener('focus', fetchRecipes);
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
      (r.time !== undefined && r.time !== null && Number(r.time) === Number(maxCookingTime));
    return titleMatch && ingredientMatch && timeMatch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Tillbaka-pil */}
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#ea580c" />
        </Pressable>
        <Text style={styles.title}>Mina sparade recept</Text>
        <View style={styles.filtersWrapper}>
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterIngredient={filterIngredient}
            setFilterIngredient={setFilterIngredient}
            maxCookingTime={maxCookingTime}
            setMaxCookingTime={setMaxCookingTime}
          />
        </View>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <RecipeItem recipe={item} onPress={() => navigation.navigate('Detaljer', { recipe: item })} />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Du har inga sparade recept ännu.</Text>
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff7ed',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
    paddingHorizontal: 18,
    paddingTop: 0,
  },
  backButton: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: 24,
    textAlign: 'center',
    marginTop: 0,
  },
  filtersWrapper: {
    marginBottom: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#22223b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    width: '100%',
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#22223b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e7ef',
  },
  emptyText: {
    textAlign: 'center',
    color: '#b0b0c3',
    marginTop: 40,
    fontSize: 17,
    fontWeight: '500',
  },
});