import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wastend/screens/profile_screens/delete_account.dart';
import 'package:wastend/screens/sign_screens/login_page.dart';
import 'package:wastend/utils/shared_prefrance/pref_manager.dart';

class LogoutScreen extends StatelessWidget {
  const LogoutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    Future<void> logOut() async {
      SharedPreferences cardId = await SharedPreferences.getInstance();
      PrefManager.clearSharedPreferences();
      cardId.remove('cardId');
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (builder) => const LoginPage(),
          ),
          (Route<dynamic> route) => false);
    }

    return Scaffold(
      appBar: AppBar(),
      body: CustomDeleteLogout(
        onTap: () {
          logOut();
        },
        title:
            'We’re sad to see you go, there are still so many meals out there to save!',
        subTitle:
            'If you still want to say goodbye, tap the button below and we’ll delete your account.',
        btnText: 'Logout',
      ),
    );
  }
}
