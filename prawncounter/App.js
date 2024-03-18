import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/providers/AuthProvider';
import Navigation from './src/navigation';

export default function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <StatusBar />
    </>
    // <View style={styles.container}>
    //   <Text></Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
