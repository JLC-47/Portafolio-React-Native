import { Text, View, StyleSheet } from "react-native";

const HomeScreen = () => {
  const { pokemons, loading, error } = usePokemonList(20);
  const { width } = useWindowDiensions();
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
        <Text>Ocurrio un error: {error}</Text>
      </View>
    );
  }

  return (
    <FlaList
    key={columnas}
    data={pokemons}
    numColumns=
  );

};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  
});

