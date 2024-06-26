import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/sign_screens/confirm_location_page.dart';
import 'package:wastend/widgets/custom_button.dart';
import 'package:wastend/widgets/custom_elevated_btn.dart';

import '../bottom_navigation_bar.dart';
// import 'package:wastend/sign_screens/login_page.dart';

class FavFood extends StatelessWidget {
  const FavFood({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          TextButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (builder) => const ConfirmLocation(),
                ),
              );
            },
            child: const Text(
              'Skip',
              style: TextStyle(color: ConstColors.kGreyColor),
            ),
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Gap(40),
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'What is your favorite food?',
              style: ConstFonts.font400,
            ),
          ),
          const Gap(100),
          const Center(
            child: Wrap(
              alignment: WrapAlignment.start,
              spacing: 14.0,
              runSpacing: 30.0,
              children: [
                CustomElevatedBtn(
                  text: 'Non-Vegetarian Food',
                ),
                CustomElevatedBtn(
                  text: 'Baked goods',
                ),
                CustomElevatedBtn(
                  text: 'fruit',
                ),
                CustomElevatedBtn(
                  text: 'Vegetables',
                ),
                CustomElevatedBtn(
                  text: 'Healthy Food',
                ),
                CustomElevatedBtn(
                  text: 'Vegetarian Food',
                ),
                CustomElevatedBtn(
                  text: 'Pizza',
                ),
                CustomElevatedBtn(
                  text: 'Drinks',
                ),
                CustomElevatedBtn(
                  text: 'Meals',
                ),
                CustomElevatedBtn(
                  text: 'Cake',
                ),
              ],
            ),
          ),
          const Gap(180),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: CustomButton(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (builder) => const BottomNavBar(),
                  ),
                );
              },
              buttonText: 'Next',
              contColor: ConstColors.pkColor,
              textColor: ConstColors.kWhiteColor,
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ],
      ),
    );
  }
}

// ignore: must_be_immutable
