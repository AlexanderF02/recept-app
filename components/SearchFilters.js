import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  filterIngredient,
  setFilterIngredient,
  maxCookingTime,
  setMaxCookingTime
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Feather name="search" size={20} color="#ea580c" />
        <Text style={styles.headerText}>Sök och filtrera recept</Text>
      </View>
      <View style={styles.inputsRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sök efter titel</Text>
          <TextInput
            style={styles.input}
            placeholder="Skriv receptnamn..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Filtrera efter ingrediens</Text>
          <TextInput
            style={styles.input}
            placeholder="T.ex. kyckling, pasta..."
            value={filterIngredient}
            onChangeText={setFilterIngredient}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Max koktid (minuter)</Text>
          <TextInput
            style={styles.input}
            placeholder="T.ex. 30"
            value={maxCookingTime ? String(maxCookingTime) : ''}
            onChangeText={text => setMaxCookingTime(text ? parseInt(text) : null)}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fed7aa',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#22223b',
    marginLeft: 8,
  },
  inputsRow: {
    flexDirection: 'column',
    gap: 12,
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
});