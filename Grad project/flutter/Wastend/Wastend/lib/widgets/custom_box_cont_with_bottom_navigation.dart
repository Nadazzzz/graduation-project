import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';

class ContainerWithMenu extends StatelessWidget {
  const ContainerWithMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 240,
      width: 400,
      decoration: const BoxDecoration(
        shape: BoxShape.rectangle,
      ),
      child: ListView.builder(
          scrollDirection: Axis.horizontal,
          shrinkWrap: true,
          // physics: const NeverScrollableScrollPhysics(),
          itemCount: 12,
          itemBuilder: (context, index) {
            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
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
                            height: 60,
                            width: 340,
                            padding: const EdgeInsets.only(top: 10, left: 10),
                            decoration: const BoxDecoration(
                                // border:
                                //     Border.all(color: ConstColors.kgreyeColor),
                                shape: BoxShape.rectangle,
                                borderRadius: BorderRadius.only(
                                    topLeft: Radius.circular(8),
                                    topRight: Radius.circular(8)),
                                image: DecorationImage(
                                  image: AssetImage(
                                    'assets/images/meal.jpg',
                                  ),
                                  fit: BoxFit.fill,
                                )),
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
                              ],
                            )),
                      ],
                    ),
                    const Gap(5),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Gap(5),
                        const Text(
                          'Surprise Bag',
                          style: ConstFonts.font400,
                        ),
                        Row(
                          children: [
                            const Text(
                              "33\$",
                              style: TextStyle(
                                  color: ConstColors.pkColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16),
                            ),
                            const Gap(200),
                            Row(
                              children: [
                                IconButton(
                                  onPressed: () {},
                                  icon: const Icon(Icons.star,
                                      color: Color.fromARGB(255, 255, 185, 56)),
                                ),
                                const Text(
                                  ' 3.9',
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
          }),
    );
  }
}
