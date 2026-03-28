import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle, Calendar, Clock, User, Home } from 'lucide-react-native';
import { TorreParkColors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function ConfirmationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    bookingId: string;
    date: string;
    time: string;
    name: string;
  }>();

  const handleGoHome = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.replace('/' as any);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[TorreParkColors.navy, '#2A3F5F']}
        style={styles.gradient}
      >
        <View style={styles.safeArea}>
          <View style={[styles.content, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.successIcon}>
              <CheckCircle color={TorreParkColors.green} size={80} strokeWidth={2} />
            </View>

            <Text style={styles.title}>¡Reserva Confirmada!</Text>
            <Text style={styles.subtitle}>
              Hemos recibido tu reserva correctamente
            </Text>

            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <User color={TorreParkColors.primary} size={24} />
                </View>
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Nombre</Text>
                  <Text style={styles.detailValue}>{params.name}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Calendar color={TorreParkColors.blue} size={24} />
                </View>
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Fecha</Text>
                  <Text style={styles.detailValue}>{params.date}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Clock color={TorreParkColors.green} size={24} />
                </View>
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Hora</Text>
                  <Text style={styles.detailValue}>{params.time}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Te hemos enviado un email de confirmación con todos los detalles de tu reserva.
              </Text>
              <Text style={styles.infoTextBold}>
                ¡Nos vemos pronto en TorrePark! 🎉
              </Text>
            </View>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={handleGoHome}
              activeOpacity={0.8}
            >
              <Home color={TorreParkColors.white} size={24} />
              <Text style={styles.homeButtonText}>Volver al Inicio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: TorreParkColors.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  detailsCard: {
    backgroundColor: TorreParkColors.white,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: TorreParkColors.lightBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: TorreParkColors.navy,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  infoTextBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: TorreParkColors.white,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: TorreParkColors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: TorreParkColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: TorreParkColors.white,
  },
});
