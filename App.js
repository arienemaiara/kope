import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import './src/config/ReactotronConfig';

import { AuthProvider } from './src/contexts/auth';
import MainNavigator from './src/navigation/MainNavigator';

const App = (props) => {

	const [isLoadingComplete, setLoadingComplete] = React.useState(false);

	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

				// Load fonts
				await Font.loadAsync({
					...Ionicons.font,
					'varela-round': require('./assets/fonts/VarelaRound-Regular.ttf'),
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
				{/* <StatusBar barStyle="dark-content" />
				<SafeAreaView style={{ flex: 1 }}> */}
					<MainNavigator />
				{/* </SafeAreaView> */}
			</AuthProvider>
		)
	}
}

export default App;