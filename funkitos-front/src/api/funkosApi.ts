// src/api/funkosApi.ts

// ⚠️ CAMBIA ESTA IP POR LA IPv4 DE TU PC (ipconfig en CMD)
// Ejemplo: const BASE_URL = "http://192.168.0.15:3000";
const BASE_URL = "http://192.168.1.21:3000";

export interface Funko {
  id: number;
  nombre: string;
  franquicia: string;
  personaje: string;
  precio: number;
  stock: number;
  imagen: string;
}

// GET /api/funkos
export async function getFunkos(): Promise<Funko[]> {
  const response = await fetch(`${BASE_URL}/api/funkos`);

  if (!response.ok) {
    throw new Error("Error al obtener los Funkos");
  }

  const data = await response.json();
  return data as Funko[];
}
