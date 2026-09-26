import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Inicio from './Inicio';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <View style={styles.app}>
          <Inicio />
          <StatusBar style="light" />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
