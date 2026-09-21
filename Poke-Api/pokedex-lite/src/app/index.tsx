import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View, } from "react-native";
import { usePokemonList } from "../../hooks/usePokemonList";

const HomeScreen = () => {
  const { pokemons, loading, error } = usePokemonList(20);
  const { width } = useWindowDimensions();
  const columnas = width > 600 ? 3 : width > 380 ? 2 : 1;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Ocurrió un error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      key={columnas}
      data={pokemons}
      numColumns={columnas}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Link href={`/pokemon/${item.name}`} asChild>
          <Pressable style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        </Link>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { padding: 12 },
  row: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 3 },
      web: { boxShadow: "0 2px 6px rgba(0,0,0,0.08)" },
    }),
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#222",
  },
});

export default HomeScreen;;

