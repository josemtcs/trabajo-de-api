import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FunkosListScreen from "../../src/api/screens/FunkosListScreen";
import FunkoDetailScreen from "../../src/api/screens/FunkoDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="FunkosList" component={FunkosListScreen} options={{ title: "Funkos" }} />
        <Stack.Screen name="FunkoDetail" component={FunkoDetailScreen} options={{ title: "Detalle" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
