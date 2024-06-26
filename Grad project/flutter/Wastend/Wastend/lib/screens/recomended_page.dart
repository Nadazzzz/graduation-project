import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:wastend/constants/constants.dart';
import 'package:wastend/widgets/recommended_cont.dart';

class RecommendedForU extends StatelessWidget {
  const RecommendedForU({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Recommended For You',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
      body: const Center(
        child: Column(
          children: [
            Divider(
              color: ConstColors.kGreyColor,
            ),
            Gap(10),
            RecommendedContainer(isRecommended: true),
          ],
        ),
      ),
    );
  }
}
