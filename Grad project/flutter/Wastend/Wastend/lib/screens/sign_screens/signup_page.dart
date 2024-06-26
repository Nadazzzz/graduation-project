import 'dart:developer';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:image_picker/image_picker.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/bottom_navigation_bar.dart';
import 'package:wastend/screens/sign_screens/login_page.dart';
import 'package:wastend/utils/shared_prefrance/pref_manager.dart';
import 'package:wastend/widgets/custom_button.dart';
import '../../utils/constants.dart';
import '../../widgets/app_password_input_field.dart';
import '../../widgets/custom_text_field.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

TextEditingController userNameCont = TextEditingController();
TextEditingController emailCont = TextEditingController();
TextEditingController passCont = TextEditingController();
TextEditingController mobileCont = TextEditingController();
final _formKey = GlobalKey<FormState>();
File? file;
String? fileName;

class _SignUpPageState extends State<SignUpPage> {
  bool _isLeading = false;

  void selectedImage() async {
    final ImagePicker picker = ImagePicker();

    final XFile? image = await picker.pickImage(source: ImageSource.gallery);
    setState(() {
      file = File(image!.path);
      fileName = image.path.split('/').last;
    });
  }

  bool isShowPassword = false;
  Future<void> signUp() async {
    setState(() {
      _isLeading = true;
    });

    try {
      if (file != null) {
        var formData = FormData.fromMap({
          'name': userNameCont.text,
          'email': emailCont.text,
          'password': passCont.text,
          'phone': mobileCont.text,
          'longitude': '123.456',
          'latitude': '78.901',
          'photo': await MultipartFile.fromFile(file!.path, filename: fileName),
        });

        final Response<dynamic> res = await Dio().post(
          '$baseUrl/user/register',
          data: formData,
          // options: Options(
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // ),
        );
        if (res.statusCode == 201) {
          log(res.data['_id']);
          PrefManager.setToken(res.data['_id']);
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(
              builder: (builder) => const BottomNavBar(),
            ),
            (route) => false,
          );
        } else if (res.statusCode == 500) {
          log('Server error: ${res.statusMessage}');
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text('Server Error'),
              content: const Text('this mail is already registered.'),
              actions: <Widget>[
                GestureDetector(
                  child: const Text('OK'),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
              ],
            ),
          );
          setState(() {
            _isLeading = false;
          });
        } else {
          setState(() {
            _isLeading = false;
          });
        }
      }
    } on DioException catch (e) {
      setState(() {
        _isLeading = false;
      });
      log(e.toString());
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Center(
            child: Text('error while signup'
                // e.response!.data['errors'].first['msg'].toString(),
                ),
          ),
        ),
      );
    }
  }

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
              const Gap(40),
              Center(child: Image.asset('assets/images/Frame61.png')),
              const Gap(40),
              Stack(
                children: [
                  Align(
                    alignment: Alignment.center,
                    child: file != null
                        ? CircleAvatar(
                            radius: 60,
                            child: Image.file(file!),
                          )
                        : const CircleAvatar(
                            radius: 60,
                            backgroundImage: NetworkImage(
                              'https://th.bing.com/th/id/R.7905f8a05a631ab59354ec17a7bd01e6?rik=W1lQiGZVcpcE1A&pid=ImgRaw&r=0',
                            ),
                          ),
                  ),
                  Positioned(
                    top: 90,
                    right: 130,
                    child: GestureDetector(
                      onTap: () {
                        // if (image == null || image.isEmpty) {
                        //   image = const NetworkImage(
                        //       'https://th.bing.com/th/id/R.7905f8a05a631ab59354ec17a7bd01e6?rik=W1lQiGZVcpcE1A&pid=ImgRaw&r=0');
                        // }
                        selectedImage();
                      },
                      child: Center(
                        child: Image.asset('assets/images/Frame3.png'),
                      ),
                    ),
                  ),
                ],
              ),
              const Gap(10),
              const Text(
                'Create Account',
                style: ConstFonts.fontBold,
              ),
              const Gap(40),
              Form(
                key: _formKey,
                autovalidateMode: AutovalidateMode.onUserInteraction,
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
                        controller: userNameCont,
                        hintText: 'Enter Username',
                        validator: (val) {
                          if (val!.isEmpty) {
                            return 'Please enter your username';
                          }
                          // RegExp regExp = RegExp(r'^[a-zA-Z]+\s[a-zA-Z]+$');
                          // if (!regExp.hasMatch(val)) {
                          //   return 'Username should be in the format: name name';
                          // }
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
                        validator: (val) {
                          if (val!.isEmpty) {
                            return 'Please enter your email';
                          }
                          // if (!RegExp(
                          //         r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
                          //     .hasMatch(val)) {
                          //   return 'Please enter a valid email';
                          // }
                          return null;
                        },
                        hintText: 'Username @gmail.com',
                        controller: emailCont,
                      ),
                    ),
                    const Gap(15),
                    const Text(
                      'Password',
                      style: ConstFonts.font400,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: AppPasswordInputField(
                        validator: (val) {
                          if (val!.isEmpty) {
                            return 'Please enter your password';
                          }
                          if (val.length < 8) {
                            return 'Password must be at least 8 characters long';
                          }
                          return null;
                        },
                        controller: passCont,
                        hintText: '********************',
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
                        validator: (val) {
                          if (val!.isEmpty) {
                            return 'Please enter your mobile number';
                          }
                          if (val.length < 11) {
                            return 'Please enter a valid mobile number';
                          }

                          return null;
                        },
                        controller: mobileCont,
                        hintText: '01729378654',
                      ),
                    ),
                    const Gap(50),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: Visibility(
                        visible: !_isLeading,
                        replacement: const Align(
                          alignment: Alignment.center,
                          child: CircularProgressIndicator(),
                        ),
                        child: CustomButton(
                          onTap: () {
                            if (_formKey.currentState!.validate()) {
                              signUp();
                            }
                          },
                          buttonText: 'SignUp',
                          contColor: ConstColors.pkColor,
                          textColor: ConstColors.kWhiteColor,
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                    const Gap(10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          'Already have an account?',
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
                                builder: (builder) => const LoginPage(),
                              ),
                            );
                          },
                          child: const Text(
                            'Log in',
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
