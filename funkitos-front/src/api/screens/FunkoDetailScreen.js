import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function FunkoDetailScreen({ route }) {
  const { id } = route.params;
  const [funko, setFunko] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      const response = await fetch(`http://192.168.1.21:3000/api/funkos/${id}`);
      const data = await response.json();
      setFunko(data);
      setLoading(false);
    }
    cargar();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: funko.imagen }} style={styles.image} />
      <Text style={styles.title}>{funko.nombre}</Text>
      <Text style={styles.text}>Franquicia: {funko.franquicia}</Text>
      <Text style={styles.text}>Personaje: {funko.personaje}</Text>
      <Text style={styles.text}>Stock: {funko.stock}</Text>
      <Text style={styles.price}>${funko.precio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
    alignItems: "center",
  },
  center: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#ccc", marginTop: 8 },
  title: { color: "#fff", fontSize: 26, marginTop: 10, fontWeight: "bold" },
  price: { color: "#4ea3ff", fontSize: 20, marginTop: 10 },
  image: {
    width: 260,
    height: 260,
    borderRadius: 10,
  },
});

