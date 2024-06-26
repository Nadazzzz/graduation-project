import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';

import '../utils/shared_prefrance/pref_manager.dart';

class RecommendedContainer extends StatefulWidget {
  const RecommendedContainer({
    Key? key,
    this.data = const {},
    this.dataList = const [],
    this.itemCount,
    this.price = '5.99',
    this.subTitle,
    this.title,
    this.rate = 2.7,
    this.isRecommended = false,
  }) : super(key: key);

  final dynamic itemCount;
  final dynamic data;
  final List dataList;
  final String? title;
  final String? subTitle;
  final String price;
  final double? rate;
  final bool isRecommended;

  @override
  State<RecommendedContainer> createState() => _RecommendedContainerState();
}

class _RecommendedContainerState extends State<RecommendedContainer> {
  List items = [
    {
      'image': 'assets/images/pizzaf.jpg',
      'Title': 'pizza',
      'subtitle': 'very good',
      'price': '3.3',
    },
    {
      'image': 'assets/images/aa.jpg',
      'Title': 'chicken',
      'subtitle': 'very good',
      'price': '7.7',
    },
    {
      'image': 'assets/images/meat.jpg',
      'Title': 'meat',
      'subtitle': 'very good',
      'price': '9.8',
    },
  ];
  bool _isLoading = false;

  Future fetchCategories(BuildContext context) async {
    try {
      setState(() {
        _isLoading = true;
      });
      final String? uid = PrefManager.getToken();
      final Response<dynamic> res = await Dio().get(
        'http://192.168.1.9:5000/recommend', // Replace <your_local_ip> with your actual IP address
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
        data: {'user_id': '${PrefManager.getToken()}'},
      );

      if (res.statusCode == 200) {
        log("${res}aaaa");
        if (mounted) {
          setState(() {
            _isLoading = false;
          });
        }
      }
    } on DioException catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
      final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
      ScaffoldMessenger.of(scaffoldKey.currentContext!).showSnackBar(
        SnackBar(
          content: Center(
            child: Text(
              e.message.toString(),
            ),
          ),
        ),
      );
    }
  }

  @override
  void initState() {
    super.initState();
    if (widget.isRecommended) {
      fetchCategories(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        height: 230,
        width: 350,
        decoration: const BoxDecoration(
          shape: BoxShape.rectangle,
        ),
        child: ListView.builder(
          scrollDirection: Axis.vertical,
          shrinkWrap: true,
          itemCount: items.length,
          itemBuilder: (context, index) {
            return Padding(
              padding: const EdgeInsets.all(12),
              child: Container(
                decoration: BoxDecoration(
                  color: const Color.fromRGBO(255, 255, 255, 1),
                  boxShadow: [
                    BoxShadow(
                      color: ConstColors.kGreyColor.withOpacity(0.5),
                      spreadRadius: 2,
                      blurRadius: 5,
                      offset: const Offset(0, 3),
                    )
                  ],
                  shape: BoxShape.rectangle,
                  borderRadius: const BorderRadius.all(Radius.circular(8)),
                ),
                child: Column(
                  children: [
                    Column(
                      children: [
                        Container(
                            height: 130,
                            width: 380,
                            padding: const EdgeInsets.only(top: 10, left: 10),
                            decoration: BoxDecoration(
                              shape: BoxShape.rectangle,
                              borderRadius: const BorderRadius.only(
                                  topLeft: Radius.circular(6),
                                  topRight: Radius.circular(6)),
                              image: DecorationImage(
                                image: AssetImage(items[index]['image']),
                                fit: BoxFit.fill,
                              ),
                            ),
                            child: Stack(
                              alignment: Alignment.topCenter,
                              children: [
                                Align(
                                  alignment: AlignmentDirectional.topStart,
                                  child: CircleAvatar(
                                    backgroundColor: const Color(0xffdddddd),
                                    child: IconButton(
                                        alignment: Alignment.topRight,
                                        onPressed: () {},
                                        icon: const Icon(
                                          Icons.heart_broken_outlined,
                                          color: ConstColors.kWhiteColor,
                                        )),
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
                                          widget.title ?? items[index]['Title'],
                                          style: const TextStyle(
                                              fontWeight: FontWeight.bold,
                                              color: ConstColors.kWhiteColor),
                                        ),
                                        const CircleAvatar(
                                            backgroundImage: AssetImage(
                                                'assets/images/image1(1).png'))
                                      ],
                                    ),
                                  ),
                                )
                              ],
                            )),
                        const Gap(5),
                        Padding(
                          padding: const EdgeInsets.only(left: 30),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                widget.title ?? items[index]['Title'],
                                style:
                                    ConstFonts.fontBold.copyWith(fontSize: 16),
                              ),
                              Text(
                                widget.subTitle ?? items[index]['subtitle'],
                                style: ConstFonts.font400,
                              ),
                              Row(
                                children: [
                                  Text(
                                    "${items[index]['price']}\$",
                                    style: const TextStyle(
                                        color: ConstColors.pkColor,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16),
                                  ),
                                  const Gap(170),
                                  Row(
                                    children: [
                                      IconButton(
                                        onPressed: () {},
                                        icon: const Icon(Icons.star,
                                            color: Color.fromARGB(
                                                255, 255, 185, 56)),
                                      ),
                                      Text(
                                        widget.rate.toString(),
                                        style: ConstFonts.font400,
                                      ),
                                    ],
                                  )
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
