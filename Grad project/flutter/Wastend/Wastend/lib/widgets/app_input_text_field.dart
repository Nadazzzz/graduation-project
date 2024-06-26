import 'package:flutter/material.dart';

import '../constants/constants.dart';

class AppTextInputField extends StatelessWidget {
  AppTextInputField({super.key, 
    this.contentPadding,
    this.labelText,
    this.focusNode,
    this.autofocus = false,
    this.hintText,
    this.language,
    this.controller,
    this.enabled = true,
    this.obscureText = false,
    this.validator,
    this.prefix,
    this.maxLines,
    this.onFieldSubmitted,
    this.minLines,
    this.style,
    this.decoration,
    this.suffix,
    this.suffixIcon,
    this.readOnly = false,
    this.expands = false,
    this.keyboardType = TextInputType.text,
    this.borderColor = Colors.white,
  });

  final Color borderColor;
  final String? hintText;
  final String? labelText;
  final TextEditingController? controller;
  final FocusNode? focusNode;
  final TextInputType? keyboardType;
  final FormFieldValidator<String>? validator;
  final Widget? suffix;
  final Widget? suffixIcon;
  final Widget? prefix;
  final bool readOnly;
  final bool enabled;
  final bool autofocus;
  final bool expands;
  int? language;
  final int? maxLines;
  final int? minLines;
  InputDecoration? decoration;
  final bool obscureText;
  final TextStyle? style;
  final ValueChanged<String>? onFieldSubmitted;
  final EdgeInsets? contentPadding;

  @override
  Widget build(BuildContext context) {
    return buildAppFormField(context);
  }

  Widget buildAppFormField(BuildContext context) {
    return AppFormField(
      autofocus: autofocus,
      readOnly: readOnly,
      expands: expands,
      style: style,
      obscureText: obscureText,
      enabled: enabled,
      validator: validator,
      onFieldSubmitted: onFieldSubmitted,
      maxLines: maxLines,
      minLines: minLines,
      keyboardType: keyboardType,
      decoration: decoration,
      hintText: hintText,
      suffix: suffix,
      suffixIcon: suffixIcon,
      prefix: prefix,
      controller: controller,
      focusNode: focusNode,
      contentPadding: contentPadding,
      label: labelText,
    );
  }
}

class AppFormField extends StatelessWidget {
  const AppFormField({
    Key? key,
    this.autofocus = false,
    this.readOnly = false,
    this.expands = false,
    this.style,
    this.obscureText = false,
    this.enabled = true,
    this.validator,
    this.onFieldSubmitted,
    this.maxLines,
    this.minLines,
    this.keyboardType,
    this.decoration,
    this.hintText,
    this.label,
    this.suffix,
    this.suffixIcon,
    this.prefix,
    this.controller,
    this.focusNode,
    this.contentPadding,
    this.textAlignVertical,
  }) : super(key: key);
  final bool autofocus;
  final bool readOnly;
  final bool expands;
  final TextStyle? style;
  final bool obscureText;
  final bool enabled;
  final EdgeInsets? contentPadding;
  final TextAlignVertical? textAlignVertical;

  final FormFieldValidator<String>? validator;
  final ValueChanged<String>? onFieldSubmitted;
  final int? maxLines;
  final int? minLines;
  final TextInputType? keyboardType;
  final InputDecoration? decoration;
  final String? hintText;
  final String? label;
  final Widget? suffix;
  final Widget? suffixIcon;
  final Widget? prefix;
  final TextEditingController? controller;
  final FocusNode? focusNode;

  final OutlineInputBorder inputBorder = const OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(18)),
    borderSide: BorderSide(
      color: ConstColors.kGreyColor,
    ),
  );
  final OutlineInputBorder inputFocusedBorder = const OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(18)),
    borderSide: BorderSide(
      color: ConstColors.kGreyColor,
    ),
  );
  final OutlineInputBorder inputErrorBorder = const OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(18)),
    borderSide: BorderSide(
      color: ConstColors.kRed,
    ),
  );

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      autovalidateMode: AutovalidateMode.onUserInteraction,
      textAlignVertical: textAlignVertical ?? TextAlignVertical.center,
      autofocus: autofocus,
      readOnly: readOnly,
      expands: expands,
    
      obscureText: obscureText,
      enabled: enabled,
      validator: validator,
      onFieldSubmitted: onFieldSubmitted,
      maxLines: maxLines,
      minLines: minLines,
      keyboardType: keyboardType,
      decoration: decoration ??
          InputDecoration(
            contentPadding: contentPadding,
            // border: inputBorder,
            // focusedBorder: inputFocusedBorder,
            // enabledBorder: inputBorder,
            // errorBorder: inputErrorBorder,
            // disabledBorder: inputBorder,

            hintText: hintText,
            labelText: label,
      
            // hintStyle: AppTextStyles.h3.copyWith(color: ColorManager.grey2),
            floatingLabelBehavior: FloatingLabelBehavior.always,
            suffix: suffix,
            errorMaxLines: 2,
            suffixIcon: suffixIcon,
            prefixIcon: prefix,
            alignLabelWithHint: true,
            // fillColor: ColorManager.textFieldFilledColor,
            // filled: true,
          ),
      controller: controller,
      focusNode: focusNode,
    );
  }
}
