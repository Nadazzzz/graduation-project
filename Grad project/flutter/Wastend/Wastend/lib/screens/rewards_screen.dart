import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/utils/constants.dart';

import '../utils/shared_prefrance/pref_manager.dart';

class RewardsScreen extends StatefulWidget {
  const RewardsScreen({super.key});

  @override
  State<RewardsScreen> createState() => _RewardsScreenState();
}

class _RewardsScreenState extends State<RewardsScreen> {
  String? userId;
  List disRewards = [];

  Future displayRewards() async {
    userId = PrefManager.getToken();
    try {
      final Response<dynamic> res = await Dio().get("$baseUrl/rewards/$userId",
          options: Options(
            headers: {
              'Content-Type': 'application/json',
            },
          ));
      if (res.statusCode == 200) {
        log(res.data['rewards'].toString());
        setState(() {
          disRewards = res.data['rewards'];
        });
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  @override
  void initState() {
    super.initState();
    displayRewards();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ConstColors.kGreyColor,
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Rewards',
          style: TextStyle(color: ConstColors.kWhiteColor),
        ),
        backgroundColor: ConstColors.kGreyColor,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Divider(),
          const Gap(30),
          Container(
            height: MediaQuery.of(context).size.height / 1.3,
            width: MediaQuery.of(context).size.width / 1.1,
            padding: const EdgeInsets.all(15),
            decoration: const BoxDecoration(
              color: ConstColors.kWhiteColor,
            ),
            child: ListView.builder(
              physics: const AlwaysScrollableScrollPhysics(),
              scrollDirection: Axis.vertical,
              itemCount: disRewards.length,
              itemBuilder: (context, index) {
                var data = disRewards[index];
                return Padding(
                  padding: const EdgeInsets.all(10),
                  child: Container(
                      width: 400,
                      height: 60,
                      padding: const EdgeInsets.all(12),
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: disRewards.isEmpty
                            ? ConstColors.pkColor
                            : ConstColors.kGreyColor.withOpacity(.3),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          GestureDetector(
                            onTap: () {
                              log(userId.toString());
                              Future rewards() async {
                                try {
                                  final Response<dynamic> res =
                                      await Dio().post(
                                    "$baseUrl/rewards/redeem/$userId",
                                    options: Options(
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                    ),
                                  );
                                  if (res.statusCode == 201) {
                                    log(res.data['message']);
                                    log('201');
                                  } else if (res.statusCode == 400) {
                                    log('400');
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                        content: Center(
                                          child: Text(
                                              'Not enough purchased meals to redeem the reward'),
                                        ),
                                      ),
                                    );
                                  }
                                } on Exception catch (e) {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                      content: Center(
                                        child: Text(
                                            'Not enough purchased meals to redeem the reward'),
                                      ),
                                    ),
                                  );
                                  log(e.toString());
                                }
                              }

                              rewards();
                            },
                            child: Text(
                              data.toString(),
                              style: ConstFonts.fontBold
                                  .copyWith(color: ConstColors.kWhiteColor),
                            ),
                          ),
                          const Gap(5),
                          disRewards.length == 1
                              ? const Icon(
                                  Icons.celebration_rounded,
                                  color: ConstColors.kRed,
                                )
                              : const Icon(
                                  Icons.lock,
                                  color: ConstColors.kWhiteColor,
                                )
                        ],
                      )),
                );
              },
            ),
          )
        ],
      ),
    );
  }
}
