import { StyleSheet } from 'react-native';

// ชุดสีกลางของแอป (เปลี่ยนที่นี่ที่เดียว เปลี่ยนทั้งแอป)
export const COLORS = {
  primary: '#FF7043',     // ส้มอบอุ่นแบบครัว
  secondary: '#6D4C41',   // น้ำตาลกาแฟ
  bg: '#FFF8F2',
  card: '#FFFFFF',
  text: '#3E2723',
  subText: '#8D6E63',
  border: '#F0E0D6',
  success: '#66BB6A',
};

export const SIZES = {
  radius: 16,
  padding: 16,
  h1: 24,
  h2: 18,
  body: 15,
  small: 13,
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  
  container: {
    padding: SIZES.padding,
  },

  h1: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },

  h2: {
    fontSize: SIZES.h2,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },

  body: {
    fontSize: SIZES.body,
    color: COLORS.subText,
    lineHeight: 22,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
    // เงาแบบ cross-platform
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardImage: {
    width: '100%',
    height: 160,
  },

  cardBody: {
    padding: SIZES.padding,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: 12,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.bg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
  },

  badgeText: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
});