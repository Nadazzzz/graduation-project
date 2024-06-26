import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/donates_screens/donate_success.dart';
import 'package:wastend/widgets/custom_button.dart';

import '../../utils/constants.dart';
import '../../utils/shared_prefrance/pref_manager.dart';
import '../../widgets/custom_text_field.dart';

class DonateFood extends StatefulWidget {
  const DonateFood({super.key});

  @override
  State<DonateFood> createState() => _DonateFoodState();
}

TextEditingController titleCont = TextEditingController();
TextEditingController descCont = TextEditingController();
TextEditingController foodCatCont = TextEditingController();
TextEditingController expDateCont = TextEditingController();
TextEditingController quantityCont = TextEditingController();
final donateFoodKey = GlobalKey<FormState>();

class _DonateFoodState extends State<DonateFood> {
  String? userId;
  bool _isLoading = false;

  Future<void> _donateFood() async {
    userId = PrefManager.getToken();
    log(userId.toString());
    setState(() {
      _isLoading = true;
    });
    try {
      Map<String, dynamic> requestData = {
        "title": titleCont.text,
        "description": descCont.text,
        "foodCategory": foodCatCont.text,
        "expirationDate": expDateCont.text,
        "quantity": int.parse(quantityCont.text),
      };

      final Response<dynamic> res = await Dio().post(
        "$baseUrl/donation/food/$userId",
        data: requestData,
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      log('message');
      if (res.statusCode == 201) {
        log(res.data['title']);

        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (builder) => const DonateSuccess(),
          ),
        );
        setState(() {
          _isLoading = false;
        });
      }
    } on DioException catch (e) {
      setState(() {
        _isLoading = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(e.message.toString()),
        ),
      );
    }
  }

  @override
  void dispose() {
    titleCont.clear();
    descCont.clear();
    foodCatCont.clear();
    expDateCont.clear();
    quantityCont.clear();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Gap(10),
              Text(
                'Donate Food',
                style: ConstFonts.fontBold.copyWith(fontSize: 18),
              ),
              const Gap(40),
              Form(
                key: donateFoodKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Title',
                      style: ConstFonts.font400,
                    ),
                    const Gap(7),
                    CustomTextField(
                      controller: titleCont,
                      hintText: 'Chicken  briyani',
                      validator: (val) {
                        if (val!.isEmpty) {
                          return 'Field cannot be empty';
                        }
                        return null;
                      },
                    ),
                    const Gap(20),
                    const Text(
                      'Description',
                      style: ConstFonts.font400,
                    ),
                    const Gap(7),
                    CustomTextField(
                      controller: descCont,
                      maxLines: 3,
                      hintText:
                          'Detail description of product or any allergy information.',
                      validator: (val) {
                        if (val!.isEmpty) {
                          return 'Field cannot be empty';
                        }
                        return null;
                      },
                    ),
                    const Gap(20),
                    const Text(
                      'Food Category',
                      style: ConstFonts.font400,
                    ),
                    const Gap(7),
                    CustomTextField(
                      controller: foodCatCont,
                      maxLines: 1,
                      hintText: 'Meal',
                      validator: (val) {
                        if (val!.isEmpty) {
                          return 'Field cannot be empty';
                        }
                        return null;
                      },
                    ),
                    const Gap(20),
                    const Text(
                      'Expiry Date',
                      style: ConstFonts.font400,
                    ),
                    const Gap(7),
                    CustomTextField(
                      controller: expDateCont,
                      maxLines: 1,
                      hintText: '22/10/2024',
                      validator: (val) {
                        if (val!.isEmpty) {
                          return 'Field cannot be empty';
                        }
                        return null;
                      },
                    ),
                    const Gap(20),
                    const Text(
                      'Quantity',
                      style: ConstFonts.font400,
                    ),
                    const Gap(7),
                    CustomTextField(
                      controller: quantityCont,
                      maxLines: 1,
                      hintText: '4 Meals',
                      validator: (val) {
                        if (val!.isEmpty) {
                          return 'Field cannot be empty';
                        }
                        return null;
                      },
                    ),
                    const Gap(30),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: Visibility(
                        visible: !_isLoading,
                        replacement:
                            const Center(child: CircularProgressIndicator()),
                        child: CustomButton(
                          onTap: () {
                            if (donateFoodKey.currentState!.validate()) {
                              _donateFood();
                            }
                          },
                          buttonText: 'Donate',
                          contColor: ConstColors.pkColor,
                          textColor: ConstColors.kWhiteColor,
                          borderRadius: BorderRadius.circular(8),
                        ),
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
