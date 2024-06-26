import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';

class CustomCarouselContainer extends StatelessWidget {
  const CustomCarouselContainer({
    super.key,
    this.title,
    this.subTitle,
    this.onPressed,
  });

  final String? title;
  final String? subTitle;
  final void Function()? onPressed;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(
        right: 25,
        left: 25,
        top: 25,
        bottom: 15,
      ),
      width: double.infinity,
      height: 150,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: ConstColors.pkColor,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title!,
            style: ConstFonts.fontBold.copyWith(
              color: ConstColors.kWhiteColor,
            ),
          ),
          const Gap(13),
          Text(
            subTitle!,
            style: const TextStyle(
              color: ConstColors.kWhiteColor,
            ),
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: SizedBox(
              width: 100,
              child: ElevatedButton(
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.resolveWith(
                      (states) => ConstColors.kWhiteColor),
                ),
                onPressed: onPressed,
                child: const Center(
                  child: Text(
                    'Donate',
                    style: ConstFonts.font400,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
