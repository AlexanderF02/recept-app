import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const isMobile = screenWidth < 500;

export default function HomeScreen() {
  const navigation = useNavigation();

  // Card component with hover/press effect (web & mobile)
  const Card = ({ children, style }) => (
    <Pressable
      style={({ hovered, pressed }) => [
        style,
        (hovered || pressed) && styles.cardHovered,
      ]}
    >
      {children}
    </Pressable>
  );

  // Button with hover/press effect
  const HoverButton = ({ children, style, textStyle, onPress }) => (
    <Pressable
      onPress={onPress}
      style={({ hovered, pressed }) => [
        style,
        (hovered || pressed) && styles.buttonHovered,
      ]}
    >
      {typeof children === 'string' ? <Text style={textStyle}>{children}</Text> : children}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Tillbaka-pil (visa bara om du vill ha en pil på startsidan, annars ta bort) */}
          {/* <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={28} color="#ea580c" />
          </Pressable> */}
          {/* Emoji and animated circle */}
          <View style={styles.emojiWrapper}>
            <Text style={styles.emoji}>👨‍🍳</Text>
            <View style={styles.emojiPulse} />
          </View>
          {/* Title and subtitle */}
          <Text style={styles.bigTitle}>Recipe Manager</Text>
          <Text style={styles.introText}>
            Transform your kitchen into a culinary heaven. Organize, discover, and share your favorite recipes with our beautifully designed recipe manager.
          </Text>
          {/* Feature badges */}
          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <FontAwesome5 name="star" size={isMobile ? 16 : 22} color="#facc15" solid />
              <Text style={styles.badgeText}>Professional Quality</Text>
            </View>
            <View style={styles.badge}>
              <Feather name="users" size={isMobile ? 16 : 22} color="#3b82f6" />
              <Text style={styles.badgeText}>Family Friendly</Text>
            </View>
            <View style={styles.badge}>
              <MaterialCommunityIcons name="chef-hat" size={isMobile ? 16 : 22} color="#22c55e" />
              <Text style={styles.badgeText}>Chef Approved</Text>
            </View>
          </View>
          {/* Feature cards with hover effect */}
          <View style={styles.cardsRow}>
            <Card style={[styles.card, styles.narrowCard, { backgroundColor: '#d1fae5' }]}>
              <View style={[styles.cardIcon, { backgroundColor: '#10b981' }]}>
                <Feather name="book" size={isMobile ? 20 : 40} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>Save Recipes</Text>
              <Text style={styles.cardDesc}>
                Store all your favorite recipes in one organized place with detailed ingredients, instructions, and cooking tips.
              </Text>
            </Card>
            <Card style={[styles.card, styles.narrowCard, { backgroundColor: '#dbeafe' }]}>
              <View style={[styles.cardIcon, { backgroundColor: '#2563eb' }]}>
                <Feather name="search" size={isMobile ? 20 : 40} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>Smart Search</Text>
              <Text style={styles.cardDesc}>
                Find exactly what you're looking for with our intelligent search that filters by ingredients, cooking time, and more.
              </Text>
            </Card>
            <Card style={[styles.card, styles.narrowCard, { backgroundColor: '#f3e8ff' }]}>
              <View style={[styles.cardIcon, { backgroundColor: '#a21caf' }]}>
                <Feather name="plus" size={isMobile ? 20 : 40} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>Easy Management</Text>
              <Text style={styles.cardDesc}>
                Add new recipes effortlessly and organize your collection with intuitive tools designed for home chefs.
              </Text>
            </Card>
          </View>
          {/* Buttons with hover effect */}
          <HoverButton
            style={styles.mainButton}
            textStyle={styles.mainButtonText}
            onPress={() => navigation.navigate('SavedRecipe')}
          >
            <Feather name="book" size={isMobile ? 16 : 20} color="#fff" style={{ marginRight: isMobile ? 6 : 8 }} />
            <Text style={styles.mainButtonText}>View My Recipes</Text>
          </HoverButton>
          <HoverButton
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
            onPress={() => navigation.navigate('Lägg till recept')}
          >
            <Feather name="plus" size={isMobile ? 16 : 20} color="#2563eb" style={{ marginRight: isMobile ? 6 : 8 }} />
            <Text style={styles.secondaryButtonText}>Add New Recipe</Text>
          </HoverButton>
        </View>
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
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    paddingBottom: isMobile ? 16 : 32,
  },
  container: {
    flex: 1,
    paddingHorizontal: isMobile ? 8 : 32,
    paddingTop: isMobile ? 12 : 36,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: isMobile ? 12 : 36,
  },
  emojiWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: isMobile ? 10 : 18,
  },
  emoji: {
    fontSize: isMobile ? 48 : 80,
    marginBottom: isMobile ? 4 : 8,
  },
  emojiPulse: {
    position: 'absolute',
    top: 0,
    right: isMobile ? -10 : -16,
    width: isMobile ? 20 : 32,
    height: isMobile ? 20 : 32,
    backgroundColor: '#facc15',
    borderRadius: isMobile ? 10 : 16,
    opacity: 0.5,
  },
  bigTitle: {
    fontSize: isMobile ? 22 : 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: isMobile ? 10 : 18,
    color: '#ea580c',
  },
  introText: {
    fontSize: isMobile ? 13 : 20,
    color: '#444',
    textAlign: 'center',
    marginBottom: isMobile ? 14 : 24,
    maxWidth: isMobile ? 260 : 540,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: isMobile ? 10 : 24,
    marginBottom: isMobile ? 16 : 28,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isMobile ? 6 : 10,
    marginHorizontal: isMobile ? 4 : 10,
    marginBottom: 2,
  },
  badgeText: {
    fontSize: isMobile ? 12 : 18,
    color: '#444',
    fontWeight: '600',
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: isMobile ? 10 : 24,
    marginBottom: isMobile ? 16 : 32,
    width: '100%',
  },
  card: {
    borderRadius: isMobile ? 12 : 20,
    padding: isMobile ? 10 : 22,
    marginHorizontal: isMobile ? 4 : 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: isMobile ? 6 : 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    backgroundColor: '#fff',
    transitionDuration: '150ms',
    transitionProperty: 'box-shadow, transform',
    transitionTimingFunction: 'ease-in-out',
    marginBottom: isMobile ? 10 : 18,
  },
  narrowCard: {
    flexBasis: isMobile ? '98%' : 260,
    maxWidth: isMobile ? '99%' : 320,
    minWidth: isMobile ? 120 : 180,
  },
  cardHovered: {
    shadowOpacity: 0.18,
    shadowRadius: isMobile ? 10 : 16,
    elevation: 6,
    transform: [{ scale: 1.04 }],
    boxShadow: '0 4px 24px 0 rgba(34,34,59,0.18)',
  },
  cardIcon: {
    width: isMobile ? 32 : 56,
    height: isMobile ? 32 : 56,
    borderRadius: isMobile ? 8 : 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isMobile ? 6 : 12,
  },
  cardTitle: {
    fontSize: isMobile ? 14 : 22,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: isMobile ? 4 : 8,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: isMobile ? 10 : 15,
    color: '#5c5c7a',
    textAlign: 'center',
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingVertical: isMobile ? 10 : 10,
    paddingHorizontal: isMobile ? 20 : 24,
    borderRadius: 999,
    marginBottom: isMobile ? 18 : 10,
    marginTop: isMobile ? 18 : 10,
    shadowColor: '#10b981',
    shadowOpacity: 0.18,
    shadowRadius: isMobile ? 4 : 6,
    elevation: 3,
    transitionDuration: '150ms',
    transitionProperty: 'box-shadow, transform',
    transitionTimingFunction: 'ease-in-out',
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: isMobile ? 14 : 16,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#2563eb',
    borderWidth: 2,
    paddingVertical: isMobile ? 10 : 10,
    paddingHorizontal: isMobile ? 20 : 24,
    borderRadius: 999,
    marginBottom: isMobile ? 28 : 14,
    shadowColor: '#2563eb',
    shadowOpacity: 0.08,
    shadowRadius: isMobile ? 4 : 4,
    elevation: 1,
    transitionDuration: '150ms',
    transitionProperty: 'box-shadow, transform',
    transitionTimingFunction: 'ease-in-out',
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: isMobile ? 14 : 16,
    letterSpacing: 0.5,
  },
  buttonHovered: {
    transform: [{ scale: 1.04 }],
    boxShadow: '0 4px 24px 0 rgba(34,34,59,0.18)',
    shadowOpacity: 0.18,
    shadowRadius: isMobile ? 10 : 16,
    elevation: 6,
  },
});