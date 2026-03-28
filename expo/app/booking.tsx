import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TorreParkColors } from '@/constants/colors';
import { Calendar, Clock, User, Mail, Phone, Users } from 'lucide-react-native';
import { BookingData, TimeSlot } from '@/types/booking';
import * as Haptics from 'expo-haptics';
import { trpc } from '@/lib/trpc';

const TIME_SLOTS: TimeSlot[] = [
  { value: '10:00', label: '10:00', available: true },
  { value: '11:00', label: '11:00', available: true },
  { value: '12:00', label: '12:00', available: true },
  { value: '13:00', label: '13:00', available: true },
  { value: '16:00', label: '16:00', available: true },
  { value: '17:00', label: '17:00', available: true },
  { value: '18:00', label: '18:00', available: true },
  { value: '19:00', label: '19:00', available: true },
];

export default function BookingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [numberOfChildren, setNumberOfChildren] = useState<string>('');
  const [childrenAges, setChildrenAges] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const sendConfirmationMutation = trpc.bookings.sendConfirmation.useMutation();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeSelect = (time: string) => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    setSelectedTime(time);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const validateForm = (): boolean => {
    if (!selectedTime) {
      Alert.alert('Error', 'Por favor selecciona una hora');
      return false;
    }
    if (!customerName.trim()) {
      Alert.alert('Error', 'Por favor introduce tu nombre');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Por favor introduce un email válido');
      return false;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Por favor introduce tu teléfono');
      return false;
    }
    if (!numberOfChildren.trim() || parseInt(numberOfChildren) < 1) {
      Alert.alert('Error', 'Por favor introduce el número de niños');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const booking: BookingData = {
      id: Date.now().toString(),
      date: formatDate(date),
      time: selectedTime,
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      numberOfChildren: parseInt(numberOfChildren),
      childrenAges: childrenAges.trim(),
      specialRequests: specialRequests.trim(),
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);

    try {
      const existingBookings = await AsyncStorage.getItem('bookings');
      const bookings: BookingData[] = existingBookings ? JSON.parse(existingBookings) : [];
      bookings.push(booking);
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));

      console.log('Sending confirmation email via MailerSend...');
      await sendConfirmationMutation.mutateAsync({
        customerName: booking.customerName,
        email: booking.email,
        date: booking.date,
        time: booking.time,
        numberOfChildren: booking.numberOfChildren,
        childrenAges: booking.childrenAges,
        phone: booking.phone,
        specialRequests: booking.specialRequests,
      });

      console.log('Email sent successfully!');

      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      router.push({
        pathname: '/confirmation' as any,
        params: {
          bookingId: booking.id,
          date: booking.date,
          time: booking.time,
          name: booking.customerName,
        },
      });
    } catch (error) {
      console.error('Error saving booking or sending email:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al procesar tu reserva. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar color={TorreParkColors.primary} size={24} />
            <Text style={styles.sectionTitle}>Fecha de la visita</Text>
          </View>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
              locale="es-ES"
            />
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock color={TorreParkColors.blue} size={24} />
            <Text style={styles.sectionTitle}>Hora de llegada</Text>
          </View>
          <View style={styles.timeSlots}>
            {TIME_SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot.value}
                style={[
                  styles.timeSlot,
                  selectedTime === slot.value && styles.timeSlotSelected,
                  !slot.available && styles.timeSlotDisabled,
                ]}
                onPress={() => slot.available && handleTimeSelect(slot.value)}
                activeOpacity={0.7}
                disabled={!slot.available}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === slot.value && styles.timeSlotTextSelected,
                    !slot.available && styles.timeSlotTextDisabled,
                  ]}
                >
                  {slot.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User color={TorreParkColors.green} size={24} />
            <Text style={styles.sectionTitle}>Tus datos</Text>
          </View>

          <View style={styles.inputContainer}>
            <User color="#687076" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#99A1A9"
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail color="#687076" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#99A1A9"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Phone color="#687076" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="#99A1A9"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Users color="#687076" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Número de niños"
              placeholderTextColor="#99A1A9"
              value={numberOfChildren}
              onChangeText={setNumberOfChildren}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Users color="#687076" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Edades (ej: 5, 7, 9)"
              placeholderTextColor="#99A1A9"
              value={childrenAges}
              onChangeText={setChildrenAges}
            />
          </View>

          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Peticiones especiales (opcional)"
              placeholderTextColor="#99A1A9"
              value={specialRequests}
              onChangeText={setSpecialRequests}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={TorreParkColors.white} size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Confirmar Reserva</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TorreParkColors.lightBg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: TorreParkColors.navy,
  },
  dateButton: {
    backgroundColor: TorreParkColors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dateButtonText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: TorreParkColors.navy,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    backgroundColor: TorreParkColors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  timeSlotSelected: {
    backgroundColor: TorreParkColors.primary,
    borderColor: TorreParkColors.primary,
  },
  timeSlotDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.5,
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: TorreParkColors.navy,
  },
  timeSlotTextSelected: {
    color: TorreParkColors.white,
  },
  timeSlotTextDisabled: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TorreParkColors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: TorreParkColors.navy,
    paddingVertical: 16,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: TorreParkColors.white,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  submitButton: {
    backgroundColor: TorreParkColors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: TorreParkColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: TorreParkColors.white,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
});
