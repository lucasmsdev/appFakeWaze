import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleNavigate = () => {
    if (!destination || !location) return;
    navigation.navigate('Route', { destination, origin: location });
  };

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="Você" />
        </MapView>
      )}
      {/* Caixa de input fixada no topo */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Digite o destino"
          value={destination}
          onChangeText={setDestination}
          style={styles.input}
        />
        <Button title="Traçar rota" onPress={handleNavigate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 5,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'column',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
  },
});
