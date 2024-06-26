import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';

import '../utils/constants.dart';
import '../utils/shared_prefrance/pref_manager.dart';

class CustomBoxListView extends StatefulWidget {
  const CustomBoxListView({
    super.key,
    required this.backGroundImage,
    required this.imageTitle,
    required this.title,
    required this.avatarImage,
    required this.subTitle,
    required this.price,
    required this.rate,
  });

  final String backGroundImage;
  final String imageTitle;
  final String avatarImage;
  final String title;
  final String subTitle;
  final String price;
  final String rate;

  @override
  State<CustomBoxListView> createState() => _CustomBoxListViewState();
}

class _CustomBoxListViewState extends State<CustomBoxListView> {
  List surpriseBag = [];
  bool _isLoading = false;
  bool isRed = false;
  String userId = '';

  @override
  void initState() {
    super.initState();

    fetchSurpriseBag();
  }

  Future fetchSurpriseBag() async {
    try {
      setState(() {
        _isLoading = true;
      });
      final Response<dynamic> res = await Dio().get(
        "$baseUrl/meal/surprise-bag",
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log(res.data[0]['name']);
        WidgetsBinding.instance.addPostFrameCallback((_) {
          setState(() {
            surpriseBag = res.data;
            _isLoading = false;
          });
        });
      }
    } on DioException catch (e) {
      setState(() {
        _isLoading = false;
      });
      log(e.response.toString());
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Center(
            child: Text(
              e.response!.data['errors'].first['msg'].toString(),
            ),
          ),
        ),
      );
    }
  }

  Future addToFavorite() async {
    userId = PrefManager.getToken()!;
    try {
      Map<String, dynamic> reqData = {
        "userId": userId,
        "mealId": "65e3120d9810ac7a1948bee2",
      };
      final Response<dynamic> res = await Dio().post(
        "$baseUrl/user/addToFavorites",
        data: reqData,
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log(res.data['message']);
        setState(() {
          isRed = !isRed;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
              content: Center(
            child: Text('meal add to favorites'),
          )),
        );
      } else if (res.statusCode == 400) {
        log('400');
        setState(() {
          isRed == true;
        });
        return ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
              content: Center(
            child: Text('meal already added to favorites'),
          )),
        );
      }
    } on Exception catch (e) {
      log(e.toString());
      setState(() {
        isRed = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 260,
      width: 400,
      decoration: const BoxDecoration(
        shape: BoxShape.rectangle,
      ),
      child: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : surpriseBag.isEmpty
              ? const Center(
                  child: Icon(
                    Icons.error,
                    color: Colors.grey,
                    size: 40.0,
                  ),
                )
              : ListView.builder(
                  scrollDirection: Axis.horizontal,
                  shrinkWrap: true,
                  // physics: const NeverScrollableScrollPhysics(),
                  itemCount: surpriseBag.length,
                  itemBuilder: (context, index) {
                    // var surpriseBagData = surpriseBag[index];
                    return Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 12),
                      child: Container(
                        decoration: BoxDecoration(
                          color: ConstColors.kWhiteColor,
                          boxShadow: [
                            BoxShadow(
                              color: ConstColors.kGreyColor.withOpacity(0.5),
                              spreadRadius: 2,
                              blurRadius: 5,
                              offset: const Offset(0, 3),
                            )
                          ],
                          shape: BoxShape.rectangle,
                          borderRadius:
                              const BorderRadius.all(Radius.circular(8)),
                        ),
                        child: Column(
                          children: [
                            Column(
                              children: [
                                Container(
                                  height: 130,
                                  width: 340,
                                  padding:
                                      const EdgeInsets.only(top: 10, left: 10),
                                  decoration: BoxDecoration(
                                    shape: BoxShape.rectangle,
                                    borderRadius: const BorderRadius.only(
                                      topLeft: Radius.circular(8),
                                      topRight: Radius.circular(8),
                                    ),
                                    image: DecorationImage(
                                      image: NetworkImage(
                                        '$baseUrl${surpriseBag[index]['mealPhoto']}',
                                      ),
                                      fit: BoxFit.fill,
                                    ),
                                  ),
                                  child: Stack(
                                    alignment: Alignment.topCenter,
                                    children: [
                                      Align(
                                        alignment:
                                            AlignmentDirectional.topStart,
                                        child: CircleAvatar(
                                          backgroundColor:
                                              const Color(0xffdddddd),
                                          child: IconButton(
                                            alignment: Alignment.topRight,
                                            onPressed: () {
                                              addToFavorite();
                                            },
                                            icon: Icon(
                                              Icons.heart_broken_outlined,
                                              color: isRed == false
                                                  ? ConstColors.kWhiteColor
                                                  : ConstColors.kRed,
                                            ),
                                          ),
                                        ),
                                      ),
                                      Align(
                                        alignment: Alignment.bottomCenter,
                                        child: Padding(
                                          padding: const EdgeInsets.all(6),
                                          child: Row(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              Text(
                                                surpriseBag[index]['name'],
                                                style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  color:
                                                      ConstColors.kWhiteColor,
                                                ),
                                              ),
                                              CircleAvatar(
                                                backgroundImage: AssetImage(
                                                    widget.avatarImage),
                                              ),
                                            ],
                                          ),
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const Gap(5),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  surpriseBag[index]['description'],
                                  style: ConstFonts.fontBold
                                      .copyWith(fontSize: 16),
                                ),
                                Text(
                                  widget.subTitle,
                                  style: ConstFonts.font400,
                                ),
                                Row(
                                  children: [
                                    Text(
                                      " \$${surpriseBag[index]['price']}",
                                      style: const TextStyle(
                                        color: ConstColors.pkColor,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16,
                                      ),
                                    ),
                                    const Gap(200),
                                    Row(
                                      children: [
                                        IconButton(
                                          onPressed: () {},
                                          icon: const Icon(Icons.star,
                                              color: Color.fromARGB(
                                                  255, 255, 185, 56)),
                                        ),
                                        Text(
                                          widget.rate,
                                          style: ConstFonts.font400,
                                        ),
                                      ],
                                    )
                                  ],
                                )
                              ],
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
