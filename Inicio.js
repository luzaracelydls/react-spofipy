import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation, Button, Card, Chip, IconButton, Text } from 'react-native-paper';
import data from './data.json';

const songImages = [
  'https://cdn.shoplightspeed.com/shops/617250/files/50715333/1600x2048x2/republic-weeknd-starboy-lp.jpg',
  'https://upload.wikimedia.org/wikipedia/en/8/8b/Eminem_-_The_Marshall_Mathers_LP.jpg',
];

const collections = [
  {
    title: 'Top Songs Global',
    subtitle: 'Discover 85 songs',
    action: 'Escuchar',
  },
  {
    title: 'Public Playlists',
    subtitle: 'Fresh mixes for every mood',
    action: 'Abrir',
  },
];

const PlaceholderRoute = () => <View style={styles.placeholderScene} />;

export default function Inicio() {
  const [selectedCategory, setSelectedCategory] = React.useState('Todas');
  const [index, setIndex] = React.useState(0);

  const routes = React.useMemo(
    () => [
      { key: 'home', title: 'Inicio', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
      { key: 'favorites', title: 'Favoritos', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
      { key: 'search', title: 'Buscar', focusedIcon: 'magnify' },
      { key: 'profile', title: 'Perfil', focusedIcon: 'account-outline' },
    ],
    []
  );

  const renderScene = BottomNavigation.SceneMap({
    home: PlaceholderRoute,
    favorites: PlaceholderRoute,
    search: PlaceholderRoute,
    profile: PlaceholderRoute,
  });

  const categories = ['Todas', ...data.categorias];
  const songCards = data.canciones.map((song, index) => ({
    ...song,
    image: songImages[index % songImages.length],
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text variant="headlineSmall" style={styles.greeting}>
                Hola, usuario ✨
              </Text>
              <Text variant="bodyMedium" style={styles.subheading}>
                Descubre algo para escuchar hoy
              </Text>
            </View>
            <View style={styles.headerActions}>
              <IconButton icon="bell-outline" iconColor="#FFFFFF" containerColor="#222222" />
              <IconButton icon="email-outline" iconColor="#FFFFFF" containerColor="#222222" />
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Categorías
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  selected={selectedCategory === category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.chip,
                    selectedCategory === category ? styles.chipSelected : styles.chipUnselected,
                  ]}
                  textStyle={selectedCategory === category ? styles.chipSelectedText : styles.chipText}
                  showSelectedOverlay={false}
                >
                  {category}
                </Chip>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Canciones populares
              </Text>
              <Button compact mode="text" textColor="#1DB954">
                Todas
              </Button>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
              {songCards.map((song) => (
                <Card key={song.nombre} mode="elevated" style={styles.songCard}>
                  <Card.Cover source={{ uri: song.image }} style={styles.songCover} />
                  <Card.Content style={styles.songContent}>
                    <Text variant="titleMedium" style={styles.songTitle}>
                      {song.nombre}
                    </Text>
                    <Text variant="bodyMedium" style={styles.songArtist}>
                      {song.artista}
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Nueva colección
            </Text>
            <View style={styles.collectionList}>
              {collections.map((collection) => (
                <Card key={collection.title} mode="elevated" style={styles.collectionCard}>
                  <Card.Content style={styles.collectionContent}>
                    <Text variant="titleMedium" style={styles.collectionTitle}>
                      {collection.title}
                    </Text>
                    <Text variant="bodyMedium" style={styles.collectionSubtitle}>
                      {collection.subtitle}
                    </Text>
                    <Button mode="contained" buttonColor="#1DB954" textColor="#111111" style={styles.collectionAction}>
                      {collection.action}
                    </Button>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </View>
        </ScrollView>

        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          activeColor="#1DB954"
          inactiveColor="#9E9E9E"
          barStyle={styles.bottomBar}
          sceneAnimationEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  greeting: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  subheading: {
    color: '#B3B3B3',
  },
  headerActions: {
    flexDirection: 'row',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 14,
  },
  chipsRow: {
    paddingRight: 20,
    gap: 10,
  },
  chip: {
    borderRadius: 18,
  },
  chipSelected: {
    backgroundColor: '#1DB954',
  },
  chipUnselected: {
    backgroundColor: '#222222',
  },
  chipText: {
    color: '#FFFFFF',
  },
  chipSelectedText: {
    color: '#111111',
  },
  cardsRow: {
    paddingRight: 20,
    gap: 16,
  },
  songCard: {
    width: 190,
    backgroundColor: '#181818',
    borderRadius: 22,
    overflow: 'hidden',
  },
  songCover: {
    backgroundColor: '#2A2A2A',
  },
  songContent: {
    paddingTop: 14,
  },
  songTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  songArtist: {
    color: '#B3B3B3',
    marginTop: 4,
  },
  collectionList: {
    gap: 14,
  },
  collectionCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 24,
  },
  collectionContent: {
    paddingVertical: 6,
  },
  collectionTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 6,
  },
  collectionSubtitle: {
    color: '#B3B3B3',
    marginBottom: 16,
  },
  collectionAction: {
    alignSelf: 'flex-start',
    borderRadius: 999,
  },
  bottomBar: {
    backgroundColor: '#121212',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2A2A2A',
  },
  placeholderScene: {
    height: 0,
  },
});
