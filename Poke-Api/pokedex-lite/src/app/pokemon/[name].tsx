import { useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    Image, StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { usePokemonDetail } from "../../../hooks/usePokemonDetail";


const typeColors: Record<string, string> = {
  normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C",
  grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1",
  ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A",
  rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", dark: "#705746",
  steel: "#B7B7CE", fairy: "#D685AD",
};

const PokemonDetailScreen = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { pokemon, loading, error } = usePokemonDetail(name);
  const { width } = useWindowDimensions();
  const tamañoImagen = width > 600 ? 220 : 150;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text>No se pudo cargar el Pokémon.</Text>
      </View>
    );
  }

  return (
  <View style={styles.container}>
    <View style={styles.card}>
      {pokemon.sprites.front_default && (
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={{ width: tamañoImagen, height: tamañoImagen }}
        />
      )}
      <Text style={styles.title}>{pokemon.name}</Text>

      <View style={styles.typesRow}>
        {pokemon.types.map((t) => (
          <View
            key={t.type.name}
            style={[
              styles.badge,
              { backgroundColor: typeColors[t.type.name] ?? "#999" },
            ]}
          >
            <Text style={styles.badgeText}>{t.type.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Altura: {pokemon.height}</Text>
        <Text style={styles.infoText}>Peso: {pokemon.weight}</Text>
      </View>

      <View style={styles.stats}>
        {pokemon.stats.map((s) => (
          <View key={s.stat.name} style={styles.statRow}>
            <Text style={styles.statLabel}>{s.stat.name}</Text>
            <View style={styles.statBarBackground}>
              <View
                style={[
                  styles.statBarFill,
                  { width: `${(Math.min(s.base_stat, 150) / 150) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.statValue}>{s.base_stat}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);
};
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f7",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 8,
  },
  typesRow: { flexDirection: "row", gap: 8, marginVertical: 12 },
  badge: { paddingVertical: 4, paddingHorizontal: 14, borderRadius: 20 },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
    fontSize: 12,
  },
  infoRow: { flexDirection: "row", gap: 32, marginBottom: 16 },
  infoText: { color: "#555", fontSize: 14 },
  stats: { width: "100%", marginTop: 8 },
  statRow: { flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 8 },
  statLabel: {
    width: 72,
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
  },
  statBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
  },
  statBarFill: { height: 8, backgroundColor: "#4c9aff", borderRadius: 4 },
  statValue: { width: 30, textAlign: "right", fontSize: 12, fontWeight: "600" },
});

export default PokemonDetailScreen;