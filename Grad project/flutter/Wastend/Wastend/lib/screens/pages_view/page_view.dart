import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:page_view_dot_indicator/page_view_dot_indicator.dart';

import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/sign_screens/login_page.dart';
import 'package:wastend/widgets/custom_button.dart';

class PageViewScreen extends StatefulWidget {
  const PageViewScreen({super.key});

  @override
  State<PageViewScreen> createState() => _PageViewScreenState();
}

class ViewerScreens {
  final String title;
  final String disc;
  final String img;

  ViewerScreens({
    required this.title,
    required this.disc,
    required this.img,
  });
}

class _PageViewScreenState extends State<PageViewScreen> {
  final PageController _controller = PageController(initialPage: 0);

  int _currentIndex = 0;
  final _pageIndexNotifier = ValueNotifier<int>(0);

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ConstColors.kWhiteColor,
      appBar: AppBar(
        backgroundColor: ConstColors.kWhiteColor,
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const LoginPage(),
                ),
              );
            },
            child: const Text(
              'Skip',
              style: TextStyle(color: ConstColors.kGreyColor),
            ),
          ),
        ],
      ),
      body: Stack(
        alignment: const Alignment(0, 0.7),
        children: [
          Builder(
            builder: (ctx) => PageView(
              controller: _controller,
              children: [
                ...myView
                    .map(
                      (item) => Container(
                        padding: const EdgeInsets.all(20.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          // crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Image.asset(item.img),
                            const Gap(20),
                            Text(
                              item.title,
                              style: ConstFonts.fontBold,
                              textAlign: TextAlign.center,
                            ),
                            const Gap(20),
                            Text(
                              item.disc,
                              style: ConstFonts.font400,
                              textAlign: TextAlign.center,
                            )
                          ],
                        ),
                      ),
                    )
                    .toList(),
              ],
              onPageChanged: (value) {
                _pageIndexNotifier.value = value;
                setState(() {
                  _currentIndex = value;
                });
              },
            ),
          ),
          PageViewDotIndicator(
            alignment: const Alignment(0, 0.50),
            size: const Size(30, 7),
            currentItem: _pageIndexNotifier.value,
            count: myView.length,
            unselectedColor: ConstColors.kGreyColor,
            selectedColor: ConstColors.pkColor,
            boxShape: BoxShape.rectangle,
            borderRadius: const BorderRadius.horizontal(
              left: Radius.circular(5),
              right: Radius.circular(5),
            ),
          ),
          Align(
            alignment: const Alignment(0, 0.95),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8),
              child: CustomButton(
                onTap: () {
                  _currentIndex++;
                  if (_currentIndex < 3) {
                    _controller.animateToPage(
                      _currentIndex,
                      duration: const Duration(milliseconds: 300),
                      curve: Curves.easeIn,
                    );
                  } else {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => const LoginPage(),
                      ),
                    );
                  }
                },
                buttonText: 'Next',
                contColor: ConstColors.pkColor,
                textColor: ConstColors.kWhiteColor,
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          )
        ],
      ),
    );
  }
}
