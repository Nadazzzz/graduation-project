import 'package:flutter/material.dart';
import 'package:wastend/constants/constants.dart';

// ignore: must_be_immutable
class CustomTextField extends StatelessWidget {
  CustomTextField({
    super.key,
    this.hintText,
    this.onChanged,
    this.sutfixIcon,
    this.prefixIcon,
    this.readOnly = false,
    this.obscureText = false,
    this.controller,
    this.validator,
    this.maxLines,
  });

  Function(String)? onChanged;
  final String? Function(String?)? validator;
  String? hintText;
  int? maxLines;
  bool readOnly;
  bool? obscureText;
  Widget? sutfixIcon;
  Icon? prefixIcon;
  TextEditingController? controller;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      readOnly: readOnly,
      controller: controller,
      obscureText: obscureText!,
      maxLines: maxLines,
      validator: validator,
      onChanged: onChanged,
      decoration: InputDecoration(
        hintText: hintText,
        suffixIcon: sutfixIcon,
        prefixIcon: prefixIcon,
        hintStyle: const TextStyle(
          color: ConstColors.kGreyColor,
        ),
        enabledBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(18)),
          borderSide: BorderSide(
            color: ConstColors.kGreyColor,
          ),
        ),
        border: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(18)),
          borderSide: BorderSide(
            color: ConstColors.kGreyColor,
          ),
        ),
      ),
    );
  }
}
