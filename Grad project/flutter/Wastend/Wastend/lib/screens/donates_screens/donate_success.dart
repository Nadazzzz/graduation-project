import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/widgets/custom_button.dart';

class DonateSuccess extends StatelessWidget {
  const DonateSuccess({super.key});

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
                  maxRadius: 50,
                  backgroundColor: ConstColors.pkColor,
                  child: Icon(
                    Icons.done_outline,
                    color: ConstColors.kWhiteColor,
                    size: 60,
                    weight: 100,
                  )),
              const Gap(30),
              Text(
                'Done !',
                style: ConstFonts.fontBold.copyWith(fontSize: 24),
              ),
              const Gap(30),
              Text(
                'Thank you for your Donation.',
                style: ConstFonts.font400
                    .copyWith(fontSize: 20, color: ConstColors.kGreyColor),
              ),
              const Gap(30),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 60),
                child: CustomButton(
                    onTap: () {
                      Navigator.pop(context);
                    },
                    buttonText: 'Done',
                    contColor: ConstColors.pkColor,
                    textColor: ConstColors.kWhiteColor,
                    borderRadius: BorderRadius.circular(10)),
              ),
              const Gap(200)
            ],
          ),
        ),
      ),
    );
  }
}
