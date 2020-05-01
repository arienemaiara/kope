import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider } from './src/contexts/auth';
import MainNavigator from './src/navigation/MainNavigator';

const Stack = createStackNavigator();

const App = (props) => {

	const [isLoadingComplete, setLoadingComplete] = React.useState(false);

	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

				// Load fonts
				await Font.loadAsync({
					...Ionicons.font,
					'circular-std': require('./assets/fonts/CircularStd-Book.ttf'),
				});
			} catch (e) {
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hide();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return null;
	} else {
		return (
			<AuthProvider>
				<MainNavigator />
			</AuthProvider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default App;