import 'package:flutter/material.dart';
import 'package:wastend/constants/constants.dart';

class CustomElevatedBtn extends StatelessWidget {
  const CustomElevatedBtn({
    super.key,
    required this.text,
    this.onPress,
  });

  final String text;
  final void Function()? onPress;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPress,
      style: ButtonStyle(
        minimumSize:
            MaterialStateProperty.resolveWith((states) => const Size(120, 6)),
        backgroundColor:
            MaterialStateColor.resolveWith((states) => ConstColors.kWhiteColor),
        padding: MaterialStateProperty.resolveWith((states) =>
            const EdgeInsets.symmetric(horizontal: 19, vertical: 18)),
        shape: MaterialStateProperty.resolveWith(
          (states) => const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(16),
            ),
          ),
        ),
        textStyle: MaterialStateProperty.resolveWith(
            (states) => const TextStyle(color: ConstColors.pkColor)),
        side: MaterialStateProperty.resolveWith(
          (states) => const BorderSide(color: ConstColors.pkColor),
        ),
      ),
      child: Text(
        text,
        style: ConstFonts.font400
      ),
    );
  }
}
