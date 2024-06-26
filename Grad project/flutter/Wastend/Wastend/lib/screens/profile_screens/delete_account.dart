import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/widgets/custom_button.dart';

class DeleteAccount extends StatelessWidget {
  const DeleteAccount({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: CustomDeleteLogout(
        onTap: () {},
        title:
            'We’re sad to see you go, there are still so many meals out there to save!',
        subTitle:
            '  If you still want to say goodbye, tap the button below and we’ll delete your account.',
        btnText: 'Delete account',
      ),
    );
  }
}

class CustomDeleteLogout extends StatelessWidget {
  const CustomDeleteLogout({
    super.key,
    required this.title,
    required this.subTitle,
    required this.btnText,
    required this.onTap,
  });

  final String title;
  final String subTitle;
  final String btnText;
  final void Function()? onTap;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Gap(120),
            const Icon(
              Icons.sentiment_dissatisfied,
              color: ConstColors.pkColor,
              size: 100,
              weight: 150,
            ),
            const Gap(20),
            Text(
              title,
              textAlign: TextAlign.center,
              style: ConstFonts.font400,
            ),
            const Gap(80),
            Text(
              subTitle,
              textAlign: TextAlign.center,
              style: ConstFonts.font400,
            ),
            const Gap(200),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 30),
              child: CustomButton(
                onTap: onTap,
                buttonText: btnText,
                contColor: ConstColors.kRed,
                borderRadius: BorderRadius.circular(10),
                textColor: ConstColors.kWhiteColor,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 30),
              child: CustomButton(
                buttonText: 'Cancel',
                borderRadius: BorderRadius.circular(10),
                textColor: ConstColors.pkColor,
                onTap: () {
                  Navigator.of(context).pop();
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
