import 'package:easy_splash_screen/easy_splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/bottom_navigation_bar.dart';
import 'package:wastend/screens/pages_view/page_view.dart';
import 'package:wastend/utils/shared_prefrance/pref_manager.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ConstColors.pkColor,
      body: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 60.0),
            child: EasySplashScreen(
              logo: Image.asset(
                'assets/images/dish1.png',
              ),
              logoWidth: 50,
              backgroundColor: ConstColors.pkColor,
              showLoader: false,
              navigator: PrefManager.getToken() != null
                  ? const BottomNavBar()
                  : const PageViewScreen(),
              durationInSeconds: 6,
            ),
          ),
          const Center(
            child: Padding(
              padding: EdgeInsets.only(bottom: 60.0, right: 50),
              child: Text(
                'Wastend',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: ConstColors.kWhiteColor,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
