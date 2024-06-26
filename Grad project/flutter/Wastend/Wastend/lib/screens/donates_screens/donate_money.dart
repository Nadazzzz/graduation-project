import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/donates_screens/donate_success.dart';
import 'package:wastend/utils/constants.dart';
import 'package:wastend/widgets/custom_button.dart';
import 'package:wastend/widgets/custom_donate_cont.dart';

import '../../utils/shared_prefrance/pref_manager.dart';
import '../../widgets/custom_text_field.dart';

class DonateMoney extends StatefulWidget {
  const DonateMoney({super.key});

  @override
  State<DonateMoney> createState() => _DonateMoneyState();
}

TextEditingController amountCont = TextEditingController();
final donateMoneyKey = GlobalKey<FormState>();

class _DonateMoneyState extends State<DonateMoney> {
  String? cardId;
  String? userId;

  Future<void> donateMoney() async {
    SharedPreferences uIdPrefs = await SharedPreferences.getInstance();
    userId = PrefManager.getToken();
    cardId = uIdPrefs.getString('cardId');

    try {
      Map<String, dynamic> reqData = {
        "amount": amountCont.text,
        "cardId": '$cardId',
      };
      log(cardId.toString());
      log(userId.toString());
      final Response<dynamic> res = await Dio().post(
        "$baseUrl/donation/money/$userId",
        data: reqData,
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );

      if (res.statusCode == 201) {
        log('Success');
        log(res.data['amount'].toString());
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (builder) => const DonateSuccess(),
          ),
        );
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  @override
  void dispose() {
    amountCont.clear();
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
                'Donate Money',
                style: ConstFonts.fontBold.copyWith(fontSize: 18),
              ),
              const Gap(40),
              Form(
                key: donateMoneyKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Write amount to donate',
                      style: ConstFonts.font400,
                    ),
                    const Gap(7),
                    CustomTextField(
                      controller: amountCont,
                      hintText: '100\$',
                    ),
                    const Gap(50),
                    const CustomDonateContainer(
                      donateImage: 'assets/images/ion_card.png',
                      donateHintext: ' Credit Card',
                    ),
                    const Gap(20),
                    const CustomDonateContainer(
                      donateImage: 'assets/images/formkit_visa.png',
                      donateHintext: ' Vise',
                    ),
                    const Gap(20),
                    const CustomDonateContainer(
                      donateImage: 'assets/images/logos_mastercard.png',
                      donateHintext: ' Master card',
                    ),
                    const Gap(20),
                    const CustomDonateContainer(
                      donateImage: 'assets/images/logos_google-pay.png',
                      donateHintext: ' Google Pay',
                    ),
                    const Gap(90),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: CustomButton(
                        onTap: () {
                          donateMoney();
                          log(cardId.toString());
                        },
                        buttonText: 'Donate',
                        contColor: ConstColors.pkColor,
                        textColor: ConstColors.kWhiteColor,
                        borderRadius: BorderRadius.circular(8),
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
