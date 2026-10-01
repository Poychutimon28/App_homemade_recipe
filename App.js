import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ExploreScreen from './screens/ExploreScreen';
import DetailScreen from './screens/DetailScreen';
import RandomScreen from './screens/RandomScreen';
import CalorieScreen from './screens/CalorieScreen';
import { COLORS } from './styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ตั้งค่า Header ให้เหมือนกันทุกหน้า
const screenHeader = {
  headerStyle: { backgroundColor: COLORS.primary },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
};

// Stack ซ้อนอยู่ใน Tab 1 : Explore -> Detail
function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={screenHeader}>
      <Stack.Screen
        name="ExploreHome"
        component={ExploreScreen}
        options={{ title: 'เมนูแนะนำ' }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params?.recipe?.name ?? 'วิธีทำ' })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.subText,
          tabBarStyle: { backgroundColor: '#fff', height: 60, paddingBottom: 8 },
          tabBarIcon: ({ color, size }) => {
            let icon = 'restaurant';
            if (route.name === 'Random') icon = 'dice';
            if (route.name === 'Calorie') icon = 'calculator';
            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Explore" component={ExploreStack} options={{ title: 'เมนูแนะนำ' }} />
        <Tab.Screen name="Random" component={RandomScreen} options={{ title: 'สุ่มเมนู' }} />
        <Tab.Screen name="Calorie" component={CalorieScreen} options={{ title: 'คำนวณแคล' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}