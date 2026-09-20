// Expo Configuration for NoteFlow - Mobile Only App
import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "NoteFlow",
  slug: "noteflow-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "noteflow",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.noteflow.mobile",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    }
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.noteflow.mobile",
    permissions: ["POST_NOTIFICATIONS"],
    minSdkVersion: 24,
    targetSdkVersion: 34,
  },
  web: undefined,
  plugins: [
    "expo-router",
    [
      "expo-notifications",
      {
        icon: "./assets/images/notification-icon.png",
        color: "#0a7ea4",
        sounds: []
      }
    ],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      }
    ],
    [
      "expo-build-properties",
      {
        android: {
          buildArchs: ["arm64-v8a"],
          minSdkVersion: 24,
          targetSdkVersion: 34,
        },
      }
    ]
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    privacyPolicyUrl: "https://example.com/privacy",
    termsOfServiceUrl: "https://example.com/terms"
  }
};

export default config;
