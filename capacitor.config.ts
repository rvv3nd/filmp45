import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.film.app',
  appName: 'FILM 45 - Feria Internacional del Libro Palacio de Mineria',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    "cleartext": true // Esto permite que se carguen recursos http en android, SOLO PARA ENTORNO DE DESARROLLO
  },
  android: {
    //TODO: Cambiar a false para produccion y asegurarse de que couchd tenga https habilitado
    "allowMixedContent": true // Esto permite que se carguen recursos http en android, SOLO PARA ENTORNO DE DESARROLLO
  }
};

export default config;
