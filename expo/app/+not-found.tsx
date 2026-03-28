import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { TorreParkColors } from "@/constants/colors";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Página no encontrada" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Esta página no existe</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Volver al inicio</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: TorreParkColors.lightBg,
  },
  title: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: TorreParkColors.navy,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: TorreParkColors.primary,
    fontWeight: "600" as const,
  },
});
