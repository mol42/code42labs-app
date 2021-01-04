import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type ApiResponse = {
  name : string
};

export default function App() {
  const resp : ApiResponse = {
    name: "tayfun"
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app 123!</Text>
      <Button title={resp.name} onPress={() => {}}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
