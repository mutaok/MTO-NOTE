# Add project specific ProGuard rules here.

# Keep Expo modules
-keep class expo.** { *; }
-dontwarn expo.**

# Keep React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }

# Keep model classes for serialization
-keep class com.noteflow.mobile.model.** { *; }

# Remove logging in release builds
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}
