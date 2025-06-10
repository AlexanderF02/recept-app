import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Pressable, SafeAreaView, Platform, StatusBar } from 'react-native';
import { loadRecipes, saveRecipes } from '../utils/RecipeStorage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default function RecipeDetailScreen({ route }) {
  const { recipe } = route.params;
  const navigation = useNavigation();

  const handleDelete = async () => {
    const all = await loadRecipes();
    const filtered = all.filter(r => r.id !== recipe.id);
    await saveRecipes(filtered);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Tillbaka-pil */}
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#ea580c" />
        </Pressable>

        {/* Bild om den finns */}
        {recipe.imageUrl ? (
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : null}

        {/* Titel */}
        <Text style={styles.title}>{recipe.title}</Text>

        {/* Koktid, antal ingredienser, kategori */}
        <View style={styles.quickInfoRow}>
          {recipe.time ? (
            <Text style={styles.quickInfo}>{recipe.time} minuter</Text>
          ) : null}
          {Array.isArray(recipe.ingredients) ? (
            <Text style={styles.quickInfo}>{recipe.ingredients.length} ingredienser</Text>
          ) : null}
          {recipe.category ? (
            <Text style={styles.quickInfo}>{recipe.category}</Text>
          ) : null}
        </View>

        {/* Ingredienser */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Ingredienser</Text>
          {Array.isArray(recipe.ingredients) ? (
            recipe.ingredients.map((ing, idx) => (
              <Text key={idx} style={styles.value}>• {ing}</Text>
            ))
          ) : (
            <Text style={styles.value}>{recipe.ingredients}</Text>
          )}
        </View>

        {/* Instruktioner */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Instruktioner</Text>
          <Text style={styles.value}>{recipe.instructions}</Text>
        </View>

        {/* Ta bort-knapp */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Ta bort recept</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 18,
    paddingTop: 0,
    // alignItems: 'center', // Ta bort för att låta innehållet fylla bredden
  },
  backButton: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
    padding: 8,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 18,
    marginTop: 0,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 0,
  },
  quickInfoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  quickInfo: {
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 4,
    fontSize: 15,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    width: '100%',
    shadowColor: '#22223b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontWeight: 'bold',
    color: '#4f8cff',
    marginBottom: 6,
    fontSize: 17,
  },
  value: {
    color: '#22223b',
    fontSize: 16,
    marginBottom: 4,
  },
  deleteButton: {
    backgroundColor: '#ff4f4f',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#ff4f4f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
    marginTop: 10,
    marginBottom: 24,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
