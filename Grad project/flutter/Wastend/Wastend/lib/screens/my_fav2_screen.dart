import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/utils/constants.dart';
import 'package:wastend/widgets/custom_button.dart';
import 'package:wastend/widgets/recommended_cont.dart';

import '../utils/shared_prefrance/pref_manager.dart';
import 'my_fav1_screen.dart';

class MyFavourite2 extends StatefulWidget {
  const MyFavourite2({super.key});

  @override
  State<MyFavourite2> createState() => _MyFavourite2State();
}

class _MyFavourite2State extends State<MyFavourite2> {
  String? userId;
  String? msg;
  Map<String, dynamic> allFav = {};

  Future allFavorites() async {
    userId = PrefManager.getToken();

    try {
      final Response<dynamic> res = await Dio().get(
        "$baseUrl/user/favoriteMeals/$userId",
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log('data ${res.data.toString()}');
        setState(() {
          allFav = res.data;
          log('allFav${allFav['message']}');
          msg = res.data['message'];
        });
        if (res.data['message'] == "Meal added to favorites") {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
              content: Center(
            child: Text('Meal added to favorites'),
          )));
        }
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  @override
  void initState() {
    super.initState();
    allFavorites();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My favourite'),
        centerTitle: true,
      ),
      body: msg == "Meal added to favorites"
          ? Padding(
              padding: const EdgeInsets.all(12),
              child: Center(
                child: Column(
                  children: [
                    const Divider(),
                    const Gap(150),
                    Text(
                      'No favourites added yet',
                      style: ConstFonts.fontBold
                          .copyWith(color: ConstColors.pkColor),
                    ),
                    const Gap(60),
                    const Text(
                      'Tap the heart icon on a store to add it to your favourites and it will show up here.',
                      style: ConstFonts.font400,
                      textAlign: TextAlign.center,
                    ),
                    const Gap(200),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 18.0),
                      child: CustomButton(
                        buttonText: 'Find ',
                        contColor: ConstColors.pkColor,
                        textColor: ConstColors.kWhiteColor,
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  ],
                ),
              ),
            )
          : ListView(
              padding: const EdgeInsets.all(12),
              children: [
                allFav['message'] == null
                    ? SizedBox(
                        height: MediaQuery.of(context).size.height / 1,
                        child: RecommendedContainer(
                          itemCount: allFav.length,
                          data: allFav,
                          title: allFav['title'].toString(),
                          subTitle: 'data',
                          price: '555555',
                        ),
                      )
                    : SizedBox(
                        height: MediaQuery.of(context).size.height / 1,
                        child: const MyFavourite1(),
                      )
              ],
            ),
    );
  }
}
