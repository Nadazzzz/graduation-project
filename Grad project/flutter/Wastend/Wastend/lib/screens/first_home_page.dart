import 'package:carousel_slider/carousel_slider.dart';
import 'package:dots_indicator/dots_indicator.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';

import 'package:wastend/screens/donates_screens/donate_food.dart';
import 'package:wastend/screens/donates_screens/donate_money.dart';

import 'package:wastend/screens/recomended_page.dart';

import 'package:wastend/widgets/custom_box_home_cont.dart';
import 'package:wastend/widgets/custom_carousel_cont.dart';

import 'package:wastend/widgets/custom_main_title_home.dart';
import 'package:wastend/widgets/menu_drawer.dart';

import '../widgets/categories_widget.dart';

class FHomePage extends StatefulWidget {
  const FHomePage({super.key});

  @override
  State<FHomePage> createState() => _FHomePageState();
}

class _FHomePageState extends State<FHomePage> {
  CarouselController carouselController = CarouselController();
  final _pageIndexNotifier = ValueNotifier<int>(0);
  int currentCar = 0;

  @override
  Widget build(BuildContext context) {
    List<Widget> items = [
      CustomCarouselContainer(
        title: 'Have food at Home to Donate?',
        subTitle: 'Be first in your neighborhood.',
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (builder) => const DonateFood(),
            ),
          );
        },
      ),
      CustomCarouselContainer(
        title: 'Support a local charity!',
        subTitle: 'Be the helping hand.',
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (builder) => const DonateMoney(),
            ),
          );
        },
      ),
    ];

    return Scaffold(
      endDrawer: const MenuDrawer(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Gap(60),
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.location_on,
                        color: ConstColors.pkColor, size: 30),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Helwan High Street',
                          style: ConstFonts.font400,
                        ),
                        Text(
                          '14, Main street, Helwan, Cairo',
                          style: TextStyle(color: ConstColors.kGreyColor),
                        ),
                      ],
                    ),
                  ],
                ),
                Icon(
                  Icons.notification_add_sharp,
                  size: 27,
                ),
              ],
            ),
            const Gap(5),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const SizedBox(
                  width: 330,
                  height: 50,
                  child: TextField(
                    decoration: InputDecoration(
                      prefixIcon: Icon(
                        Icons.search,
                        color: ConstColors.kDarkGrey,
                      ),
                      hintText: 'Search here',
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(12)),
                        borderSide: BorderSide(color: ConstColors.kGreyColor),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(
                          Radius.circular(12),
                        ),
                        borderSide: BorderSide(color: ConstColors.kGreyColor),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Container(
                  width: 40,
                  height: 47,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    color: ConstColors.pkColor,
                  ),
                  child: const Icon(
                    Icons.settings_input_composite,
                    size: 30,
                    color: ConstColors.kWhiteColor,
                  ),
                ),
              ],
            ),
            const Gap(10),
            CarouselSlider(
              carouselController: carouselController,
              items: items,
              options: CarouselOptions(
                onScrolled: (val) {
                  _pageIndexNotifier.value = val!.toInt();
                  setState(() {
                    currentCar = val.toInt();
                  });
                },
                height: 170,
                enlargeCenterPage: true,
                autoPlay: true,
                initialPage: _pageIndexNotifier.value,
                aspectRatio: 16 / 9,
                autoPlayCurve: Curves.fastOutSlowIn,
                enableInfiniteScroll: false,
                autoPlayAnimationDuration: const Duration(microseconds: 500),
                viewportFraction: 1,
                scrollDirection: Axis.horizontal,
              ),
            ),
            const Gap(20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                DotsIndicator(
                  mainAxisAlignment: MainAxisAlignment.center,
                  dotsCount: items.length,
                  position: currentCar == 0 ? 0 : 1,
                  decorator: const DotsDecorator(
                    color: ConstColors.kGreyColor, // Inactive color
                    activeColor: ConstColors.pkColor,
                  ),
                ),
              ],
            ),
            const Gap(10),
            const Text(
              'Categories',
              style: ConstFonts.font400,
              textAlign: TextAlign.start,
            ),
            const Gap(10),
            const CategoryContainer(),
            MainTitle(
              mainTitle: 'Recommended for you',
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (builder) => const RecommendedForU(),
                  ),
                );
              },
            ),
            const CustomBoxListView(
              backGroundImage: 'assets/images/IMG0587.png',
              imageTitle: 'Mosque of Caire',
              title: 'Surprise Bag',
              avatarImage: 'assets/images/image1(1).png',
              subTitle: 'Collect tomorrow: 12:50 AM - 01:55 AM',
              price: '4.99',
              rate: '4.8',
            ),
            // const MainTitle(mainTitle: 'Save before it’s too late'),
            // const ContainerWithMenu(),
            const Gap(10),
            const MainTitle(mainTitle: 'Collect for lunch'),
            const CustomBoxListView(
              backGroundImage: 'assets/images/IMG0587.png',
              imageTitle: 'Mosque of Caire',
              title: 'Surprise Bag',
              avatarImage: 'assets/images/image1(1).png',
              subTitle: 'Collect tomorrow: 12:50 AM - 01:55 AM',
              price: '4.99',
              rate: '4.8',
            ),
            const Gap(10),
            const MainTitle(mainTitle: 'Collect for dinner'),
            const CustomBoxListView(
              backGroundImage: 'assets/images/IMG0587.png',
              imageTitle: 'Mosque of Caire',
              title: 'Surprise Bag',
              avatarImage: 'assets/images/image1(1).png',
              subTitle: 'Collect tomorrow: 12:50 AM - 01:55 AM',
              price: '4.99',
              rate: '4.8',
            ),
            const Gap(10),
            const MainTitle(mainTitle: 'Collect tomorrow'),
            const CustomBoxListView(
              backGroundImage: 'assets/images/IMG0587.png',
              imageTitle: 'Mosque of Caire',
              title: 'Surprise Bag',
              avatarImage: 'assets/images/image1(1).png',
              subTitle: 'Collect tomorrow: 12:50 AM - 01:55 AM',
              price: '4.99',
              rate: '4.8',
            ),
            const Gap(10),
            const MainTitle(mainTitle: 'Vegetarian Food'),
            const CustomBoxListView(
              backGroundImage: 'assets/images/IMG0587.png',
              imageTitle: 'Mosque of Caire',
              title: 'Surprise Bag',
              avatarImage: 'assets/images/image1(1).png',
              subTitle: 'Collect tomorrow: 12:50 AM - 01:55 AM',
              price: '4.99',
              rate: '4.8',
            ),
            const Text(
              'Your favourites',
              style: ConstFonts.fontBold,
            ),
            const CustomBoxListView(
              backGroundImage: 'assets/images/IMG0587.png',
              imageTitle: 'Mosque of Caire',
              title: 'Surprise Bag',
              avatarImage: 'assets/images/image1(1).png',
              subTitle: 'Collect tomorrow: 12:50 AM - 01:55 AM',
              price: '4.99',
              rate: '4.8',
            ),
          ],
        ),
      ),
    );
  }
}
