import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/bottom_navigation_bar.dart';
import 'package:wastend/utils/shared_prefrance/pref_manager.dart';
import 'package:wastend/widgets/custom_button.dart';
import 'package:wastend/widgets/custom_text_field.dart';
import 'package:wastend/screens/sign_screens/signup_page.dart';

import '../../utils/constants.dart';
import '../../widgets/app_password_input_field.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

TextEditingController userNameCont = TextEditingController();
TextEditingController passCont = TextEditingController();
final _logFormKey = GlobalKey<FormState>();

class _LoginPageState extends State<LoginPage> {
  bool _isLeading = false;
  String userId = '';
  late SharedPreferences sharedPreferences;

  Future<void> login() async {
    setState(() {
      _isLeading = true;
    });
    try {
      final Response<dynamic> res = await Dio().post(
        '$baseUrl/user/login',
        data: {
          'email': userNameCont.text,
          'password': passCont.text,
        },
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      log(res.statusCode.toString());
      if (res.statusCode == 200) {
        log(res.data['userId']);
        userId = res.data['userId'];

        log('userId : $userId');
        PrefManager.setToken(userId);
        setState(() {
          _isLeading = false;
        });
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(
            builder: (builder) => const BottomNavBar(),
          ),
          (route) => false,
        );
      }
    } on DioException catch (e) {
      setState(() {
        _isLeading = false;
      });
      log(e.response!.data['errors'].first['msg'].toString());
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Center(
            child: Text(
              e.response!.data['errors'].first['msg'].toString(),
            ),
          ),
        ),
      );
    }
  }

  bool isShowPassword = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Gap(100),
              Center(child: Image.asset('assets/images/Frame61.png')),
              const Gap(70),
              const Text(
                'Login',
                style: ConstFonts.fontBold,
              ),
              const Text(
                'Enter your Email and password',
                style: TextStyle(color: ConstColors.kGreyColor),
              ),
              const Gap(60),
              Form(
                key: _logFormKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Email',
                      style: ConstFonts.font400,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: CustomTextField(
                        controller: userNameCont,
                        validator: (val) {
                          if (val!.isEmpty) {
                            return 'Please enter your username';
                          }
                          // RegExp regExp = RegExp(r'^[a-zA-Z]+\s[a-zA-Z]+$');
                          // if (!regExp.hasMatch(val)) {
                          //   return 'please enter a valid username';
                          // }
                          return null;
                        },
                        hintText: 'Username',
                      ),
                    ),
                    const Gap(20),
                    const Text(
                      'Password',
                      style: ConstFonts.font400,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: AppPasswordInputField(
                        controller: passCont,
                        validator: (val) {
                          if (val!.isEmpty) {
                            return 'Please enter your password';
                          }
                          if (val.length < 8) {
                            return 'please enter a validPassword';
                          }
                          return null;
                        },
                        hintText: '********************',
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        TextButton(
                          onPressed: () {},
                          child: const Text(
                            'Forget Password?',
                            style: ConstFonts.font400,
                            textAlign: TextAlign.right,
                          ),
                        ),
                      ],
                    ),
                    const Gap(60),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: Visibility(
                        visible: !_isLeading,
                        replacement: const Align(
                          alignment: Alignment.center,
                          child: CircularProgressIndicator(),
                        ),
                        child: CustomButton(
                          onTap: () async {
                            if (_logFormKey.currentState!.validate()) {
                              login();
                            }
                          },
                          buttonText: 'Login',
                          contColor: ConstColors.pkColor,
                          textColor: ConstColors.kWhiteColor,
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                    const Gap(20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          'Don’t have an account?',
                          style: TextStyle(color: ConstColors.kGreyColor),
                        ),
                        TextButton(
                          style: ButtonStyle(
                            elevation: MaterialStateProperty.resolveWith(
                                (states) => 0),
                            padding: MaterialStateProperty.resolveWith(
                                (states) => EdgeInsets.zero),
                          ),
                          onPressed: () {
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                builder: (builder) => const SignUpPage(),
                              ),
                            );
                          },
                          child: const Text(
                            'Sign up',
                            style: TextStyle(
                              color: ConstColors.pkColor,
                              fontWeight: FontWeight.w400,
                              fontSize: 16,
                            ),
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
