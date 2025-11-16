// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FunkosListScreen from "./src/screens/FunkosListScreen";
import FunkoDetailScreen from "./src/screens/FunkoDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#111" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="FunkosList"
          component={FunkosListScreen}
          options={{ title: "Funkos" }}
        />
        <Stack.Screen
          name="FunkoDetail"
          component={FunkoDetailScreen}
          options={{ title: "Detalle del Funko" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
