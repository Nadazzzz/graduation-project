import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/first_home_page.dart';

class ConfirmLocation extends StatelessWidget {
  const ConfirmLocation({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Gap(100),
            Center(child: Image.asset('assets/images/Frame61.png')),
            const Gap(70),
            const Row(
              children: [
                Text(
                  'Confirm your location',
                  style: ConstFonts.fontBold,
                ),
                Icon(
                  Icons.edit_location,
                  color: ConstColors.pkColor,
                )
              ],
            ),
            const Gap(20),
            Container(
              width: double.infinity,
              height: 50,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: ConstColors.kGreyColor)),
              child: const Padding(
                padding: EdgeInsets.all(12.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Helwan', style: ConstFonts.font400),
                    Icon(
                      Icons.done_outline,
                      color: ConstColors.pkColor,
                    )
                  ],
                ),
              ),
            ),
            const Gap(30),
            GestureDetector(
              onTap: () {
                Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(
                    builder: (builder) => const FHomePage(),
                  ),
                  (route) => false,
                );
              },
              child: const Text(
                'cairo, helwan university',
                style: ConstFonts.font400,
              ),
            ),
            const TextField(
              style: TextStyle(color: ConstColors.kDarkGrey),
              decoration: InputDecoration(
                hintText: 'helwan university',
                hintStyle: TextStyle(color: ConstColors.kGreyColor),
              ),
            ),
            const Gap(10),
            const Text(
              'cairo, helwan station',
              style: ConstFonts.font400,
            ),
            const TextField(
              style: TextStyle(color: ConstColors.kDarkGrey),
              decoration: InputDecoration(
                hintText: 'helwan station Metro',
                hintStyle: TextStyle(color: ConstColors.kGreyColor),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
