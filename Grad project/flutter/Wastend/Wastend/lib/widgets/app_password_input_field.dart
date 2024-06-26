import 'package:flutter/material.dart';

import '../constants/constants.dart';
import 'app_input_text_field.dart';

class AppPasswordInputField extends StatefulWidget {
  const AppPasswordInputField({super.key, 
    this.controller,
    this.focusNode,
    this.hintText,
    this.label,
    this.validator,
    this.autofocus = false,
  });
  final TextEditingController? controller;
  final FocusNode? focusNode;
  final String? hintText;
  final String? label;
  final bool autofocus;
  final FormFieldValidator<String>? validator;

  @override
  _AppPasswordInputFieldState createState() => _AppPasswordInputFieldState();
}

class _AppPasswordInputFieldState extends State<AppPasswordInputField> {
  bool obscureText = true;

  @override
  Widget build(BuildContext context) {
    return AppTextInputField(
      labelText: widget.label,
      focusNode: widget.focusNode,
      autofocus: widget.autofocus,
      maxLines: 1,
      hintText: widget.hintText,
      validator: widget.validator,
      controller: widget.controller,
      obscureText: obscureText,
      suffixIcon: InkWell(
          onTap: () {
            setState(() {
              obscureText = !obscureText;
            });
          },
          child: Icon(
            Icons.visibility,
            color: obscureText ? ConstColors.kGreyColor : ConstColors.kDarkGrey,
          )),
    );
  }
}
