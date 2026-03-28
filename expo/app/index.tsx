import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';
import { Calendar, Clock, Users, Phone } from 'lucide-react-native';
import { TorreParkColors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBooking = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push('/booking' as any);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[TorreParkColors.navy, '#2A3F5F', TorreParkColors.navy]}
        style={styles.gradient}
      >
        <View style={styles.safeArea}>
          <ScrollView 
            contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }]}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/tsx2dzh3zbpj6y120ngqt' }}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              
              <Text style={styles.subtitle}>¡Diversión sin límites para tus pequeños!</Text>
            </View>

            <View style={styles.infoCards}>
              <View style={styles.infoCard}>
                <View style={[styles.iconCircle, { backgroundColor: TorreParkColors.primary }]}>
                  <Calendar color={TorreParkColors.white} size={24} />
                </View>
                <Text style={styles.infoTitle}>Reserva Fácil</Text>
                <Text style={styles.infoText}>Elige tu fecha favorita</Text>
              </View>

              <View style={styles.infoCard}>
                <View style={[styles.iconCircle, { backgroundColor: TorreParkColors.blue }]}>
                  <Clock color={TorreParkColors.white} size={24} />
                </View>
                <Text style={styles.infoTitle}>Tu Horario</Text>
                <Text style={styles.infoText}>Selecciona la mejor hora</Text>
              </View>

              <View style={styles.infoCard}>
                <View style={[styles.iconCircle, { backgroundColor: TorreParkColors.green }]}>
                  <Users color={TorreParkColors.white} size={24} />
                </View>
                <Text style={styles.infoTitle}>Para Todos</Text>
                <Text style={styles.infoText}>Grupos y fiestas</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.bookButton}
              onPress={handleBooking}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[TorreParkColors.primary, '#FF8F5C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.bookButtonText}>Reservar Ahora</Text>
                <Calendar color={TorreParkColors.white} size={24} />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.contactCard}>
              <Phone color={TorreParkColors.primary} size={28} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>¿Necesitas ayuda?</Text>
                <Text style={styles.contactText}>Llámanos y te atenderemos</Text>
              </View>
            </View>
          </ScrollView>
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
  safeScrollArea: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    backgroundColor: TorreParkColors.white,
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: width * 0.7,
    height: width * 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: TorreParkColors.white,
    textAlign: 'center',
    fontWeight: '600' as const,
    paddingHorizontal: 20,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: TorreParkColors.white,
    marginBottom: 4,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  bookButton: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: TorreParkColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    gap: 12,
  },
  bookButtonText: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: TorreParkColors.white,
  },
  contactCard: {
    backgroundColor: TorreParkColors.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: TorreParkColors.navy,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: '#687076',
  },
});
