import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/cat_market_details.dart';
import 'package:wastend/utils/constants.dart';

class MarketCatSnackBar extends StatefulWidget {
  const MarketCatSnackBar({
    super.key,
    this.meal = const {},
  });
  final Map<String, dynamic> meal;
  @override
  State<MarketCatSnackBar> createState() => _MarketCatSnackBarState();
}

Map<String, dynamic> mealbyId = {};

class _MarketCatSnackBarState extends State<MarketCatSnackBar> {
  @override
  void initState() {
    super.initState();
    mealbyId = widget.meal;
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: 1,
        itemBuilder: (context, index) {
          log(mealbyId.length.toString());
          return SizedBox(
            child: Column(
              children: [
                ListTile(
                  style: ListTileStyle.list,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 12),
                  leading: CircleAvatar(
                    backgroundImage: NetworkImage(
                      "$baseUrl/uploads/" + mealbyId['mealPhoto'],
                    ),
                  ),
                  title: Text(
                    mealbyId['name'],
                    style: ConstFonts.fontBold,
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        mealbyId['description'],
                      ),
                      Text(
                        '${mealbyId['pickupDay']}: ${mealbyId['createdDate']}',
                      ),
                      Text(
                        '${mealbyId['price']}\$',
                        style: const TextStyle(
                            color: ConstColors.pkColor,
                            fontWeight: FontWeight.w500),
                      ),
                    ],
                  ),
                  trailing: const Icon(Icons.arrow_forward_ios),
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => CatMarketDetail(
                                  mealbyId: mealbyId,
                                )));
                  },
                ),
                const Divider()
              ],
            ),
          );
        });
  }
}
