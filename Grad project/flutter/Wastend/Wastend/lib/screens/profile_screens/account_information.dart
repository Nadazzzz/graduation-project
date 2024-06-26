import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/sign_screens/login_page.dart';
import 'package:wastend/widgets/custom_button.dart';

import '../../utils/constants.dart';
import '../../utils/shared_prefrance/pref_manager.dart';
import '../../widgets/custom_text_field.dart';

class AccountInformation extends StatefulWidget {
  const AccountInformation(
      {super.key, required this.userInfo, required this.uId});

  final Map<String, dynamic> userInfo;
  final String uId;
  @override
  State<AccountInformation> createState() => _AccountInformationState();
}

TextEditingController nameCont = TextEditingController();
TextEditingController emailCont = TextEditingController();
TextEditingController phoneCont = TextEditingController();
final profileKey = GlobalKey<FormState>();
// TextEditingController country = TextEditingController();

class _AccountInformationState extends State<AccountInformation> {
  Future<void> deleteUser() async {
    try {
      final Response<dynamic> res = await Dio().delete(
        "$baseUrl/user/${PrefManager.getToken()}",
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log('user deleted');
        // Handle Succes State -> save user id and navigate

        Navigator.push(context,
            MaterialPageRoute(builder: (builder) => const LoginPage()));
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  Future<void> updateProfile() async {
    try {
      Map<String, dynamic> reqData = {
        "name": nameCont.text,
        "email": emailCont.text,
        "phone": phoneCont.text,
        "longitude": 123.456,
        "latitude": 78.901,
      };
      final Response<dynamic> res = await Dio().put(
        "$baseUrl/user/update-profile/${PrefManager.getToken()}",
        data: reqData,
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log('Successfuly updated');
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Center(
              child: Text('Changes Updated Successfuly'),
            ),
          ),
        );
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  @override
  void dispose() {
    nameCont.clear();
    emailCont.clear();
    phoneCont.clear();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // final Map<String, dynamic> userInfo = {};

    return Scaffold(
      appBar: AppBar(
        title: const Text('Account Information'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            children: [
              Form(
                key: profileKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'username',
                      style: ConstFonts.font400,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: CustomTextField(
                        controller: nameCont,
                        hintText: widget.userInfo['username'],
                        maxLines: 1,
                        validator: (val) {
                          if (val!.isEmpty) {
                            return 'Please enter your name';
                          }
                          return null;
                        },
                      ),
                    ),
                    const Gap(15),
                    const Text(
                      'Email',
                      style: ConstFonts.font400,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: CustomTextField(
                        controller: emailCont,
                        hintText: widget.userInfo['email'],
                        validator: (val) {
                          if (val!.isEmpty) {
                            return 'Please enter your name';
                          }
                          return null;
                        },
                      ),
                    ),
                    const Gap(15),
                    const Text(
                      'Mobile Number',
                      style: ConstFonts.font400,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: CustomTextField(
                        controller: phoneCont,
                        hintText: widget.userInfo['phone'].toString(),
                        validator: (val) {
                          if (val!.isEmpty) {
                            return 'Please enter your name';
                          }
                          return null;
                        },
                      ),
                    ),
                    const Gap(15),
                    const Text(
                      'Country',
                      style: ConstFonts.font400,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: CustomTextField(
                        hintText: 'Egypt',
                        //sutfixIcon: const Icon(Icons.visibility_off),
                      ),
                    ),
                    const Gap(50),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 20, vertical: 8),
                      child: CustomButton(
                        onTap: () {
                          updateProfile();
                          log(emailCont.text);
                          log(phoneCont.text);
                          log(nameCont.text);
                        },
                        buttonText: 'Save',
                        contColor: ConstColors.pkColor,
                        textColor: ConstColors.kWhiteColor,
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 20, vertical: 8),
                      child: CustomButton(
                        onTap: () async {
                          deleteUser();
                          PrefManager.clearSharedPreferences();
                          // Navigator.push(
                          //     context,
                          //     MaterialPageRoute(
                          //         builder: (builder) => const DeleteAccount()));
                        },
                        buttonText: 'Delete account',
                        contColor: ConstColors.kRed,
                        textColor: ConstColors.kWhiteColor,
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    const Gap(20),
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
