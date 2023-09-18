import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainView from './components/MainView';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Fill in the missing word</Text>
      <MainView />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tan',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
