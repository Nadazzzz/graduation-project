import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/widgets/custom_button.dart';

import '../bottom_navigation_bar.dart';

class PaymentSuccess2 extends StatelessWidget {
  const PaymentSuccess2({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Gap(200),
              const CircleAvatar(
                  maxRadius: 45,
                  backgroundColor: ConstColors.pkColor,
                  child: Icon(
                    Icons.done_outline,
                    color: ConstColors.kWhiteColor,
                    size: 60,
                    weight: 100,
                  )),
              const Gap(30),
              Text(
                'You just saved a meal',
                style: ConstFonts.fontBold.copyWith(fontSize: 24),
              ),
              const Gap(20),
              Text(
                'Thank you for your order.',
                style: ConstFonts.font400
                    .copyWith(fontSize: 20, color: ConstColors.kGreyColor),
              ),
              const Gap(40),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 40),
                child: CustomButton(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  buttonText: 'Track my order',
                  contColor: ConstColors.pkColor,
                  textColor: ConstColors.kWhiteColor,
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              const Gap(10),
              TextButton(
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const BottomNavBar()));
                  },
                  child: const Text(
                    'Back to home page',
                    style: TextStyle(fontSize: 18, color: ConstColors.pkColor),
                  )),
              const Gap(100),
            ],
          ),
        ),
      ),
    );
  }
}
