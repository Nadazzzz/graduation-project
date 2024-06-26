import 'package:flutter/material.dart';
import 'package:wastend/constants/constants.dart';

class CustomListTile extends StatelessWidget {
  const CustomListTile(
      {super.key, required this.icon, required this.title, this.onTap});
  final IconData icon;
  final String title;
  final Function()? onTap;
  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(
        icon,
        color: ConstColors.kDarkGrey,
      ),
      title: Text(
        title,
        style: ConstFonts.font400,
      ),
      trailing: const Icon(
        Icons.arrow_forward_ios_outlined,
        size: 12,
        color: ConstColors.kDarkGrey,
      ),
      onTap: onTap,
    );
  }
}
