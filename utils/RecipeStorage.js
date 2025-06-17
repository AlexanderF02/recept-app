import AsyncStorage from '@react-native-async-storage/async-storage';

// Funktion för att spara en lista med recept till AsyncStorage
export const saveRecipes = async (recipes) => {
  try {
    console.log('Sparar till AsyncStorage:', recipes); // Loggar vad som sparas (för felsökning)
    await AsyncStorage.setItem('recipes', JSON.stringify(recipes)); // Sparar recepten som en sträng
    const check = await AsyncStorage.getItem('recipes'); // Hämtar värdet igen för att verifiera
    console.log('Verifierat sparat värde:', check); // Loggar det sparade värdet
  } catch (e) {
    console.error('Kunde inte spara recept', e); // Felhantering om något går fel
  }
};

// Funktion för att läsa in alla sparade recept från AsyncStorage
export const loadRecipes = async () => {
  try {
    const data = await AsyncStorage.getItem('recipes'); // Hämtar recepten som sträng
    return data ? JSON.parse(data) : []; // Om det finns data, parsa till array, annars returnera tom array
  } catch (e) {
    console.error('Kunde inte ladda recept', e); // Felhantering om något går fel
    return [];
  }
};
