import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getFunkos } from "../funkosApi";

export default function FunkosListScreen({ navigation }) {
  const [funkos, setFunkos] = useState([]);
  const [filteredFunkos, setFilteredFunkos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [selectedFranquicia, setSelectedFranquicia] = useState("Todos");

  // Cargar datos
  useEffect(() => {
    async function cargarFunkos() {
      try {
        const data = await getFunkos();
        setFunkos(data);
        setFilteredFunkos(data);
      } catch (err) {
        console.log(err);
        setError("No se pudieron cargar los Funkos");
      } finally {
        setLoading(false);
      }
    }

    cargarFunkos();
  }, []);

  // Generar lista de franquicias
  const franquicias = useMemo(() => {
    const setFranq = new Set();
    funkos.forEach((f) => f.franquicia && setFranq.add(f.franquicia));
    return ["Todos", ...Array.from(setFranq)];
  }, [funkos]);

  // Filtrar cuando cambia texto o franquicia
  useEffect(() => {
    let resultados = [...funkos];

    if (selectedFranquicia !== "Todos") {
      resultados = resultados.filter(
        (f) => f.franquicia === selectedFranquicia
      );
    }

    if (searchText.trim() !== "") {
      resultados = resultados.filter((f) =>
        f.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredFunkos(resultados);
  }, [searchText, selectedFranquicia, funkos]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Cargando Funkos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("FunkoDetail", { id: item.id })} // 👈 Navegación al detalle
    >
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <Text style={styles.name}>{item.nombre}</Text>
      <Text style={styles.text}>Franquicia: {item.franquicia}</Text>
      <Text style={styles.price}>${item.precio}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Funkos Pop</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor="#777"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {franquicias.map((franq) => (
          <TouchableOpacity
            key={franq}
            style={[
              styles.filterChip,
              selectedFranquicia === franq && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFranquicia(franq)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFranquicia === franq && styles.filterTextActive,
              ]}
            >
              {franq}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredFunkos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  center: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    marginBottom: 10,
  },
  filtersContainer: {
    marginVertical: 10,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#555",
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: "#4ea3ff",
    borderColor: "#4ea3ff",
  },
  filterText: {
    color: "#ccc",
  },
  filterTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    marginTop: 8,
    fontWeight: "bold",
  },
  price: {
    marginTop: 5,
    color: "#4ea3ff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
