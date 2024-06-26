import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/utils/shared_prefrance/pref_manager.dart';
import 'package:wastend/widgets/custom_button.dart';

import '../../utils/constants.dart';
import '../../widgets/app_password_input_field.dart';

class ChangePassword extends StatefulWidget {
  const ChangePassword({super.key});

  @override
  State<ChangePassword> createState() => _ChangePasswordState();
}

final newPass = TextEditingController();
final confirmPass = TextEditingController();

class _ChangePasswordState extends State<ChangePassword> {
  String? uId;
  Future<void> changePassword() async {
    uId = PrefManager.getToken();

    try {
      final Response<dynamic> res = await Dio().put(
        "$baseUrl/user/change-password/$uId",
        data: {'newPassword': newPass.text},
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log('pass changed');

        // Handle Succes State -> save user id and navigate
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Center(
              child: Text(
                'Password changed',
              ),
            ),
          ),
        );
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  // @override
  // void dispose() {
  //   newPass.dispose();
  //   confirmPass.dispose();
  //   super.dispose();
  // }
  bool isShowPassword = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('change password'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const Divider(color: ConstColors.kDarkGrey),
            const Gap(40),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Form(
                  child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'New password',
                    style: ConstFonts.font400,
                  ),
                  const Gap(7),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6.0),
                    child: AppPasswordInputField(
                      controller: newPass,
                      hintText: '   ***********',
                    ),
                  ),
                  const Gap(30),
                  const Text(
                    'Confirm password',
                    style: ConstFonts.font400,
                  ),
                  const Gap(7),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: AppPasswordInputField(
                      controller: confirmPass,
                      hintText: '   ***********',
                    ),
                  ),
                  const Gap(300),
                  Padding(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                    child: CustomButton(
                      onTap: () {
                        if (newPass.text.length == confirmPass.text.length &&
                            newPass.text == confirmPass.text) {
                          changePassword();
                          newPass.clear();
                          confirmPass.clear();
                        } else {
                          ScaffoldMessenger.of(context)
                              .showSnackBar(const SnackBar(
                                  clipBehavior: Clip.hardEdge,
                                  backgroundColor: ConstColors.kGreyColor,
                                  showCloseIcon: true,
                                  // behavior: SnackBarBehavior.fixed,
                                  content: Center(
                                    child: Text(
                                      "password don't match",
                                      style: TextStyle(color: Colors.red),
                                    ),
                                  )));
                        }
                      },
                      buttonText: 'Save',
                      contColor: ConstColors.pkColor,
                      textColor: ConstColors.kWhiteColor,
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ],
              )),
            )
          ],
        ),
      ),
    );
  }
}
