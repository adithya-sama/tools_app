import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BudgetStatus from "./BudgetStatus";
import BudgetSettings from "./BudgetSettings";

const Tab = createBottomTabNavigator();

function BudgetScreen(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: { fontSize: 20 },
        tabBarIconStyle: { display: "none" },
      }}
      sceneContainerStyle={{ padding: 20 }}
    >
      <Tab.Screen name="Status" component={BudgetStatus} />
      <Tab.Screen name="Settings" component={BudgetSettings} />
    </Tab.Navigator>
  );
}

export default BudgetScreen;
