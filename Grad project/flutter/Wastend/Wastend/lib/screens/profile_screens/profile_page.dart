import 'dart:developer';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/profile_screens/account_information.dart';
import 'package:wastend/screens/profile_screens/logout.dart';
import 'package:wastend/screens/profile_screens/settings.dart';
import 'package:wastend/widgets/custom_list_tile.dart';
import 'package:wastend/widgets/profile_cont.dart';

import '../../utils/constants.dart';
import '../../utils/shared_prefrance/pref_manager.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  late Map<String, dynamic> userInfo = {};
  late final String? userId;
  late final String? uId;
  @override
  void initState() {
    super.initState();
    // Call the getAccountInfo method when the widget is initialized
    fetchUserInfo();
    fetchProfile();
  }

  Future fetchUserInfo() async {
    userId = PrefManager.getToken();

    try {
      final Response<dynamic> res = await Dio().get(
        "$baseUrl/user/account-info/$userId",
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log(res.data['username']);

        // Handle Succes State -> save user id and navigate
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  Future fetchProfile() async {
    uId = PrefManager.getToken();
    print(userId);
    try {
      final Response<dynamic> res = await Dio().get(
        "$baseUrl/user/profile/$userId",
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log(res.data['username']);
      }
      setState(() {
        // Update the state with the fetched user info
        userInfo = res.data;
      });
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    Future getProfileImage() async {
      final Response<dynamic> res =
          await Dio().get("$baseUrl/uploads/${userInfo['photo']}");
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Profile',
          style: ConstFonts.fontBold,
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Divider(
              color: ConstColors.kDarkGrey,
            ),
            const Gap(30),
            Padding(
              padding: const EdgeInsets.only(left: 30),
              child: Row(
                children: [
                  Container(
                    width: 100,
                    height: 100,
                    // padding: const EdgeInsets.only(left: 15),
                    decoration: BoxDecoration(
                      // color: Colors.red,
                      shape: BoxShape.circle,
                      image: DecorationImage(
                        image: NetworkImage(
                          '$baseUrl/uploads/${userInfo['photo']}',
                        ),
                        fit: BoxFit.fill,
                      ),
                    ),
                    child: Stack(
                      fit: StackFit.loose,
                      alignment: Alignment.bottomRight,
                      children: [
                        Positioned(
                          top: 60,
                          child: CircleAvatar(
                            backgroundColor: ConstColors.pkColor,
                            radius: 20,
                            child: IconButton(
                              alignment: Alignment.center,
                              onPressed: () {},
                              icon: const Icon(
                                Icons.camera_alt_outlined,
                                color: ConstColors.kWhiteColor,
                                size: 26,
                              ),
                            ),
                          ),
                        ),
                        const Positioned(
                          bottom: 5,
                          right: 3,
                          child: CircleAvatar(
                            backgroundColor: ConstColors.kWhiteColor,
                            radius: 8,
                            child: Icon(
                              Icons.add,
                              color: ConstColors.pkColor,
                              size: 18,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Gap(20),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        userInfo['username'] ?? '',
                        style: ConstFonts.fontBold,
                      ),
                      Text(
                        userInfo['email'] ?? '',
                        style: ConstFonts.font400
                            .copyWith(color: ConstColors.kGreyColor),
                      ),
                    ],
                  )
                ],
              ),
            ),
            const Gap(50),
            Padding(
              padding: const EdgeInsets.only(left: 30),
              child: Text(
                'Your impact',
                style:
                    ConstFonts.font400.copyWith(color: ConstColors.kDarkGrey),
              ),
            ),
            const Gap(20),
            Row(
              children: [
                ProfileContainer(
                  image: 'assets/images/cutlery2.png',
                  savedNum: userInfo['mealsSaved'].toString(),
                  savedType: 'Meals Saved',
                ),
                ProfileContainer(
                  image: 'assets/images/la_money-bill-wave.png',
                  savedNum: userInfo['moneySaved'].toString(),
                  savedType: 'Money Saved',
                ),
              ],
            ),
            const Gap(30),
            Padding(
              padding: const EdgeInsets.only(left: 30),
              child: Column(
                children: [
                  CustomListTile(
                    icon: Icons.person_pin,
                    title: 'Account Information',
                    onTap: () {
                      Navigator.of(context).push(MaterialPageRoute(
                          builder: (builder) => AccountInformation(
                                userInfo: userInfo,
                                uId: userId!,
                              )));
                    },
                  ),
                  const Gap(10),
                  CustomListTile(
                    icon: Icons.settings_outlined,
                    title: 'Settings',
                    onTap: () {
                      Navigator.of(context).push(MaterialPageRoute(
                          builder: (builder) => const Settings()));
                    },
                  ),
                  /*      const Gap(10),
                  const CustomListTile(
                    icon: Icons.help_outline,
                    title: 'Help centre',
                  ),*/
                  const Gap(10),
                  CustomListTile(
                    icon: Icons.logout,
                    title: 'Log out',
                    onTap: () {
                      Navigator.of(context).push(MaterialPageRoute(
                          builder: (builder) => const LogoutScreen()));
                    },
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
