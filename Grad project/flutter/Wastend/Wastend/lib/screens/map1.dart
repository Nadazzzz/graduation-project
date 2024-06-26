import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/utils/constants.dart';

import 'package:wastend/widgets/custom_button.dart';
import 'package:wastend/widgets/menu_drawer.dart';

import 'google_map_screen.dart';

class HomeMap1 extends StatefulWidget {
  const HomeMap1({super.key});

  @override
  State<HomeMap1> createState() => _HomeMap1State();
}

class _HomeMap1State extends State<HomeMap1>
    with SingleTickerProviderStateMixin {
  late TabController tabController;

  late List items = [];

  Future nearby() async {
    try {
      final Response<dynamic> res = await Dio().get(
        "$baseUrl/meal/meals?option=Nearby&Location=31.204693132035644,30.10632244043151",
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      ); 
      if (res.statusCode == 200) {
        log(res.data[1]['name']);
        setState(() {
          items = res.data;
        });
        log(items[0]['name']);
      }
    } on Exception catch (e) {
      log(e.toString());
    }
  }

  @override
  void initState() {
    super.initState();
    nearby();
    tabController = TabController(length: 2, vsync: this);
  }

  String? sortBy;

  @override
  Widget build(BuildContext context) {
    var mapCont = Expanded(
      child: Container(
        height: 230,
        width: 350,
        decoration: const BoxDecoration(
          shape: BoxShape.rectangle,
        ),
        child: ListView.builder(
          scrollDirection: Axis.vertical,
          shrinkWrap: true,
          // physics: const NeverScrollableScrollPhysics(),
          itemCount: items.length,
          itemBuilder: (context, index) {
            var data = items[index];

            // log(_data[index].toString());
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
                  // border: Border.all(color: ConstColors.kgreyeColor),
                  shape: BoxShape.rectangle,
                  borderRadius: const BorderRadius.all(Radius.circular(8)),
                ),
                child: Column(
                  children: [
                    // const Gap(5),
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
                                image: NetworkImage(
                                  baseUrl + data['mealPhoto'],
                                ),
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
                                          data['category'] ?? '',
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
                                data['name'] ?? '',
                                style:
                                    ConstFonts.fontBold.copyWith(fontSize: 16),
                              ),
                              Text(
                                data['description'] ?? '',
                                style: ConstFonts.font400,
                              ),
                              Row(
                                children: [
                                  // Text(
                                  //   "${_data['price']}\$",
                                  //   style: TextStyle(
                                  //       color:
                                  //           ConstColors.pkColor,
                                  //       fontWeight:
                                  //           FontWeight.bold,
                                  //       fontSize: 16),
                                  // ),
                                  const Gap(170),
                                  Row(
                                    children: [
                                      IconButton(
                                        onPressed: () {},
                                        icon: const Icon(Icons.star,
                                            color: Color.fromARGB(
                                                255, 255, 185, 56)),
                                      ),
                                      const Text(
                                        "5.0",
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
    return Scaffold(
      endDrawer: const MenuDrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Gap(40),
          const Padding(
            padding: EdgeInsets.all(12),
            child: Row(
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
          ),
          const Gap(5),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
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
                        // hintText: 'Search here',
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(12)),
                          borderSide: BorderSide(color: ConstColors.kGreyColor),
                        ),
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(12)),
                            borderSide:
                                BorderSide(color: ConstColors.kGreyColor))),
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
          ),
          // const Gap(20),
          Padding(
            padding: const EdgeInsets.all(12),
            child: TabBar(
              dragStartBehavior: DragStartBehavior.start,
              indicatorSize: TabBarIndicatorSize.label,
              // automaticIndicatorColorAdjustment: false,
              labelColor: ConstColors.kWhiteColor,
              unselectedLabelColor: ConstColors.pkColor,
              isScrollable: true,
              indicatorColor: ConstColors.pkColor,
              tabAlignment: TabAlignment.start,
              controller: tabController,
              tabs: [
                Tab(
                  height: 50,
                  child: CustomButton(
                    buttonText: 'List',
                    widthCont: 165,
                    heightCont: 60,
                    contColor: tabController.index == 0
                        ? ConstColors.pkColor
                        : ConstColors.kWhiteColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                Tab(
                  height: 50,
                  child: CustomButton(
                    buttonText: 'Map',
                    widthCont: 165,
                    heightCont: 60,
                    contColor: tabController.index == 1
                        ? ConstColors.pkColor
                        : ConstColors.kWhiteColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ],
              onTap: (val) {
                setState(() {
                  tabController.index = val;
                });
              },
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: TabBarView(controller: tabController, children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    /*     Row(
                      children: [
                        const Padding(
                          padding: EdgeInsets.only(left: 16),
                          child: Text(
                            'Sort by :',
                            style: TextStyle(fontWeight: FontWeight.w600),
                          ),
                        ),
                        TextButton(
                          onPressed: () {
                            showModalBottomSheet(
                                elevation: 1,
                                useSafeArea: true,
                                context: context,
                                builder: (context) {
                                  return Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 20),
                                    child: Column(
                                      children: [
                                        const Gap(50),
                                        const Center(
                                          child: Text(
                                            'Sort by',
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                                fontSize: 20,
                                                color: ConstColors.kDarkGrey),
                                          ),
                                        ),
                                        const Divider(),
                                        const Gap(20),
                                        Row(
                                          children: [
                                            const Text(
                                              'Near by ',
                                              style: ConstFonts.font400,
                                            ),
                                            const Spacer(),
                                            Radio(
                                                activeColor:
                                                    ConstColors.pkColor,
                                                value: "nearby ",
                                                groupValue: sortBy,
                                                onChanged: (val) {
                                                  setState(() {
                                                    sortBy = val;
                                                  });
                                                }),
                                          ],
                                        ),
                                        const Gap(10),
                                        Row(
                                          children: [
                                            const Text(
                                              'Price',
                                              style: ConstFonts.font400,
                                            ),
                                            const Spacer(),
                                            Radio(
                                                activeColor:
                                                    ConstColors.pkColor,
                                                value: "price",
                                                groupValue: sortBy,
                                                onChanged: (val) {
                                                  setState(() {
                                                    sortBy = val;
                                                  });
                                                }),
                                          ],
                                        ),
                                        const Gap(10),
                                        Row(
                                          children: [
                                            const Text(
                                              'Rating',
                                              style: ConstFonts.font400,
                                            ),
                                            const Spacer(),
                                            Radio(
                                                activeColor:
                                                    ConstColors.pkColor,
                                                value: "rating",
                                                groupValue: sortBy,
                                                onChanged: (val) {
                                                  setState(() {
                                                    sortBy = val;
                                                  });
                                                }),
                                          ],
                                        ),
                                      ],
                                    ),
                                  );
                                });
                          },
                          child: const Row(
                            children: [
                              Text(
                                'Near by',
                                style: TextStyle(
                                  color: ConstColors.pkColor,
                                ),
                              ),
                              Icon(
                                Icons.keyboard_arrow_down_sharp,
                                color: ConstColors.kDarkGrey,
                              )
                            ],
                          ),
                        ),
                      ],
                    ),*/
                    mapCont,
                  ],
                ),
                const MapScreen()
              ]),
            ),
          ),
        ],
      ),
    );
  }
}
