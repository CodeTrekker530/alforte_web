import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const isWeb = Platform.OS === 'web';
const screenWidth = Dimensions.get('window').width;

const steps = [
  { title: 'Step 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit felis. Maecenas vel fermentum tellus. Donec a volutpat ante, id mattis' },
  { title: 'Step 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit felis. Maecenas vel fermentum tellus. Donec a volutpat ante, id mattis' },
  { title: 'Step 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit felis. Maecenas vel fermentum tellus. Donec a volutpat ante, id mattis' },
  { title: 'Step 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit felis. Maecenas vel fermentum tellus. Donec a volutpat ante, id mattis' },
];

export default function Home() {
const router = useRouter();
  return (
    <View style={styles.page}>
      {/* HEADER (Blue Hub) */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')} // Replace with your actual logo file path
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>PathSmart</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="What are you looking for?"
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
        <TouchableOpacity onPress={() => router.push('/Search')}>
            <Feather name="search" size={18} color="#888" style={styles.searchIcon} />
        </TouchableOpacity>
        </View>
      </View>

      {/* HOW IT WORKS */}
      <View style={styles.container}>
        <Text style={styles.title}>How does it Work?</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit felis.
          Maecenas vel fermentum tellus. Donec a volutpat ante, id mattis neque. Nulla
          suscipit scelerisque egestas. Curabitur malesuada lobortis purus.
        </Text>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={styles.iconCircle}>
                <FontAwesome name="wrench" size={24} color="white" />
              </View>
              {index !== 0 && <View style={styles.line} />}
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    flex: 1,
  },
    logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    },
  logo: {
    width: 32,
    height: 32,
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
header: {
  backgroundColor: '#0B72B9',
  paddingHorizontal: 24,
  paddingVertical: 16,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap', 
  
},

searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 6,
  paddingHorizontal: 8,
  paddingVertical: 6,
  width: '100%',
  maxWidth: 600, 
  marginRight:440,
},
  searchInput: {
    flex: 1,
    paddingVertical: 4,
    fontSize: 14,
  },
  searchIcon: {
    marginLeft: 8,
  },

  container: {
    paddingHorizontal: isWeb ? 40 : 20,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 800,
    marginBottom: 32,
    color: '#333',
  },
  stepsContainer: {
    flexDirection: isWeb ? 'row' : 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20,
  },
  stepItem: {
    width: isWeb ? '22%' : '100%',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 20,
  },
  iconCircle: {
    backgroundColor: '#1976D2',
    borderRadius: 999,
    padding: 16,
    marginBottom: 10,
    zIndex: 1,
  },
  line: {
    position: 'absolute',
    top: 28,
    left: '-60%',
    width: '120%',
    height: 2,
    backgroundColor: '#ccc',
    zIndex: 0,
  },
  stepTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 6,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 13,
    textAlign: 'center',
    color: '#444',
  },
});
