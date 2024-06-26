import 'package:flutter/material.dart';
import 'package:wastend/constants/constants.dart';

class ProfileContainer extends StatelessWidget {
  const ProfileContainer({
    super.key,
    required this.image,
    required this.savedNum,
    required this.savedType,
  });

  final String image;
  final String savedNum;
  final String savedType;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 20),
      child: Container(
        height: 70,
        width: 170,
        decoration: BoxDecoration(
            color: ConstColors.pkColor,
            shape: BoxShape.rectangle,
            borderRadius: BorderRadius.circular(6)),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset(image),
            // const Gap(5),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  savedNum,
                  style: ConstFonts.fontBold
                      .copyWith(color: ConstColors.kWhiteColor),
                ),
                Text(
                  savedType,
                  style: ConstFonts.font400
                      .copyWith(color: ConstColors.kWhiteColor.withOpacity(.8)),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
