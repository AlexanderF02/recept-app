import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveRecipes = async (recipes) => {
  try {
    console.log('Sparar till AsyncStorage:', recipes);
    await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
    const check = await AsyncStorage.getItem('recipes');
    console.log('Verifierat sparat värde:', check);
  } catch (e) {
    console.error('Kunde inte spara recept', e);
  }
};

export const loadRecipes = async () => {
  try {
    const data = await AsyncStorage.getItem('recipes');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Kunde inte ladda recept', e);
    return [];
  }
};
