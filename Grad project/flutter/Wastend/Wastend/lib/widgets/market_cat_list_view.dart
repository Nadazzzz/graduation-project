import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/utils/constants.dart';
import 'package:wastend/widgets/market_cat_modal_sheet.dart';


class MarketCatListView extends StatefulWidget {
  const MarketCatListView({
    super.key,
  });

  @override
  State<MarketCatListView> createState() => _MarketCatListViewState();
}

class _MarketCatListViewState extends State<MarketCatListView> {
  late List storesMeals = [];
  bool _isLoading = false;
  Map<String, dynamic> mealsId = {};
  Future fetchStoresMeals() async {
    try {
      setState(() {
        _isLoading = true;
      });

      final Response res = await Dio().get(
        '$baseUrl/meal/surprise-bag',
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log(res.data!.toString());
        setState(() {
          storesMeals = res.data;
          _isLoading = false;
        });
      }
    } on Exception catch (e) {
      setState(() {
        _isLoading = false;
      });
      log(e.toString());
    }
  }

  Future mealById(String id) async {
    try {
      setState(() {
        _isLoading = true;
      });
      final Response<dynamic> res = await Dio().get(
        "$baseUrl/meal/meals/$id",
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log(res.data['name']);
        setState(() {
          mealsId = res.data;
          _isLoading = false;
        });
        log(mealsId['name']);
      }
    } on Exception catch (e) {
      setState(() {
        _isLoading = false;
      });
      log(e.toString());
    }
  }

  @override
  void initState() {
    super.initState();
    fetchStoresMeals();
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? const CircularProgressIndicator()
        : ListView.builder(
            scrollDirection: Axis.vertical,
            itemCount: storesMeals.length,
            itemBuilder: (cont, index) {
              var data = storesMeals[index];
              return Container(
                height: 150,
                width: 200,
                padding: const EdgeInsets.all(8),
                decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(8),
                      topRight: Radius.circular(8)),
                  shape: BoxShape.rectangle,
                  // image: DecorationImage(
                  //   image: AssetImage('assets/images/image1(1).png'),
                  //   fit: BoxFit.cover,
                  // ),
                ),
                child: Stack(alignment: Alignment.centerRight, children: [
                  GestureDetector(
                    onTap: () async {
                      await mealById(data['_id']);
                      await showModalBottomSheet(
                          backgroundColor: Colors.white,
                          elevation: 3,
                          // ignore: use_build_context_synchronously
                          context: context,
                          builder: (context) {
                            return Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 12),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Align(
                                    alignment: Alignment.topRight,
                                    child: IconButton(
                                        alignment: Alignment.topRight,
                                        onPressed: () {
                                          Navigator.pop(context);
                                        },
                                        icon: const Icon(Icons.close)),
                                  ),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      SizedBox(
                                        width: 200,
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            FittedBox(
                                              child: Text(
                                                '${mealsId['name']}',
                                                style: ConstFonts.fontBold
                                                    .copyWith(
                                                        color: ConstColors
                                                            .kDarkGrey),
                                              ),
                                            ),
                                            const Gap(5),
                                            Text(
                                              '${mealsId['description']}',
                                              style: const TextStyle(
                                                  color: Color.fromARGB(
                                                      255, 99, 97, 97)),
                                              softWrap: true,
                                            ),
                                            const Gap(5),
                                            Row(
                                              children: [
                                                IconButton(
                                                  onPressed: () {},
                                                  icon: const Icon(Icons.star,
                                                      color: Color.fromARGB(
                                                          255, 255, 185, 56)),
                                                ),
                                                Text(
                                                  '5.0',
                                                  style: ConstFonts.font400
                                                      .copyWith(
                                                          color: ConstColors
                                                              .kDarkGrey),
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                      SizedBox(
                                        width: 100,
                                        child: Column(
                                          children: [
                                            Container(
                                              height: 50,
                                              // width: 100,
                                              decoration: BoxDecoration(
                                                  // borderRadius: BorderRadius.circular(12),
                                                  shape: BoxShape.circle,
                                                  image: DecorationImage(
                                                    image: NetworkImage(
                                                      baseUrl +
                                                          data['mealPhoto'],
                                                    ),
                                                    fit: BoxFit.fill,
                                                  )),
                                            ),
                                            const Gap(30),
                                            /*   CustomButton(
                                              heightCont: 30,
                                              border: Border.all(
                                                color: ConstColors.pkColor,
                                              ),
                                              borderRadius:
                                                  BorderRadius.circular(50),
                                              buttonText: 'About',
                                              onTap: () {},
                                              contColor:
                                                  ConstColors.kWhiteColor,
                                              textColor: ConstColors.pkColor,
                                            ) */
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(),
                                  const Gap(5),
                                  /*     Text(
                                    'Food from this store',
                                    style: ConstFonts.fontBold
                                        .copyWith(color: ConstColors.kDarkGrey),
                                  ),*/
                                  SizedBox(
                                    height: 250,
                                    child: MarketCatSnackBar(
                                      meal: mealsId,
                                    ),
                                  ),
                                ],
                              ),
                            );
                          });
                    },
                    child: Container(
                      height: 150,
                      width: 170,
                      decoration: BoxDecoration(
                        shape: BoxShape.rectangle,
                        borderRadius: const BorderRadius.only(
                            bottomRight: Radius.circular(8),
                            topRight: Radius.circular(8)),
                        image: DecorationImage(
                          image: NetworkImage(
                            baseUrl + data['mealPhoto'],
                          ),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    right: 200,
                    child: SizedBox(
                      width: 170,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            data['name'],
                            style: ConstFonts.fontBold,
                          ),
                          Text(
                            data['description'],
                            style: const TextStyle(fontSize: 17),
                            softWrap: true,
                          ),
                        ],
                      ),
                    ),
                  ),
                  Positioned(
                    right: 115,
                    child: Container(
                      height: 70,
                      width: 100,
                      decoration: const BoxDecoration(
                          // borderRadius: BorderRadius.circular(12),
                          shape: BoxShape.circle,
                          image: DecorationImage(
                            image: AssetImage('assets/images/image1(1).png'),
                            fit: BoxFit.cover,
                          )),
                    ),
                  )
                ]),
              );
            },
          );
  }
}
