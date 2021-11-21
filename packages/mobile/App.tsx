import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/features/store";
import Navigation from "~Navigation/Navigation";
import { useAppSelector } from "./src/features/hooks";
import TranslucentLoadingOverlay from "~Components/TranslucentLoadingOverlay/TranslucentLoadingOverlay";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
          <Navigation/>
          <TranslucentLoadingOverlay/>
      </Provider>
    </View>
  );
}
