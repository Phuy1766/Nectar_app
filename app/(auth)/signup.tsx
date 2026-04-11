import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupScreen() {
  const [username, setUsername] = useState('Afsar Hossen Shuvo');
  const [email, setEmail] = useState('imshuvo97@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const isEmailValid = email.includes('@') && email.includes('.');

  const handleSignup = async () => {
    if (!username.trim() || !isEmailValid || !password.trim()) {
      Alert.alert('Missing info', 'Please fill all fields with a valid email');
      return;
    }
    try {
      setSubmitting(true);
      await login(email.trim(), password);
      router.replace('/(tabs)');
    } catch (err) {
      Alert.alert('Signup failed', 'Please try again');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.carrot}>🥕</Text>

          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue</Text>

          {/* Username */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={Colors.gray}
            />
            <View style={styles.divider} />
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={Colors.gray}
              />
              {isEmailValid && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </View>
            <View style={styles.divider} />
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                placeholderTextColor={Colors.gray}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons
                  name={showPass ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color={Colors.gray}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
          </View>

          <Text style={styles.terms}>
            By continuing you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text>
            {'\n'}and <Text style={styles.link}>Privacy Policy</Text>.
          </Text>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.signupText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginRow}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.loginLabel}>Already have an account? </Text>
            <Text style={[styles.loginLabel, { color: Colors.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  carrot: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.gray,
    marginBottom: 40,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: Colors.black,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginTop: 8,
  },
  terms: {
    fontSize: 13,
    color: Colors.gray,
    lineHeight: 20,
    marginBottom: 32,
  },
  link: {
    color: Colors.primary,
  },
  signupButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  signupText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLabel: {
    fontSize: 14,
    color: Colors.gray,
  },
});
