import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/payment_methods/payment_success2.dart';
import 'package:wastend/utils/constants.dart';
import 'package:wastend/widgets/custom_button.dart';

import '../../utils/shared_prefrance/pref_manager.dart';
import '../../widgets/custom_text_field.dart';

class PaymentCardDetails extends StatefulWidget {
  const PaymentCardDetails({super.key});

  @override
  State<PaymentCardDetails> createState() => _PaymentCardDetailsState();
}

TextEditingController holderNameCont = TextEditingController();
TextEditingController cardNumCont = TextEditingController();
TextEditingController expiredateCont = TextEditingController();
TextEditingController cvcCont = TextEditingController();
final paymentMethodKey = GlobalKey<FormState>();

class _PaymentCardDetailsState extends State<PaymentCardDetails> {
  String? saveCard;
  String? userId;
  String cardId = '';
  late SharedPreferences cardIdPrefs;
  Future<void> saveCardMethod() async {
    userId = PrefManager.getToken();

    try {
      Map<String, dynamic> requestData = {
        "holderName": holderNameCont.text,
        "cardNumber": cardNumCont.text,
        "expirationDate": expiredateCont.text,
        "cvc": cvcCont.text,
      };

      final Response<dynamic> res = await Dio().post(
        "$baseUrl/paymentCard/$userId",
        data: requestData,
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );

      if (res.statusCode == 201) {
        log(res.data['_id']);
        cardId = res.data['_id'];
        cardIdPrefs = await SharedPreferences.getInstance();
        cardIdPrefs.setString('cardId', cardId);
        Navigator.push(context,
            MaterialPageRoute(builder: (context) => const PaymentSuccess2()));
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  @override
  void dispose() {
    holderNameCont.clear();
    cardNumCont.clear();
    expiredateCont.clear();
    cvcCont.clear();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Payment Card',
          style: TextStyle(
              color: ConstColors.kDarkGrey, fontWeight: FontWeight.w500),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            children: [
              const Gap(10),
              const Align(
                child: Text(
                  'Card Details',
                  style: ConstFonts.fontBold,
                ),
              ),
              const Gap(25),
              Form(
                key: paymentMethodKey,
                autovalidateMode: AutovalidateMode.onUserInteraction,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '   Card Holder',
                      style: ConstFonts.font400
                          .copyWith(color: ConstColors.kDarkGrey),
                    ),
                    CustomTextField(
                      controller: holderNameCont,
                      hintText: '     Amina Nasser',
                      validator: (val) {
                        if (val == null || val.isEmpty) {
                          return "holder can't be empty ";
                        }
                        return '';
                      },
                    ),
                    const Gap(25),
                    Text(
                      '   Card Number',
                      style: ConstFonts.font400
                          .copyWith(color: ConstColors.kDarkGrey),
                    ),
                    CustomTextField(
                      controller: cardNumCont,
                      hintText: '     9453 8765 6543',
                      validator: (val) {
                        if (val == null || val.isEmpty && val.length != 16) {
                          return "Please enter valid Card Number ";
                        }
                        return '';
                      },
                    ),
                    const Gap(25),
                    Row(children: [
                      SizedBox(
                        width: 175,
                        height: 120,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '   MM/YY',
                              style: ConstFonts.font400
                                  .copyWith(color: ConstColors.kDarkGrey),
                            ),
                            CustomTextField(
                              controller: expiredateCont,
                              hintText: '     14/25',
                              validator: (val) {
                                if (val == null || val.isEmpty) {
                                  return "Date can't be empty ";
                                }
                                return '';
                              },
                            ),
                          ],
                        ),
                      ),
                      const Gap(30),
                      SizedBox(
                        width: 175,
                        height: 120,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '   CVC',
                              style: ConstFonts.font400
                                  .copyWith(color: ConstColors.kDarkGrey),
                            ),
                            CustomTextField(
                              validator: (val) {
                                if (val == null ||
                                    val.isEmpty && val.length != 2) {
                                  return "Please enter valid CVC Number ";
                                }
                                return '';
                              },
                              controller: cvcCont,
                              hintText: '     147',
                            ),
                          ],
                        ),
                      )
                    ]),
                    const Gap(15),
                    Row(
                      children: [
                        Radio(
                            toggleable: true,
                            activeColor: ConstColors.pkColor,
                            value: "saveCard",
                            groupValue: saveCard,
                            onChanged: (val) {
                              setState(() {
                                saveCard = val;
                              });
                              print(saveCard);
                            }),
                        Text(
                          'Save Card',
                          style: ConstFonts.fontBold
                              .copyWith(color: ConstColors.kDarkGrey),
                        ),
                      ],
                    ),
                    const Gap(180),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 25),
                      child: CustomButton(
                        onTap: () {
                          // if (paymentMethodKey.currentState!.validate() &&
                          //     saveCard == "saveCard") {
                          saveCardMethod();
                          // } else {
                          //   ScaffoldMessenger.of(context).showSnackBar(
                          //       const SnackBar(
                          //           content: Center(
                          //               child: Text(
                          //                   'Something went wrong ,Please try later'))));
                          // }
                        },
                        buttonText: 'Confirm',
                        // border: Border.all(),
                        borderRadius: BorderRadius.circular(9),
                        textColor: ConstColors.kWhiteColor,
                        contColor: ConstColors.pkColor,
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
