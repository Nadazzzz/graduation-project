import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/my_fav1_screen.dart';
import 'package:wastend/screens/rewards_screen.dart';
import 'package:wastend/utils/constants.dart';
import 'package:wastend/widgets/custom_list_tile.dart';

import '../utils/shared_prefrance/pref_manager.dart';

class MenuDrawer extends StatefulWidget {
  const MenuDrawer({
    super.key,
  });

  @override
  State<MenuDrawer> createState() => _MenuDrawerState();
}

class _MenuDrawerState extends State<MenuDrawer> {
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
        log(res.data['message']);
        setState(() {
          allFav = res.data;
          msg = res.data['message'];
        });
        // if (res.data['message'] == "Meal added to favorites") {
        //   ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        //       content: Center(
        //     child: Text('Meal added to favorites'),
        //   )));
        // }
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.white,
      width: 250,
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const Gap(100),
          Row(
            children: [
              IconButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  icon: const Icon(
                    Icons.arrow_back_ios,
                    size: 16,
                  )),
              const Text(
                'Menu',
                style: TextStyle(
                  color: ConstColors.kDarkGrey,
                  fontSize: 24,
                ),
              ),
            ],
          ),
          const Gap(60),
          CustomListTile(
            icon: Icons.heart_broken_outlined,
            title: 'My favourites',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const MyFavourite1()),
              );
            },
          ),
          const Gap(20),
          const Divider(),
          const Gap(20),
          CustomListTile(
            icon: Icons.card_giftcard,
            title: 'Rewards',
            onTap: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const RewardsScreen()));
            },
          ),
          const Divider(),
        ],
      ),
    );
  }
}
