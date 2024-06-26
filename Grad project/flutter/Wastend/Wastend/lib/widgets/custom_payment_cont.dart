import 'package:flutter/material.dart';
import 'package:wastend/constants/constants.dart';

class CustomPaymentContainer extends StatelessWidget {
  const CustomPaymentContainer({
    super.key,
    this.donateImage = '',
    this.readOnly = false,
    this.hintText,
    this.onChanged,
    this.onTap,
    this.suffixIcon,
    this.prefixIcon,
    this.obscureText = false,
    this.maxLines,
  });

  final String donateImage;

  final Function(String)? onChanged;
  final void Function()? onTap;
  final String? hintText;
  final int? maxLines;
  final bool? obscureText;
  final Icon? suffixIcon;
  final Icon? prefixIcon;
  final bool readOnly;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Row(
        children: [
          Image.asset(
            donateImage, // Replace 'image.png' with your image path
            width: 50.0,
            height: 50.0,
          ),
          const SizedBox(width: 25.0),
          Expanded(
              child: TextFormField(
            readOnly: readOnly,
            obscureText: obscureText!,
            maxLines: maxLines,
            // validator: (data) {
            //   if (data!.isEmpty) {
            //     return 'filed is required';
            //   } else if (data.length < 3) {}
            // },
            onChanged: onChanged,
            onTap: onTap,
            decoration: InputDecoration(
              hintText: hintText,
              suffixIcon: suffixIcon,
              prefixIcon: prefixIcon,
              hintStyle: const TextStyle(
                color: ConstColors.kGreyColor,
              ),
              border: InputBorder.none,
            ),
          )),
        ],
      ),
    );
  }
}
