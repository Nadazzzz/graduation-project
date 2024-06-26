import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

import '../screens/cat_supermarket.dart';
import '../utils/constants.dart';

class CategoryContainer extends StatefulWidget {
  const CategoryContainer({super.key});

  @override
  State<CategoryContainer> createState() => _CategoryContainerState();
}

class _CategoryContainerState extends State<CategoryContainer> {
  late List categories = [];
  bool _isLoading = false;

  Future fetchCategories() async {
    try {
      setState(() {
        _isLoading = true;
      });
      final Response<dynamic> res = await Dio().get(
        "$baseUrl/store/stores/Restaurant",
        options: Options(
          headers: {
            'Content-Type': 'application/json',
          },
        ),
      );
      if (res.statusCode == 200) {
        log(res.data[0].toString());
        setState(() {
          categories = res.data;
          _isLoading = false;
        });
      }
    } on DioException catch (e) {
      setState(() {
        _isLoading = false;
      });
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

  @override
  void initState() {
    super.initState();
    fetchCategories();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 115,
      margin: const EdgeInsets.all(8),
      child: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : categories.isEmpty
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
                  itemCount: categories.length,
                  itemBuilder: (context, index) {
                    // var ind = 0;
                    return Column(
                      children: [
                        GestureDetector(
                          onTap: () {
                            // setState(() {
                            //   index = category[index];
                            // });
                            // if (category == index) {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const SuperMarkets(),
                              ),
                            );
                            // }
                          },
                          child: Container(
                            height: 70,
                            width: 100,
                            decoration: const BoxDecoration(
                              // borderRadius: BorderRadius.circular(12),
                              shape: BoxShape.circle,
                              image: DecorationImage(
                                image:
                                    AssetImage('assets/images/image1(1).png'),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                        ),
                        const Gap(5),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 6.0),
                          child: SizedBox(
                            width: 90.0,
                            child: Text(
                              categories[index]['name'] ?? 'choclute',
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                      ],
                    );
                  },
                ),
    );
  }
}
