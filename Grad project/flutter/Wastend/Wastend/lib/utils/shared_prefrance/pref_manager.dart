import 'package:shared_preferences/shared_preferences.dart';

import 'pref_manager_constants.dart';

class PrefManager {
  static SharedPreferences? prefs;

  static Future setupSharedPreferences() async {
    prefs = await SharedPreferences.getInstance();
  }

  static void clearSharedPreferences() async {
    await prefs?.clear();
  }

  static void setLastForceUpdateMilliSeconds(int milliSeconds) {
    prefs?.setInt(
        PrefManagerConstants.lastForceUpdateMilliSecondsKey, milliSeconds);
  }

  static int getLastForceUpdateMilliSeconds() {
    return prefs?.getInt(PrefManagerConstants.lastForceUpdateMilliSecondsKey) ??
        0;
  }

  static void setString(String data, String key) async {
    await prefs?.setString(key, data);
  }

  static String getStringWithKey(String key) {
    return prefs?.getString(key) ?? '';
  }

  static void setLang(String lang) {
    prefs?.setString(PrefManagerConstants.langKey, lang);
  }

  static void setIsFirstTime(bool isLunched) {
    prefs?.setBool(PrefManagerConstants.firstLaunchKey, isLunched);
  }

  static bool? getFirstTimeLunch() {
    return prefs?.getBool(PrefManagerConstants.firstLaunchKey) ?? false;
  }

  static void setToken(String token) {
    prefs?.setString(PrefManagerConstants.tokenKey, token);
  }

  static String? getToken() {
    return prefs?.getString(PrefManagerConstants.tokenKey);
  }

  static String getLang() {
    return prefs?.getString(PrefManagerConstants.langKey) ?? 'en';
  }

  static bool isArabic() {
    return getLang() == 'ar';
  }

  static void setAppNeedUpdate(bool isAppNeedUpdate) {
    prefs?.setBool(PrefManagerConstants.appNeedUpdateKey, isAppNeedUpdate);
  }

  static bool isAppNeedUpdate() {
    return prefs?.getBool(PrefManagerConstants.appNeedUpdateKey) ?? false;
  }

  static void setAppOldVersion(String appOldVersion) {
    prefs?.setString(PrefManagerConstants.appOldVersionKey, appOldVersion);
  }

  static String getAppOldVersion() {
    return prefs?.getString(PrefManagerConstants.appOldVersionKey) ?? "";
  }

  static Future<void> saveLoginCredentials(
      String username, String password) async {
    await prefs?.setString(PrefManagerConstants.keyUsername, username);
    await prefs?.setString(PrefManagerConstants.keyPassword, password);
  }

  // Get saved login credentials
  static Map<String, String?> getLoginCredentials() {
    String? username = prefs?.getString(PrefManagerConstants.keyUsername);
    String? password = prefs?.getString(PrefManagerConstants.keyPassword);
    return {"username": username, "password": password};
  }

  static Future<void> clearAllPreferencesExcept(
      List<String> keysToRetain) async {
    Set<String>? keys = prefs?.getKeys();
    for (String key in keys!) {
      if (!keysToRetain.contains(key)) {
        await prefs!.remove(key);
      }
    }
  }
}
