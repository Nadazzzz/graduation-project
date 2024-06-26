import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/screens/reserve_page.dart';
import 'package:wastend/utils/constants.dart';
import 'package:wastend/widgets/custom_button.dart';
import 'package:wastend/widgets/market_cat_modal_sheet.dart';

class CatMarketDetail extends StatefulWidget {
  const CatMarketDetail({super.key, this.mealbyId});
  final Map<String, dynamic>? mealbyId;

  @override
  State<CatMarketDetail> createState() => _CatMarketDetailState();
}

class _CatMarketDetailState extends State<CatMarketDetail> {
  String? recievingWay;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Gap(40),
            MarketDetailsCover(
              mealbyId: widget.mealbyId,
            ),
            const Gap(10),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Gap(5),
                  Text(
                    '${widget.mealbyId!['name']}',
                    style: const TextStyle(
                        color: ConstColors.kDarkGrey,
                        fontSize: 18,
                        fontWeight: FontWeight.bold),
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.access_time,
                        size: 18,
                      ),
                      const Gap(5),
                      Text(
                        '${widget.mealbyId?['pickupDay']}: ${widget.mealbyId!['createdDate']}',
                        style: ConstFonts.font400,
                      ),
                    ],
                  ),
                  Text(
                    '${widget.mealbyId?['price']}\$',
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                        color: ConstColors.pkColor),
                  ),
                  Row(
                    children: [
                      Icon(
                        Icons.star,
                        color: Colors.amber.shade300,
                      ),
                      const Gap(5),
                      const Text(
                        '5.0',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      )
                    ],
                  ),
                  const Gap(7),
                  const Divider(),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const Gap(5),
                      const Icon(
                        Icons.location_on,
                        size: 27,
                        color: ConstColors.pkColor,
                      ),
                      const Gap(7),
                      const SizedBox(
                        width: 200,
                        child: Text(
                          '233 Broadway, New York, NY 10279, USE',
                          style: ConstFonts.font400,
                        ),
                      ),
                      const Spacer(),
                      IconButton(
                          onPressed: () {},
                          icon: const Icon(
                            Icons.arrow_forward_ios,
                            size: 18,
                          ))
                    ],
                  ),
                  const Gap(7),
                  const Padding(
                    padding: EdgeInsets.only(left: 40.0),
                    child: Text(
                      'More information about the store',
                      style: TextStyle(color: ConstColors.kGreyColor),
                    ),
                  ),
                  const Gap(7),
                  const Divider(),
                  const Gap(7),
                  const Text(
                    'What you could get',
                    style: ConstFonts.fontBold,
                  ),
                  const Gap(7),
                  const Padding(
                    padding: EdgeInsets.only(left: 40.0),
                    child: Text(
                      'Rescue a Surprise Bag containing a selection of grocery items such as produce, snacks, and more.',
                      style:
                          TextStyle(fontSize: 15, color: ConstColors.kDarkGrey),
                    ),
                  ),
                  const Gap(7),
                  const Divider(),
                  const Gap(14),
                  Row(
                    children: [
                      const Text(
                        'Pick-UP',
                        style: ConstFonts.fontBold,
                      ),
                      const Spacer(),
                      Radio(
                          activeColor: ConstColors.pkColor,
                          value: "pickUp",
                          groupValue: recievingWay,
                          onChanged: (val) {
                            setState(() {
                              recievingWay = val;
                            });
                          }),
                    ],
                  ),
                  const Gap(15),
                  Row(
                    children: [
                      const Text(
                        'Delivery',
                        style: ConstFonts.fontBold,
                      ),
                      const Spacer(),
                      Radio(
                          activeColor: ConstColors.pkColor,
                          value: "delivery",
                          groupValue: recievingWay,
                          onChanged: (val) {
                            setState(() {
                              recievingWay = val;
                            });
                          }),
                    ],
                  ),
                  const Gap(40),
                  CustomButton(
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => ReservePage(
                                    mealbyId: mealbyId,
                                  )));
                    },
                    buttonText: 'Reserve',
                    contColor: ConstColors.pkColor,
                    textColor: ConstColors.kWhiteColor,
                    borderRadius: BorderRadius.circular(23),
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

class MarketDetailsCover extends StatelessWidget {
  const MarketDetailsCover({super.key, this.mealbyId});
  final Map<String, dynamic>? mealbyId;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: double.infinity,
          height: 220,
          decoration: BoxDecoration(
              shape: BoxShape.rectangle,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(8),
                topRight: Radius.circular(8),
              ),
              image: DecorationImage(
                  image: NetworkImage(
                    "$baseUrl/uploads/" + mealbyId!['mealPhoto'],
                  ),
                  fit: BoxFit.cover)),
        ),
        Positioned(
          child: Padding(
            padding: const EdgeInsets.all(10),
            child: Row(
              children: [
                CircleAvatar(
                  maxRadius: 18,
                  backgroundColor: ConstColors.kWhiteColor.withOpacity(.4),
                  child: IconButton(
                    iconSize: 20,
                    onPressed: () {},
                    icon: const Icon(
                      Icons.heart_broken_outlined,
                      color: ConstColors.kDarkGrey,
                    ),
                  ),
                ),
                const Gap(10),
                CircleAvatar(
                  maxRadius: 18,
                  backgroundColor: ConstColors.kWhiteColor.withOpacity(.4),
                  child: IconButton(
                    iconSize: 20,
                    onPressed: () {},
                    icon: const Icon(
                      Icons.share_outlined,
                      color: ConstColors.kDarkGrey,
                    ),
                  ),
                ),
                const Spacer(),
                CircleAvatar(
                  maxRadius: 18,
                  backgroundColor: ConstColors.kWhiteColor.withOpacity(.4),
                  child: IconButton(
                    iconSize: 20,
                    onPressed: () {},
                    icon: const Icon(
                      Icons.arrow_back_ios_new,
                      color: ConstColors.kDarkGrey,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        Positioned(
            // height: 100,
            top: 150,
            right: 15,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "${mealbyId!['store']['name'] ?? ""}",
                  style: ConstFonts.fontBold
                      .copyWith(color: ConstColors.kWhiteColor),
                ),
                const Gap(200),
                const CircleAvatar(
                  minRadius: 25,
                  backgroundImage: AssetImage('assets/images/image1(1).png'),
                ),
              ],
            ))
      ],
    );
  }
}
