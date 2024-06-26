import 'package:flutter/material.dart';

class CustomDonateContainer extends StatelessWidget {
  const CustomDonateContainer(
      {super.key, required this.donateImage, required this.donateHintext});

  final String donateImage;
  final String donateHintext;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10.0),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Row(
        children: [
          Image.asset(
            donateImage, // Replace 'image.png' with your image path
            width: 50.0,
            height: 50.0,
          ),
          const SizedBox(width: 10.0),
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: donateHintext,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
