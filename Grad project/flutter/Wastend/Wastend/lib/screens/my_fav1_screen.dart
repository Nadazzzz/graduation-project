import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/widgets/custom_button.dart';

class MyFavourite1 extends StatelessWidget {
  const MyFavourite1({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: Center(
          child: Column(
            children: [
              const Divider(),
              const Gap(150),
              Text(
                'No favourites added yet',
                style: ConstFonts.fontBold.copyWith(color: ConstColors.pkColor),
              ),
              const Gap(60),
              const Text(
                'Tap the heart icon on a store to add it to your favourites and it will show up here.',
                style: ConstFonts.font400,
                textAlign: TextAlign.center,
              ),
              const Gap(200),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 18.0),
                child: CustomButton(
                  buttonText: 'Find ',
                  contColor: ConstColors.pkColor,
                  textColor: ConstColors.kWhiteColor,
                  borderRadius: BorderRadius.circular(8),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
