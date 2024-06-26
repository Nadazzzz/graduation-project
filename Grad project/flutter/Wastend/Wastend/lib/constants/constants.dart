import 'package:flutter/material.dart';
import 'package:wastend/screens/pages_view/page_view.dart';

class ConstColors {
  static const pkColor = Color(0xff34a853);
  static const kWhiteColor = Color(0xffffffff);
  static const kGreyColor = Color(0xff979595);
  static const kDarkGrey = Color(0xff000000);
  static const kRed = Color(0xffEA4335);
}

class ConstFonts {
  static const font400 = TextStyle(
      fontSize: 16, fontWeight: FontWeight.w400, color: ConstColors.kDarkGrey);
  static const fontBold = TextStyle(fontSize: 18, fontWeight: FontWeight.bold);
}

List<ViewerScreens> myView = [
  ViewerScreens(
    title: 'Welcome  To Wastend Application!',
    disc:
        'Join the fight against food waste and create a sustainable food culture.',
    img: 'assets/images/image1.png',
  ),
  ViewerScreens(
    title: 'End Hunger',
    disc:
        'Every meal is an opportunity to make a positive impact on our plant. Let’s make it count.',
    img: 'assets/images/image1(1).png',
  ),
  ViewerScreens(
    title: 'Be the Helping Hand',
    disc:
        ' Share the love by donating excess food to those in need and spreading kindness.',
    img: 'assets/images/image3.png',
  )
];

List reward = [
  'Free Meal',
  'Discount 50% on meal',
  'Free Meal',
  'Discount 80% on meal',
  'Two Meals Free',
  'Discount 60% on meal',
  'Free Meal',
  'Discount 90% on meal',
];
