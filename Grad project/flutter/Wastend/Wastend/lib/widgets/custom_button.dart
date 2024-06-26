import 'package:flutter/material.dart';
// import 'package:wastend/consts/constants.dart';

// ignore: must_be_immutable
class CustomButton extends StatelessWidget {
  CustomButton({
    super.key,
    required this.buttonText,
    this.onTap,
    this.contColor,
    this.textColor,
    this.border,
    this.borderRadius,
    this.heightCont = 50,
    this.widthCont = double.infinity,
  });

  VoidCallback? onTap;
  String? buttonText;
  Color? contColor;
  Color? textColor;
  Border? border;
  BorderRadius? borderRadius;
  double? heightCont;
  double? widthCont;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: heightCont,
        width: widthCont,
        decoration: BoxDecoration(
          color: contColor,
          borderRadius: borderRadius,
          border: border,
        ),
        child: Center(
          child: Text(
            "$buttonText",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: textColor,
            ),
          ),
        ),
      ),
    );
  }
}
