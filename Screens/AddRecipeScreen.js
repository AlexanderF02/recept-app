import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddRecipeScreen() {
  const [title, setTitle] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!title.trim() || !ingredientInput.trim() || !instructions.trim()) return;
    const ingredients = ingredientInput
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);

    const newRecipe = {
      id: Date.now().toString(),
      title: title.trim(),
      ingredients,
      time: time ? parseInt(time) : null,
      category: category.trim(),
      imageUrl: imageUrl.trim(),
      instructions: instructions.trim(),
    };
    const data = await AsyncStorage.getItem('recipes');
    const current = data ? JSON.parse(data) : [];
    const updated = [...current, newRecipe];
    await AsyncStorage.setItem('recipes', JSON.stringify(updated));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <Text style={styles.header}>Lägg till nytt recept</Text>
        <Text style={styles.label}>Receptnamn *</Text>
        <TextInput
          placeholder="T.ex. Klassisk Carbonara"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Ingredienser *</Text>
        <TextInput
          placeholder="T.ex. 200g pasta, 1 ägg, 50g bacon"
          value={ingredientInput}
          onChangeText={setIngredientInput}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <Text style={{ color: '#888', marginLeft: 2, marginBottom: 10, fontSize: 13 }}>
          Skriv alla ingredienser separerade med komma (,)
        </Text>
        <Text style={styles.label}>Koktid (minuter)</Text>
        <TextInput
          placeholder="30"
          value={time}
          onChangeText={setTime}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Kategori</Text>
        <TextInput
          placeholder="T.ex. Huvudrätt"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Bild-URL (valfritt)</Text>
        <TextInput
          placeholder="https://example.com/recipe-image.jpg"
          value={imageUrl}
          onChangeText={setImageUrl}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Instruktioner *</Text>
        <TextInput
          placeholder="Beskriv hur man lagar receptet steg för steg..."
          value={instructions}
          onChangeText={setInstructions}
          style={[styles.input, { height: 80 }]}
          placeholderTextColor="#888"
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Spara recept</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 22,
    color: '#22223b',
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
    marginLeft: 2,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4f8cff',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#4f8cff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
