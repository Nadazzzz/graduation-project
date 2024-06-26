import 'package:flutter/material.dart';
import 'package:wastend/constants/constants.dart';

class MainTitle extends StatelessWidget {
  const MainTitle({super.key, required this.mainTitle, this.onPressed});

  final String mainTitle;
  final void Function()? onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(mainTitle,
              style:
                  ConstFonts.fontBold.copyWith(color: ConstColors.kDarkGrey)),
          TextButton(
              style: ButtonStyle(
                  padding: MaterialStateProperty.resolveWith(
                      (states) => const EdgeInsets.all(0))),
              onPressed: onPressed,
              child: Text(
                'See All',
                style: ConstFonts.font400.copyWith(color: ConstColors.pkColor),
              )),
        ],
      ),
    );
  }
}
