import 'package:flutter/material.dart';
import 'package:wastend/screens/pages_view/splash_screen.dart';
import 'package:wastend/utils/shared_prefrance/pref_manager.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await PrefManager.setupSharedPreferences();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Wastend',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
      ),
      home: const SplashScreen(),
    );
  }
}
