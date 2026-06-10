import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Auth Screens
import { WelcomeScreen } from '../screens/Auth/WellcomeScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { UserTypeScreen } from '../screens/Auth/UserTypeScreen';

// Tourist Screens
import { TouristHomeScreen } from '../screens/App/TouristHomeScreen';
import { TouristExploreScreen } from '../screens/App/TouristExploreScreen';
import { TouristReservationsScreen } from '../screens/App/TouristReservationScreen';
import { EventDetailScreen } from '../screens/App/EventDetailScreen';
import { ServiceDetailScreen } from '../screens/App/ServiceDetailScreen';
import { ProfileScreen } from '../screens/App/ProfileScreen';

// Business Screens
import { BusinessDashboardScreen } from '../screens/Business/BusinessDashboardScreen';
import { ManageReviewsScreen } from '../screens/Business/ManageReviewScreen';

// Admin Screens
import { AdminDashboardScreen } from '../screens/Admin/AdminDashboardScreen';

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#121212' },
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserType" component={UserTypeScreen} />

        {/* Tourist Screens */}
        <Stack.Screen name="TouristHome" component={TouristHomeScreen} />
        <Stack.Screen name="TouristExplore" component={TouristExploreScreen} />
        <Stack.Screen name="TouristReservations" component={TouristReservationsScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />

        {/* Business Screens */}
        <Stack.Screen name="BusinessDashboard" component={BusinessDashboardScreen} />
        <Stack.Screen name="ManageReviews" component={ManageReviewsScreen} />

        {/* Admin Screens */}
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}