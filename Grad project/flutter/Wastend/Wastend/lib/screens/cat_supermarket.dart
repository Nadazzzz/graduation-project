import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';

import '../widgets/market_cat_list_view.dart';

class SuperMarkets extends StatefulWidget {
  const SuperMarkets({super.key});

  @override
  State<SuperMarkets> createState() => _SuperMarketsState();
}

class _SuperMarketsState extends State<SuperMarkets> {
  GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        title: const Text(
          ' Supermarkets',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
      body: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          const Gap(20),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                const SizedBox(
                  width: 300,
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
          const Gap(10),
          const Expanded(child: MarketCatListView()),
        ],
      ),
    );
  }
}
